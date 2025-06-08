const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");
const dados = require("../utils/dados");

// POST /sincronizar
router.post("/", async (req, res) => {
  try {
    await Membro.deleteMany({});
    await Membro.insertMany(dados);
    res.json({ mensagem: "✅ Membros sincronizados com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao sincronizar os membros:", err);
    res.status(500).json({ erro: "Erro ao sincronizar os membros." });
  }
});

module.exports = router;
