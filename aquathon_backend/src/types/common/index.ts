class StatusError extends Error{
    statusCode: number;
    data;
    constructor (message: string, statusCode:number = 500, data?) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

export { StatusError }
