const mongoose = require("mongoose");

const respostaSchema = new mongoose.Schema({
  matricula: { type: String, required: true },
  respostas: { type: Object, required: true },
  id_unico: { type: String, required: true },
  timestamp: { type: String, required: true }
});

module.exports = mongoose.model("Resposta", respostaSchema);
