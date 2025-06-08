const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Rotas principais
const respostaRoutes = require("./routes/respostas");
const membroRoutes = require("./routes/membros");
const sincronizarRoute = require("./routes/sincronizar");

app.use("/respostas", respostaRoutes);         // ex: /respostas
app.use("/membro", membroRoutes);              // ex: /membro/:cpf/:nascimento
app.use("/sincronizar", sincronizarRoute);     // ex: /sincronizar  ✅ rota para o botão

console.log("🔧 Rotas /respostas, /membro e /sincronizar registradas!");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("🟢 Conectado ao MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error("❌ Erro ao conectar no MongoDB:", err.message);
});
