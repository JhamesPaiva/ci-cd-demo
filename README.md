## Passo 1 — Testar localmente (opcional, mas recomendado antes da apresentação)

Dentro da pasta `ci-cd-demo`:

```bash
npm install
npm test
npm run lint
npm start
```

## Passo 3 — Subir o projeto

Dentro da pasta `ci-cd-demo`, execute:

```bash
git init
git add .
git commit -m "Configura aplicacao e pipeline de CI"
git branch -M main
git remote add origin https://github.com/JhamesPaiva/ci-cd-demo.git
git push -u origin main
```

## Passo 4 — Ver o pipeline rodando (cenário de SUCESSO)

1. No GitHub, abra a aba **Actions** do repositório.
2. Você verá o workflow "CI" disparado automaticamente pelo push.
3. Clique nele e acompanhe os steps em execução: checkout, setup-node,
   `npm ci`, `npm test`, `npm run lint`.
4. Ao final, o workflow deve ficar com um **check verde** ✅, e o commit na
   página principal do repositório também mostra esse ícone verde.

## Passo 5 — Provocar uma falha de propósito (cenário de ERRO)

Edite o arquivo `src/app.js` e troque a linha do `res.status(200)...` por uma
que use uma variável que não existe, por exemplo:

```js
app.get('/health', (req, res) => {
  res.status(200).json({ status: variavelNaoDeclarada });
});
```

Depois suba a alteração:

```bash
git add .
git commit -m "Introduz erro proposital para demonstrar falha no pipeline"
git push
```

Volte na aba **Actions**: o workflow vai falhar no step "Executar testes"
(`npm test`), porque o teste chama `/health` e a aplicação quebra com
`ReferenceError: variavelNaoDeclarada is not defined`. O commit aparece com um
**X vermelho** ❌, e o GitHub também envia notificação por e-mail
avisando da falha.

## Passo 6 — Corrigir e mostrar a recuperação (opcional, fecha bem a apresentação)

Desfaça o erro (volte para `status: 'ok'`), commit e push de novo. O pipeline
volta a ficar verde, mostrando o ciclo completo: código com problema é
bloqueado, código corrigido é aprovado.
