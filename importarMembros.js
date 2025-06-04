const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const membro = require(".membro/models/membro");
const { membros } = require("./utils/dados"); // caminho do dados.js

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Conectado ao MongoDB");

  await membro.deleteMany(); // limpa antigos
  await membro.insertMany(membros); // importa novos

  console.log("Membros importados com sucesso");
  process.exit();
}).catch((err) => {
  console.error("Erro ao conectar:", err);
  process.exit(1);
});
