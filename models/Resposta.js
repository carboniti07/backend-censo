const mongoose = require("mongoose");

const respostaSchema = new mongoose.Schema({
  matricula: { type: String },
  respostas: { type: Object, required: true },
  id_unico: { type: String, required: true },
  timestamp: { type: String, required: true },
  data: { type: String },
  hora: { type: String },
  pagina: { type: String }
});

module.exports = mongoose.model("Resposta", respostaSchema);
