const { Router } = require("express");
const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");

const routes = new Router();

routes.get("/bem_vindo", (req, res) => {
  res.json({ name: "Bem-vindo" });
});

routes.post("/alunos", async (req, res) => {
  const nome = req.body.nome;
  const data_nascimento = req.body.data_nascimento;
  const celular = req.body.celular;

  if (!nome) {
    return res.status(400).json({ message: "O nome é obrigatório!" });
  }

  const aluno = await Aluno.create(req.body);
  res.json(aluno);
});

routes.get("/alunos", async (req, res) => {
  const alunos = await Aluno.findAll(); // SELECT * from alunos
  res.json(alunos);
});

routes.post("/cursos", async (req, res) => {
  const nome = req.body.nome;
  const duracao_horas = req.body.duracao_horas;

  const curso = await Curso.create(req.body);
  res.json(curso);
});

routes.get("/cursos", async (req, res) => {
  const cursos = await Curso.findAll(); // SELECT * from cursos
  res.json(cursos);
});

module.exports = routes;
