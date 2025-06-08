const express = require("express");
const router = express.Router();
// Rota de teste
router.get("/teste", (req, res) => {
  res.send("✅ Rota /respostas/teste funcionando!");
});

const Resposta = require("../models/Resposta");

function gerarIdUnico(matricula) {
  const agora = new Date();
  const data = agora.toISOString().split("T")[0].replace(/-/g, "");
  const hora = agora.toTimeString().split(" ")[0].replace(/:/g, "");
  return `${matricula}-${data}-${hora}`;
}

function formatarTimestamp() {
  const agora = new Date();
  return agora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

// POST /respostas
router.post("/", async (req, res) => {
  try {
    let { respostas, pagina, data, hora, id } = req.body;

    const perguntasMap = {
      resultados: [
        "Todas as suas informações pessoais de cadastro acima estão corretas? (nome, atividade, etc.)",
        "Seu nome está correto?",
        "Sua atividade está correta?",
        "Qual seu estado cívil?",
        "Você tem filhos ou dependentes?",
        "Qual seu status profissional?",
        "De modo geral, com que frequência você participa dos cultos da igreja?",
        "Qual motivo que o(a) dificulta de participar dos cultos?",
        "Com que frequência você participa da Escola Dominical (EBD)?",
        "Qual motivo dificulta de participar da Escola Dominical (EBD)?",
        "Você participa de algum departamento/ministério da Igreja?",
        "Qual motivo que o(a) dificulta de participar do(s) departamento(s)/ministério(s) da igreja?",
        "Você é líder ou sub-líder de algum(ns) desses departamentos?",
        "Você possui alguma(s) dessas formações? ",
        "Você possui conhecimento ou experiência nessas áreas?",
        "Você tem vontade de aprender e atuar nas seguintes atividades?",
        "Você precisa de apoio especial?",
        "Você tem compromissos fora da igreja?",
        "Você já foi batizado com Espirito Santo?",
        "Número de WhatsApp",
        "Você solicitou nova via da credencial?"
      ],
      cadastro: [
        "Qual seu nome completo?",
        "Digite seu CPF:",
        "Data de nascimento:",
        "Qual seu sexo?",
        "Selecione sua congregação:",
        "Quanto tempo você frequenta nossa igreja?",
        "Você é batizado nas águas por imersão?",
        "Você tem vontade de se batizar?",
        "Você era membro de outra igreja?",
        "Era da Assembleia de Deus Ministério de Madureira?",
        "Qual o nome da igreja?",
        "Qual o nome do campo?",
        "Qual atividade você exercia?",
        "Qual seu estado civil?",
        "Você tem filhos ou dependentes?",
        "De modo geral, com que frequência você participa dos cultos da igreja?",
        "Qual motivo que o(a) dificulta de participar dos cultos?",
        "Com que frequência você participa da Escola Dominical (EBD)?",
        "Qual motivo dificulta de participar da Escola Dominical (EBD)?",
        "Você participa de algum departamento/ministério da Igreja?",
        "Qual motivo que o(a) dificulta de participar do(s) departamento(s)/ministério(s) da igreja?",
        "Você possui responsabilidade(s) no(s) seguintes dias e períodos?",
        "Você possui conhecimento ou experiência nessas áreas?",
        "Você precisa de algum apoio especial para você?",
        "Você é batizado com Espirito Santo?",
        "Informe seu número de WhatsApp:"
      ],
      crianca: [
        "Digite o CPF da criança:",
        "Digite o nome da criança:",
        "Digite a data de nascimento da criança:",
        "Sexo da criança:",
        "Digite o nome do Papai :",
        "Digite o CPF do Papai:",
        "Digite o nome da Mamãe:",
        "Digite o CPF da Mamãe:",
        "Selecione a congregação:",
        "A criança precisa de apoio emocional?",
        "A criança participa de algum desses departamentos?",
        "A criança foi apresentada em uma igreja evangélica?"
      ]
    };

    let respostasFinal = respostas;

    if (Array.isArray(respostas) && pagina && perguntasMap[pagina]) {
      respostasFinal = {};
      perguntasMap[pagina].forEach((pergunta, i) => {
        respostasFinal[pergunta] = respostas[i] ?? "";
      });
    }

    const matricula = req.body.matricula || respostasFinal.matricula || "";
    const atividade = req.body.atividade || respostasFinal.atividade || "";

    if (!respostasFinal) {
      return res.status(400).json({ erro: "Respostas são obrigatórias." });
    }

    const novaResposta = new Resposta({
      matricula,
      atividade,
      respostas: respostasFinal,
      pagina: pagina || "desconhecido",
      id_unico: id || gerarIdUnico(matricula),
      timestamp: formatarTimestamp(),
      data,
      hora
    });



    await novaResposta.save();
    res.status(201).json({ mensagem: "Resposta salva com sucesso!", id: novaResposta.id_unico });
  } catch (err) {
    console.error("Erro ao salvar resposta:", err);
    res.status(500).json({ erro: "Erro ao salvar resposta." });
  }
});
// GET /respostas/:matricula
router.get("/:matricula", async (req, res) => {
  try {
    const { matricula } = req.params;
    const resposta = await Resposta.findOne({ matricula });
    if (resposta) {
      return res.status(200).json(resposta);
    } else {
      return res.status(404).json({ erro: "Nenhuma resposta encontrada" });
    }
  } catch (err) {
    console.error("Erro ao buscar resposta:", err);
    return res.status(500).json({ erro: "Erro ao buscar resposta" });
  }
});



module.exports = router;
