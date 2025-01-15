
import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const conexao = await conectaNaDatabase();
conexao.on("error", (error) => {
    console.error("Erro de conexão", error)
});

conexao.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
});

const app = express();
routes(app);

app.use(notFoundHandler)
app.use(errorHandler);

export default app;