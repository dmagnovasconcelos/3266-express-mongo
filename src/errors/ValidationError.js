import ErrorBadRequest from "./ErrorBadRequest.js";

class ValidationError extends ErrorBadRequest  {
    constructor(error) {
      const mensagensErro = Object.values(error.errors)
        .map(error => error.message)
        .join("; ");
  
      super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ValidationError;