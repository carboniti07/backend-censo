const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/teste", (req, res) => {
  res.send("✅ Rota /membro/teste funcionando!");
});


router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    cpf = cpf.replace(/\D/g, "").trim();
    nascimento = decodeURIComponent(nascimento).replace(/[-.]/g, "/").trim();

    console.log("🔍 Procurando membro com CPF:", JSON.stringify(cpf));
    console.log("🔍 Procurando nascimento:", JSON.stringify(nascimento));

    const membro = await Membro.findOne({
      cpf: cpf,
      nascimento: nascimento
    });

    if (!membro) {
      console.log("❌ Nenhum membro encontrado com esses dados.");
      return res.status(404).json({ erro: "Membro não encontrado. Verifique os dados." });
    }

    console.log("✅ Membro encontrado:", membro.nome);
    return res.json(membro);
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
});


module.exports = router;
