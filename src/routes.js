const express = require("express");

const alunoController = require("./controllers/alunos");
const perguntaController = require("./controllers/perguntas");
const answersController = require("./controllers/answers")

const routes = express.Router();

//rotas de alunos
routes.get("/alunos", alunoController.listarAlunos);
routes.get("/alunos/:id", alunoController.buscarAluno);
routes.post("/alunos", alunoController.adicionarAlunos);
routes.delete("/alunos/:id", alunoController.deletarAluno);
routes.put("/alunos/:id", alunoController.editarAluno);

//rotas de perguntas
routes.get("/perguntas", perguntaController.index);
//routes.get("/perguntas/:id", perguntaController.find);
routes.post("/perguntas", perguntaController.store);
routes.delete("/perguntas/:id", perguntaController.delete);
routes.put("/perguntas/:id", perguntaController.update);

routes.post("/perguntas/:id/respostas", answersController.store);

module.exports = routes;