const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
  try {
    const limparCPF = (cpf) => cpf.replace(/\D/g, "");
    const formatarData = (data) => data.replace(/-/g, "/");

    const cpf = limparCPF(req.params.cpf);
    const nascimento = formatarData(req.params.nascimento);

    const membro = await Membro.findOne({ cpf, nascimento });

    if (!membro) return res.status(404).json({ erro: "Membro não encontrado" });

    res.json(membro);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar membro" });
  }
});

module.exports = router;
