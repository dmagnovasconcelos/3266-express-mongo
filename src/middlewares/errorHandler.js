import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import ErrorBadRequest from "../errors/ErrorBadRequest.js";
import ValidationError from "../errors/ValidationError.js";
import ErrorNotFound from "../errors/ErrorNotFound.js";


// eslint-disable-next-line no-unused-vars
function errorHandler (error, req, res, next)  {
    if (error instanceof mongoose.Error.CastError){
        new ErrorBadRequest().enviarResposta(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).enviarResposta(res);
    } else if (error instanceof ErrorNotFound) {
        error.enviarResposta(res);
    } else {
        new ErrorBase().enviarResposta(res);
    }
}

export default errorHandler;