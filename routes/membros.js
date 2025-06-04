const express = require("express");
const router = express.Router();
const Membro = require("../models/membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    let { cpf, nascimento } = req.params;

    // Remove formatações e espaços
    cpf = cpf.replace(/\D/g, "").trim();
    function limparData(data) {
      return data.replace(/\D/g, ""); // remove tudo que não for número
    }

    cpf = cpf.replace(/\D/g, "").trim();
    const nascimentoLimpo = limparData(nascimento);

    console.log("🔍 Procurando:", { cpf, nascimentoLimpo });

    const membro = await Membro.findOne({ cpf });

    if (!membro) {
      return res.status(404).json({ erro: "CPF não encontrado" });
    }

    const nascimentoBancoLimpo = limparData(membro.nascimento);

    if (nascimentoBancoLimpo !== nascimentoLimpo) {
      return res.status(401).json({ erro: "Data de nascimento incorreta" });
    }

    return res.json(membro);

   
  } catch (err) {
    console.error("Erro ao buscar membro:", err);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

module.exports = router;
