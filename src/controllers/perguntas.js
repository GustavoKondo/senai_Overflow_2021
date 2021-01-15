const Question = require("../models/Question");
const Student = require("../models/Student");
const Category = require("../models/Category")

module.exports = {
    async index(req, res) {
        try {
            const alunos =  await Student.findAll();

            res.send(alunos)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }
    },

    async store(req, res) {
        const { titulo, descricao, imagem, gist, categorias } = req.body;

        const alunoId = req.headers.authorization;


        try {
            //buscar o aluno pelo ID
            let aluno = await Student.findByPk(alunoId);

            //se aluno não existir, retorna erro
            if (!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            //crio a pergunta para o aluno
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist });

    
            // adicionar uma lista de categorias para  a pergunta
            await pergunta.addCategories(categorias)

            //retorno sucesso
            res.status(201).send(pergunta);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }


    },

    find(req, res) {

    },

    async update(req, res) {
        const questionId = req.params.id;

        const {titulo, descricao} = req.body;

        const studentId = req.headers.authorization;

        try {
            const question = await Question.findByPk(questionId);

            if (!question)
                return res.status(404).send({ erro: "Questão não encontrada" });

            if(question.aluno_id != studentId)
                return res.status(401).send({erro: "Não autorizado"})

            question.titulo = titulo;
            question.descricao = descricao;

            question.save();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        const questionId = req.params.id;

        const studentId = req.headers.authorization;

        try {
            const question = await Question.findOne({
                where: {
                    id: questionId,
                    aluno_id: studentId
                }
            });

            if (!question)
                res.status(404).send({ erro: "Questão não encontrada" });

            await question.destroy();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}