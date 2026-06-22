const express = require('express');

const app = express();

// Endpoint de health check: usado para verificar se a aplicação está no ar
app.get('/health', (req, res) => {
  res.status(200).json({ status: variavelNaoDeclarada });
});

// Só inicia o servidor de fato quando o arquivo é executado diretamente
// (assim os testes podem importar "app" sem abrir uma porta de rede)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
