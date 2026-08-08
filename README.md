# Convite de casamento — Áviny & Állan

Site do casamento com confirmação de presença (RSVP), lista de presentes e um
painel privado (`/admin`) onde só vocês veem o log completo de quem confirmou.

## O que já está pronto

- Página principal com nomes, data, cerimônia, recepção (com links de mapa),
  dress code, formulário de RSVP e lista de presentes (com 6 itens padrão —
  edite/adicione em `lib/content.ts`).
- Formulário de RSVP salva cada resposta em um banco de dados (Vercel KV) —
  os dados **não somem** entre acessos, diferente de um arquivo `.json` solto
  no servidor.
- Cada confirmação dispara um e-mail para vocês (via Resend), se configurado.
- Página `/admin` protegida por senha, com tabela completa + resumo
  (quantos confirmados, quantos acompanhantes, quantos não vão).

⚠️ **Atenção**: o convite original diz que o prazo de confirmação é
**10 de julho de 2026**, mas isso já ficou no passado. Se foi um erro de
digitação, ajuste em `lib/content.ts` (campo `prazoConfirmacao`) antes de
divulgar o link.

## Passo a passo para colocar no ar

### 1. Criar o repositório

Suba esta pasta para um repositório no GitHub (pode ser privado).

### 2. Importar na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New → Project**
2. Selecione o repositório
3. Framework: a Vercel detecta **Next.js** automaticamente — não precisa mudar nada

### 3. Criar o banco de dados (Vercel KV)

1. Dentro do projeto na Vercel, vá em **Storage → Create Database → KV**
2. Crie o banco e **conecte ao projeto** — a Vercel adiciona as variáveis
   `KV_REST_API_URL`, `KV_REST_API_TOKEN` etc. automaticamente

### 4. Configurar as variáveis de ambiente

Em **Settings → Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `ADMIN_EMAIL` | `allanpatrickdesiqueiralima@gmail.com` |
| `ADMIN_PASSWORD` | `wyvern` (ou troque por outra de sua preferência) |
| `RESEND_API_KEY` | sua chave da [resend.com](https://resend.com) (veja abaixo) |

### 5. Configurar o envio de e-mail (opcional, mas recomendado)

Sem isso, as confirmações continuam sendo salvas normalmente — só não chega
aviso por e-mail a cada uma.

1. Crie uma conta gratuita em [resend.com](https://resend.com)
2. Gere uma **API Key** em **API Keys → Create**
3. Cole essa chave na variável `RESEND_API_KEY` na Vercel
4. O plano gratuito da Resend já permite enviar pelo domínio de teste deles
   (`onboarding@resend.dev`), então funciona sem precisar configurar domínio
   próprio. Se quiser enviar de um e-mail com o nome de vocês, é possível
   verificar um domínio próprio depois, direto no painel da Resend.

### 6. Deploy

Clique em **Deploy**. Pronto — o link público fica algo como
`https://seu-projeto.vercel.app`, e você pode configurar um domínio próprio
depois em **Settings → Domains**.

### 7. Acessar o painel privado

Vá em `https://seu-projeto.vercel.app/admin` e entre com a senha configurada
em `ADMIN_PASSWORD`. Essa página não aparece em nenhum menu nem é linkada em
lugar nenhum do site — só quem tem a URL exata acessa.

## Rodando localmente (opcional)

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

Abra http://localhost:3000

## Onde editar o conteúdo

Praticamente todo o texto (nomes, data, endereços, links, dress code, lista
de presentes) está centralizado em **`lib/content.ts`** — não precisa mexer
no resto do código para atualizar informações.
