const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    // ✅ Remove pontos, traço ou qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, "");

    // ✅ Garante que a data esteja no formato com barras
    nascimento = nascimento.replace(/[-.]/g, "/");

    const membro = await Membro.findOne({ cpf, nascimento });

    if (!membro) return res.status(404).json({ erro: "Membro não encontrado" });

    res.json(membro);
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ erro: "Erro ao buscar membro" });
  }
});

module.exports = router;
