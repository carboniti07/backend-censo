const express = require("express");
const router = express.Router();
const Membro = require("../models/membro"); // ✅ Nome correto

router.get("/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf.replace(/\D/g, "").trim();
    const nascimento = req.query.nascimento?.replace(/[-.]/g, "/").trim();

    if (!nascimento) {
      return res.status(400).json({ erro: "Data de nascimento obrigatória." });
    }

    const membroEncontrado = await Membro.findOne({ cpf });
    if (!membroEncontrado) return res.status(404).json({ erro: "CPF não encontrado" });

    const nascimentoBanco = membroEncontrado.nascimento.replace(/[-.]/g, "/").trim();
    if (nascimentoBanco !== nascimento) {
      return res.status(401).json({ erro: "Data de nascimento incorreta" });
    }

    return res.json(membroEncontrado);
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});



module.exports = router;
