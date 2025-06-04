const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Membro = require("./models/Membro");
const { membros } = require("./utils/dados");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("🟢 Conectado ao MongoDB");

  // limpa todos os membros anteriores
  await Membro.deleteMany();

  // insere todos os membros do arquivo dados.js
  await Membro.insertMany(membros);

  console.log(`✅ ${membros.length} membros importados com sucesso!`);
  process.exit();
}).catch((err) => {
  console.error("❌ Erro ao conectar ao MongoDB:", err);
  process.exit(1);
});