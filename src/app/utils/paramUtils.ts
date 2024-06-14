import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.NEXT_PUBLIC_SEARCH_PARAMS_SECRET_KEY!;
const ivLength = 16; // For AES, this is always 16

export interface Params {
    [key: string]: string;
}

// Function to encrypt parameters
export const encryptParams = (params: Params): string => {
    const jsonString = JSON.stringify(params);
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(jsonString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Function to decrypt parameters
export const decryptParams = (encryptedString: string): Params | null => {
    try {
        const [ivString, encrypted] = encryptedString.split(':');
        const iv = Buffer.from(ivString, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
        let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString()) as Params;
    } catch (error) {
        console.error('Failed to decrypt parameters:', error);
        return null;
    }
};
