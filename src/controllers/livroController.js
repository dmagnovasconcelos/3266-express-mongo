import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import ErrorNotFound from "../errors/ErrorNotFound.js";

class LivroController {

    static async listarLivros (req, res, next) {
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            next(error);
        }
    };

    static async listarLivroPorId (req, res, next) {
        try{
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if (livroEncontrado !== null) {
                res.status(200).json(livroEncontrado);
            } else {
                next(new ErrorNotFound(`Livro Id ${id} não foi localizado.`));
            }
        } catch (error) {
            next(error);
        }
    };

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora
        try{
            //const livrosPorEditora = await livro.find({ editora: editora }); // Assim também funciona
            const livrosPorEditora = await livro.find({ editora });
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            next(error);
        }
    };

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if (!autorEncontrado) {
                next(new ErrorNotFound("Autor não encontrado. Por favor, forneça um ID de autor válido."));
            }

            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
        } catch (error) {
            next(error);
        }
    };

    static async atualizarLivro (req, res, next) {
        try{
            const id = req.params.id;
            const livroResultado = await livro.findByIdAndUpdate(id, req.body);
            if (livroResultado !== null) {
                res.status(204).json();
            } else {
                next(new ErrorNotFound(`Livro Id ${id} não foi localizado.`));
            }
        } catch (error) {
            next(error);
        }
    };

    static async excluirLivro (req, res, next) {
        try{
            const id = req.params.id;
            const livroResultado = await livro.findByIdAndDelete(id);
            if (livroResultado !== null) {
                res.status(204).json();
            } else {
                next(new ErrorNotFound(`Livro Id ${id} não foi localizado.`));
            }
        } catch (error) {
            next(error);
        }
    };
}

export default LivroController;