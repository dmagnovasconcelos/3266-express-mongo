import ErrorNotFound from "../errors/ErrorNotFound.js";
import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores (req, res, next) {
        try{
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);
        } catch (error) {
            next(error);
        }
    };

    static async listarAutorPorId (req, res, next) {
        try{
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            if (autorEncontrado !== null) {
                res.status(200).json(autorEncontrado);
            } else {
                next(new ErrorNotFound(`Autor Id ${id} não foi localizado.`));
            }
        } catch (error) {
            next(error);
        }
    };

    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
        } catch (error) {
            next(error);
        }
    };

    static async atualizarAutor (req, res, next) {
        try{
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndUpdate(id, req.body);
            if (autorResultado !== null) {
                res.status(204).json();
            } else {
                next(new ErrorNotFound(`Autor Id ${id} não foi localizado.`));
            }
        } catch (error) {
            next(error);
        }
    };

    static async excluirAutor (req, res, next) {
        try{
            const id = req.params.id;
            const autorResultado = await autor.findByIdAndDelete(id);
            if (autorResultado !== null) {
                res.status(204).json();
            } else {
                next(new ErrorNotFound(`Autor Id ${id} não foi localizado.`));
            }
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    };
}

export default AutorController;