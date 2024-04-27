import Dexie, { Table } from 'dexie';

export interface ISubject {
    id?: number;
    questionPreText?: string;
    questionText?: string;
    questionType?: string;
    optionsText?: string[];
    answerHuman?: string;
}

// The schema string should only have valid field names from ISubject
const ISubjectSchema = '++id, questionPreText, questionText, questionType, optionsText, answerHuman';



// Class to handle the IndexedDB operations
class Questions extends Dexie {
    public subjects!: Table<ISubject>;

    constructor(databaseName: string) {
        super(databaseName);
        this.version(1).stores({
            subjects: ISubjectSchema
        });
    }

    async createTableIfNotExists(tableName: string) {
        if (!this.tables.some(table => table.name === tableName)) {
            this.close(); // Close the database first

            // Increment to the next integer version
            const newVersion = Math.ceil(this.verno) + 1;
            this.version(newVersion).stores({
                [tableName]: ISubjectSchema
            });

            // Use upgrade to handle the schema change
            this.version(newVersion).upgrade(tx => {
                console.log(`Table ${tableName} created with schema: ${ISubjectSchema}`);
            });

            await this.open(); // Re-open the database after the upgrade
        }
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
    async addRecord(tableName: string, record: ISubject) {
        return this.table(tableName).add(record);
    }

    async addRecords(tableName: string, records: ISubject[]) {
        return this.table(tableName).bulkAdd(records);
    }

    async getRecords(tableName: string): Promise<ISubject[]> {
        return this.table(tableName).toArray();
    }

    async getRecordById(tableName: string, id: number): Promise<ISubject | undefined> {
        return this.table(tableName).get(id);
    }

    async updateRecord(tableName: string, id: number, update: Partial<ISubject>) {
        return this.table(tableName).update(id, update);
    }

    async deleteRecord(tableName: string, id: number) {
        return this.table(tableName).delete(id);
    }

    async deleteAllRecords(tableName: string): Promise<void> {
        return this.table(tableName).clear();
    }
}

// Initialize the database
const db = new Questions('MyDynamicDatabase');

export default db;