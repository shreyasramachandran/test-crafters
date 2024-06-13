import Dexie, { Table } from 'dexie';

export interface IMetadata {
    id?: number;
    subject?: string;
    duration?: string;
    maxQuestions?: string;
    minimumRequiredQuestions?: string;
    category?: string;
    markingScheme?: string;
    mediumOfExamination?: string[];
}

export interface IQuestion {
    id?: number;
    questionId?: string;
    questionPreText?: string;
    questionText?: string;
    questionType?: string;
    optionsText?: string[];
    answerHuman?: string;
}

export interface IUser {
    id?: number;
    googleUserEmail?: string;
    googleUserName?: string;
    googleUserPicture?: string;
    otherEmail?: string;
    otherPassword?: string;
}

export interface ISession {
    id?: number;
    start?: number;
    end?: string;
    userId?: string;
    questionPaletteId?: string;
}

// The schema string should only have valid field names from ISubject
const QuestionsSchema = '++id, questionId, questionPreText, questionText, questionType, optionsText, answerHuman';
const MetadataSchema = '++id, subject, duration, maxQuestions, minimumRequiredQuestions, category, markingScheme, mediumOfExamination';
const UserSchema = '++id, googleUserEmail, googleUserName, googleUserPicture, otherEmail, otherPassword';
const SessionSchema = '++id, start, end, userId, questionPaletteId';

// Your enum and type definitions
enum QuestionState {
    NotVisited = 'notVisited',
    Answered = 'answered',
    NotAnswered = 'notAnswered',
    MarkedForReview = 'markedForReview',
    AnsweredAndMarkedForReview = 'answeredAndMarkedForReview'
}

type IQuestionPaletteItem = {
    index: number;
    state: QuestionState;
    selectedAnswer: number;
    questionId: string;
    timeTaken: number;
};

// This has been named as Question Palette but is used to store state of answers 
const QuestionPaletteItemSchema = '++id, state, selectedAnswer, questionId, timeTaken'

// Class to handle the IndexedDB operations
class QuestionsDB extends Dexie {
    public metadata!: Table<IMetadata>;
    public questions!: Table<IQuestion>;
    public questionPalette!: Table<IQuestionPaletteItem>;
    public user!: Table<IUser>;
    public session!: Table<ISession>;

    constructor(databaseName: string) {
        super(databaseName);
        this.version(1).stores({
            metadata: MetadataSchema,
            questions: QuestionsSchema,
            questionPalette: QuestionPaletteItemSchema,
            user: UserSchema,
            session: SessionSchema
        });
        this.metadata = this.table("metadata");
        this.questions = this.table("questions");
        this.questionPalette = this.table("questionPalette");
        this.user = this.table('user')
        this.session = this.table('session')
    }

    async initializeDatabase(database = 'QuestionsDatabase') {
        // Check if the database already exists
        const exists = await Dexie.exists(database);
        if (exists) {
            // Close any open connections
            await this.close();
            console.log("Database connection closed.");
            // Wait a bit to ensure all connections are fully closed
            await new Promise(resolve => setTimeout(resolve, 100));
            // If it exists, delete it
            await Dexie.delete(database);
            console.log("Existing database deleted.");
        }

        // Re-open the database to initialize it
        await this.open();
        console.log("Database initialized.");

        // Perform checks to ensure tables are correctly set up
        await Promise.all([
            this.checkTableExists('metadata'),
            this.checkTableExists('questions'),
            this.checkTableExists('questionPalette'),
            this.checkTableExists('user'),
            this.checkTableExists('session')
        ]).then(() => {
            console.log("All tables checked and ready.");
        }).catch(err => {
            console.error("Error during database initialization:", err);
            throw err;  // Rethrow to ensure the caller handles the initialization error.
        });

        await this.storeMetadata();
        console.log('Stored metadata');
    }

    async checkTableExists(table: string) {
        const exists = this.table(table) !== undefined;
        console.log(`Check table ${table}: ${exists ? "Exists" : "Does not exist"}`);
        return exists;
    }

    // Check if any records exist in the specified table
    async hasRecords(tableName: string): Promise<boolean> {
        if (!this.tables.map(t => t.name).includes(tableName)) {
            console.log(`Table ${tableName} does not exist.`);
            return false;
        }

        const count = await this.table(tableName).count();
        return count > 0;
    }

    // Method to clear all data from all tables
    async clearAllTables(): Promise<void> {
        const tableNames = Array.from(this.tables, table => table.name);
        await this.transaction('rw', this.tables, async () => {
            await Promise.all(tableNames.map(tableName => this.table(tableName).clear()));
        });
        console.log("All tables have been cleared");
    }

    // Method to delete the entire database
    async deleteDatabase(): Promise<void> {
        await this.delete();
        console.log("Database has been deleted");
    }

    // CRUD operations
    async addRecord<T>(tableName: string, record: T) {
        return this.table(tableName).add(record);
    }

    async addRecords<T>(tableName: string, records: T[]) {
        return this.table(tableName).bulkAdd(records);
    }

    async getRecords<T>(tableName: string): Promise<T[]> {
        return this.table(tableName).toArray();
    }

