const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    cpf = cpf.replace(/\D/g, "");
    nascimento = nascimento.replace(/[-.]/g, "/");

    console.log("🟡 Parâmetros recebidos:");
    console.log("CPF recebido:", cpf);
    console.log("Nascimento recebido:", nascimento);

    const membro = await Membro.findOne({ cpf, nascimento });

    if (!membro) {
      console.log("🔴 Membro não encontrado com:", { cpf, nascimento });
      return res.status(404).json({ erro: "Membro não encontrado" });
    }

    console.log("🟢 Membro encontrado:", membro);
    res.json(membro);
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ erro: "Erro ao buscar membro" });
  }
});


module.exports = router;
