import ErrorBase from "./ErrorBase.js";

class ErrorBadRequest extends ErrorBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
      super(mensagem, 400);
    }
  }

export default ErrorBadRequest;