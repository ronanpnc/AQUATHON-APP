import { StatusError } from "../types/common";

const generateError = (message:string, statusCode:number = 500, data?): StatusError => {
    const  error = new StatusError(message);
    error.statusCode = statusCode
    error.message = data;
    error.statusCode = statusCode;
    return error;
}

export default generateError;
