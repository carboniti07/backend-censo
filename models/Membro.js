const mongoose = require("mongoose");

const membroSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  nascimento: String,
  congregacao: String,
  status: String,
  atividade: String,
  membroDesde: String,
  batismo: String,
  ordenacao: String,
  matricula: String,
  conamad: String,
  id: Number,
  dizimo: String,
  emissao: String,
  atualizado: String, // caso queira usar controle de atualização depois
  cod: String // ← novo campo para o código de uso
});

module.exports = mongoose.model("Membro", membroSchema);
