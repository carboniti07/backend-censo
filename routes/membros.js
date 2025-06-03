const express = require("express");
const router = express.Router();
const Membro = require("../models/Membro");

router.get("/:cpf/:nascimento", async (req, res) => {
    try {
        const { cpf, nascimento } = req.params;

        const membro = await Membro.findOne({
            cpf,
            nascimento
        });

        if (!membro) return res.status(404).json({ erro: "Membro não encontrado" });

        res.json(membro);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar membro" });
    }
});

module.exports = router;
