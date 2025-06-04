const express = require("express");
const router = express.Router();
const Membro = require("../models/membro");


router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    // Remove formatações
    cpf = cpf.replace(/\D/g, "").trim();
    const limparData = (data) => data.replace(/\D/g, "");
    const nascimentoLimpo = limparData(nascimento);

    console.log("🔍 Procurando:", { cpf, nascimentoLimpo });

    const membroEncontrado = await Membro.findOne({ cpf });

    if (!membroEncontrado) {
      return res.status(404).json({ erro: "CPF não encontrado" });
    }

    const nascimentoBancoLimpo = limparData(membroEncontrado.nascimento);

    if (nascimentoBancoLimpo !== nascimentoLimpo) {
      return res.status(401).json({ erro: "Data de nascimento incorreta" });
    }

    return res.json(membroEncontrado);
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

module.exports = router;
