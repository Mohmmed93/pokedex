export class ClientError extends Error {
    code: string
    error?: any
    errorCode?: string
    constructor(code: string, message: string, error?: any, errorCode?: string) {
        super(message);
        this.code = code;
        this.error = error;
        this.errorCode = errorCode;
    }
}
