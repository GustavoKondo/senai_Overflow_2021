const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {

  },

  async store(req, res) {
    const questionId = req.params.id;

    const studentId = req.headers.authorization;

    const description = req.body.descricao;

    try {

      //verifica se a questão existe
      const question = await Question.findByPk(questionId);

      //se não existir retorna erro 404
      if (!question)
        return res.status(404).send({ erro: "Pergunta não encontrada" });

      //cria a resposta para a pergunta com o aluno do token
      const answer = await question.createAnswer({ description, student_id: studentId });

      //responde com status de sucesso
      res.status(201).send(answer);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

  },

  find(req, res) {

  },

  async update(req, res) {

  },

  async delete(req, res) {

  }

}