const express = require("express");
const router = express.Router();
const Resposta = require("../models/Resposta");

function gerarIdUnico(matricula) {
  const agora = new Date();
  const data = agora.toISOString().split("T")[0].replace(/-/g, "");
  const hora = agora.toTimeString().split(" ")[0].replace(/:/g, "");
  return `${matricula}-${data}-${hora}`;
}

function formatarTimestamp() {
  const agora = new Date();
  return agora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

// POST /respostas
router.post("/", async (req, res) => {
  try {
    const { matricula, respostas } = req.body;
    if (!matricula || !respostas) {
      return res.status(400).json({ erro: "Matrícula e respostas são obrigatórios." });
    }

    const novaResposta = new Resposta({
      matricula,
      respostas,
      id_unico: gerarIdUnico(matricula),
      timestamp: formatarTimestamp()
    });

    await novaResposta.save();
    res.status(201).json({ mensagem: "Resposta salva com sucesso!", id: novaResposta.id_unico });
  } catch (err) {
    console.error("Erro ao salvar resposta:", err);
    res.status(500).json({ erro: "Erro ao salvar resposta." });
  }
});

// GET /respostas
router.get("/", async (req, res) => {
  try {
    const respostas = await Resposta.find();
    res.json(respostas);
  } catch (err) {
    console.error("Erro ao buscar respostas:", err);
    res.status(500).json({ erro: "Erro ao buscar respostas." });
  }
});

module.exports = router;
