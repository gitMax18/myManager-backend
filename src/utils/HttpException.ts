export default class HttpException extends Error {
    statusCode: number;
    details?: Details;
    constructor(message: string, statusCode: number, details?: Details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

type Details = {
    [key: string]: string;
};
