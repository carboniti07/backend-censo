const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const respostaRoutes = require("./routes/respostas");
const membroRoutes = require("./routes/membros");

app.use("/respostas", respostaRoutes);
app.use("/membro", membroRoutes);

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