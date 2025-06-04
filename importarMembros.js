const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Membro = require("./models/temp");
const { membros } = require("./utils/dados"); // caminho do dados.js

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Conectado ao MongoDB");

  await Membro.deleteMany(); // limpa antigos
  await Membro.insertMany(membros); // importa novos

  console.log("Membros importados com sucesso");
  process.exit();
}).catch((err) => {
  console.error("Erro ao conectar:", err);
  process.exit(1);
});
