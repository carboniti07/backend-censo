const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

// GET /membro/:cpf
router.get("/:cpf", async (req, res) => {
  try {
    const cpfLimpo = req.params.cpf.replace(/\D/g, ""); // remove pontos e traços
    const membro = await Membro.findOne({ cpf: cpfLimpo });

    if (!membro) {
      return res.status(404).json({ erro: "Membro não encontrado." });
    }

    res.json(membro);
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
});

module.exports = router;
