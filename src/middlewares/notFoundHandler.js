import ErrorNotFound from "../errors/ErrorNotFound.js";

function notFoundHandler(req, res, next) {
    const errorNotFound = new ErrorNotFound();
    next(errorNotFound);
}

export default notFoundHandler;