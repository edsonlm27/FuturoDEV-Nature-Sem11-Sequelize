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
  try {
    const nome = req.body.nome;
    const duracao_horas = req.body.duracao_horas;

    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório!" });
    }

    if (duracao_horas < 50 || duracao_horas > 150) {
      return res
        .status(400)
        .json({ message: "A duração do curso deve ser entre 50 e 150 horas." });
    }

    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não foi possível cadastrar o curso." });
  }
});

// Pesquisa pelo nome de um curso e duração
routes.get("/cursos", async (req, res) => {
  try {
    let params = {};

    // SE for passado uma paramero QUERY chamado "nome" na requisição, então
    // esse parametro "nome" é adicionado dentro da variavel params
    if (req.query.nome) {
      // o ...params, cria uma cópia do params com os chaves e valores já existentes
      params = { ...params, nome: req.query.nome };
    }

    if (req.query.duracao_horas) {
      // o ...params, cria uma cópia do params com os chaves e valores já existentes
      params = { ...params, duracao_horas: req.query.duracao_horas };
    }

    const cursos = await Curso.findAll({
      where: params,
    });

    res.json(cursos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não possível listar todos os cursos" });
  }
});

module.exports = routes;
