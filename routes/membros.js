const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    // Remove formatações e espaços
    cpf = cpf.replace(/\D/g, "").trim();
    nascimento = nascimento.replace(/[-.]/g, "/").trim();

    console.log("🔍 Procurando:", { cpf, nascimento });

    const membro = await Membro.findOne({ cpf });

    if (!membro) {
      return res.status(404).json({ erro: "CPF não encontrado" });
    }

    const nascimentoBanco = membro.nascimento.replace(/[-.]/g, "/").trim();

    if (nascimentoBanco !== nascimento) {
      return res.status(401).json({ erro: "Data de nascimento incorreta" });
    }

    return res.json(membro);
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

module.exports = router;
