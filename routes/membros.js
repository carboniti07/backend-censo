const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    const { cpf, nascimento } = req.params;

    const cpfLimpo = cpf.replace(/\D/g, ""); // Remove pontos e traços
    const nascimentoFormatado = nascimento.replace(/-/g, "/"); // Transforma 30-08-2007 em 30/08/2007

    console.log("Buscando por:", cpfLimpo, nascimentoFormatado); // ✅ debug

    const membro = await Membro.findOne({
      cpf: cpfLimpo,
      nascimento: nascimentoFormatado
    });

    if (!membro) return res.status(404).json({ erro: "Membro não encontrado" });

    res.json(membro);
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ erro: "Erro ao buscar membro" });
  }
});

module.exports = router;
