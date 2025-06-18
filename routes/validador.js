const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro"); // ← Agora usando o modelo Mongoose

router.post("/", async (req, res) => {
  const { matricula, codigoUso } = req.body;

  if (!matricula || !codigoUso) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  console.log("🔍 Buscando por:", { matricula, cod: codigoUso });

  try {
    const membro = await Membro.findOne({ matricula, cod: codigoUso });

    console.log("🔎 Resultado:", membro);

    if (!membro) {
      return res.status(404).json({ erro: "Carteirinha inválida ou dados incorretos." });
    }

    res.status(200).json(membro);
  } catch (err) {
    console.error("❌ Erro na validação:", err);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});


module.exports = router;
