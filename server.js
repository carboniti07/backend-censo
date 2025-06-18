const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();



app.use(express.json());
app.use(cors());
// Rotas
const respostaRoutes = require("./routes/respostas");
const membroRoutes = require("./routes/membros");
const validadorRoute = require("./routes/validador");

app.use("/validador", validadorRoute);
app.use("/respostas", respostaRoutes);
app.use("/membro", membroRoutes);
console.log("🔧 Rota /membro está registrada!");


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