    async getRecordById<T>(tableName: string, id: number): Promise<T> {
        const record = await this.table(tableName).get(id);
        return this.table(tableName).get(id);
    }

    async updateRecord<T>(tableName: string, id: number, update: Partial<T>) {
        return this.table(tableName).update(id, update);
    }

    async deleteRecord(tableName: string, id: number) {
        return this.table(tableName).delete(id);
    }

    async deleteAllRecords(tableName: string): Promise<void> {
        return this.table(tableName).clear();
    }

    async filterMetadataBySubject(subject: string): Promise<Pick<IMetadata, 'subject' | 'duration' | 'maxQuestions' | 'minimumRequiredQuestions'>[]> {
        const allRecords = await this.metadata.where({ subject }).toArray();

        // Map to only include the specific fields
        return allRecords.map(({ subject, duration, maxQuestions, minimumRequiredQuestions }) => ({
            subject,
            duration,
            maxQuestions,
            minimumRequiredQuestions
        }));
    }

    async storeMetadata(table = 'metadata') {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/get-metadata?table=${table}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },

            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                return new Response(JSON.stringify({ error: "Error fetching metadata" }), {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                });
            }
            const responseData = await res.json();
            // Store the data in indexDB
            await this.addRecords(table, responseData.data)
        }
        catch (error) {
            // Handle other errors
            console.error("Error fetching data:", error);
        }
    }

    async storeQuestionsData(subject: string, maxQuestions: number) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const indexDBTableName = 'questions'
            const tableName = 'questions'
            const res = await fetch(`${baseUrl}/get-subject-data?subject=${subject}&table=${tableName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
                credentials: 'include'
            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                return new Response(JSON.stringify({ error: "Error fetching data" }), {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                });
            }
            const responseData = await res.json();

            // Assuming maxQuestions is already defined and is a number
            const shuffledQuestions = this.shuffleArray(responseData.data);
            const selectedQuestions = shuffledQuestions.slice(0, maxQuestions);

            // Now store the selected questions in IndexedDB
            await this.addRecords(indexDBTableName, selectedQuestions);
        }
        catch (error) {
            // Handle other errors
            console.error("Error fetching data:", error);
        }
    }

    shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async calculatePerformanceScores(): Promise<{ correctAnswers: number, incorrectAnswers: number }> {
        const allQuestions: IQuestion[] = await this.getRecords('questions')
        const allAnswers: IQuestionPaletteItem[] = await this.getRecords('questionPalette')
        let correctAnswers = 0
        let incorrectAnswers = 0

        // Map questions by their questionId for quick lookup
        const questionMap = new Map();
        allQuestions.forEach(question => {
            questionMap.set(question.questionId, question);
        });

        // Iterate over all answers to compare with questions
        allAnswers.forEach(answer => {
            const correspondingQuestion = questionMap.get(answer.questionId);
            if (correspondingQuestion) {
                // Assuming answerSelected gives the index of the selected option
                // and answerHuman contains the correct answer
                const correctAnswerIndex = correspondingQuestion.optionsText.indexOf(correspondingQuestion.answerHuman);
                if (answer.selectedAnswer === correctAnswerIndex) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }
            }
        });

        return { correctAnswers, incorrectAnswers }
    }

    async generatePerformanceTable(): Promise<Array<{ question_number: number, user_answer: string, correct_answer: string, result_status: string }>> {
        const allQuestions: IQuestion[] = await this.getRecords('questions')
        const allAnswers: IQuestionPaletteItem[] = await this.getRecords('questionPalette')

        const questionMap = new Map<string, IQuestion>();
        allQuestions.forEach(question => {
            questionMap.set(question.questionId!, question);
        });

        const analysisTable = allAnswers.map(answer => {
            const correspondingQuestion = questionMap.get(answer.questionId);
            if (correspondingQuestion) {
                const userAnswerText = correspondingQuestion.optionsText![answer.selectedAnswer];
                const correctAnswerText = correspondingQuestion.answerHuman;
                const resultStatus = userAnswerText === correctAnswerText ? 'Correct' : 'Incorrect';

                return {
                    question_number: correspondingQuestion.id || -1,
                    user_answer: userAnswerText || 'N/A',
                    correct_answer: correctAnswerText || 'N/A',
                    result_status: resultStatus || 'Unanswered'
                };
            } else {
                // Handle the case where no corresponding question is found
                return {
                    question_number: -1,
                    user_answer: 'N/A',
                    correct_answer: 'N/A',
                    result_status: 'Unanswered'  // or any other appropriate status
                };
            }
        });

        return analysisTable;
    }

    async getTimeTakenPerQuestion(): Promise<Array<{ question: string, timeTaken: number }>> {
        const allAnswers: IQuestionPaletteItem[] = await this.getRecords('questionPalette')
        const timeTakenPerQuestion = allAnswers.map(answer => {
            return { question: `Q${answer.index + 1}`, timeTaken: answer.timeTaken };
        });
        return timeTakenPerQuestion;
    }
}

const db = new QuestionsDB('QuestionsDatabase');

export default db;