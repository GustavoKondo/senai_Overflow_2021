const Student = require("../models/Student");

module.exports = {
    //função que vai ser executada pela rota
    async listarAlunos(req, res) {

        try {
            const alunos = await Student.findAll();

            res.send(alunos);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }

    },

    async buscarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id;

        try {
            let aluno = await Student.findByPk(alunoId, {
                attributes: ["id", "ra", "nome", "email"]
            });

            //se aluno não encontrado, retornar not found
            if (!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            res.send(aluno);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }

    },

    async adicionarAlunos(req, res) {
        //receber os dados do body
        const { ra, nome, email, senha } = req.body;

        try {

            //SELECT * FROM alunos WHERE ra = ? AND email = ?
            let aluno = await Student.findOne({
                where: {
                    ra: ra,
                }
            })

            if (aluno)
                return res.status(400).send({ erro: "Aluno já cadastrado" });

            aluno = await Student.create({ ra, nome, email, senha });

            //retornar resposta de sucesso
            res.status(201).send(aluno);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },

    async deletarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id

        try {
            let aluno = await Student.findByPk(alunoId);

            if (!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            await aluno.destroy();

            //devolver resposta de sucesso
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },

    async editarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id;

        //recuperar o dados do corpo 
        const { nome, email } = req.body;

        try {

            let aluno = await Student.findByPk(alunoId);

            if (!aluno)
                res.status(404).send({ erro: "Aluno não encontrado" });

            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

            //retornar resposta
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }


}
