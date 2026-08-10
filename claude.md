# CLAUDE.md — Convite de Casamento Áviny & Állan

Este arquivo dá contexto do projeto para o Claude Code. Leia antes de mexer em qualquer coisa.

## O que é este projeto

Site de casamento (Next.js 14, App Router) com:

- Um **fluxo guiado por telas** (não é mais uma página de rolagem única — ver
  seção de arquitetura abaixo)
- RSVP em etapas, salvo no Supabase (tabela `rsvps`), com notificação por
  e-mail via Resend
- Painel privado `/admin`, protegido por senha, com o log completo de confirmações
- Deploy na Vercel

**Status atual: funcional em produção.** Estamos numa fase de ajustes finos de
fluxo, texto e conteúdo — não de reconstrução.

## Arquitetura: fluxo por telas (importante!)

O site **não é mais** uma página com `scroll` entre sections com `id`. Desde a
migração pro fluxo guiado, `app/page.tsx` é só um wrapper de servidor (checa
se `public/pix-qrcode.png` existe) que renderiza `app/components/InviteFlow.tsx`,
que é quem realmente controla tudo:

- `InviteFlow.tsx` guarda o estado `step` (`hero | local | dresscode | rsvp | presentes`)
  e mostra **uma tela por vez**, com fade suave de saída/entrada (classes
  `.stage`, `.stage-leaving`, `.stage-entering` em `globals.css`)
- **Hero**: nomes, data, e dois botões — "Onde será" (→ `local`) e
  "Confirmar presença" (→ `dresscode`, não direto pro RSVP)
- **Local**: cerimônia + recepção, com botão "‹ Voltar" pro hero
- **Dress code**: versão "cheia", só avança com o botão "Entendido" (→ `rsvp`)
- **RSVP** (`app/components/RsvpWizard.tsx`): formulário **em etapas**, um
  campo por vez (nome → comparecerá? → se sim: acompanhante? → mensagem →
  enviar). Se marcar que leva acompanhante, abre `CompanionModal.tsx`
  (renderizado via `createPortal` direto no `<body>` — **não tirar esse
  portal**, é o que garante o modal centralizado no viewport; sem ele, o
  modal herda o `transform` da `.stage` e aparece deslocado)
  - Se "não vai": tela combinada de lamento + aviso de que o site fica
    ativo até o casamento + campo de mensagem opcional → depois de enviar,
    agradecimento **+ convite pro presente** (quem não vai também pode
    presentear) + botão pra ver a lista
  - Se "vai": depois de enviar, agradecimento + convite pro presente (sem
    forçar) + botão pra ver a lista
- **Presentes** (`app/components/PresentesScreen.tsx`): só é alcançável
  vindo do resultado do RSVP (sim ou não) — não tem link direto na hero de
  propósito, é parte do fluxo

**Componentes removidos nessa migração** (não recriar): `RsvpForm.tsx` (form
antigo de campo único) e `ScrollNudge.tsx` (seta de "role pra baixo" depois de
inatividade — não faz sentido sem scroll entre sections).

## Stack e convenções

- Next.js 14 (App Router), TypeScript, sem framework de CSS — estilos em
  `app/globals.css` usando variáveis CSS (`:root`) para cor/tipografia
- Conteúdo textual (nomes, datas, endereços, links, textos, categorias de
  presente, textos do modal/resultado do RSVP) fica centralizado em
  `lib/content.ts` — **edite esse arquivo antes de mexer em JSX** sempre que
  a mudança for só de texto/dado
- Banco: Supabase (`lib/supabase.ts` + `lib/store.ts`). Tabela `rsvps` criada
  via `supabase/schema.sql`. RLS desligado de propósito (uso pontual, um
  único evento)
- E-mail: Resend, opcional — a app funciona normalmente sem `RESEND_API_KEY`,
  só não dispara aviso por e-mail
- Paleta: verde-oliva + creme, tipografia script (`Alex Brush`) para os nomes
  do casal, serifada (`Cormorant Garamond`) para o corpo, sans (`Montserrat`)
  para rótulos em caixa alta com letter-spacing — tudo herdado do convite
  físico original
- Idioma: sempre português do Brasil, em todo o conteúdo e nos textos de UI
- Animações usam `@keyframes` simples em CSS (não biblioteca externa) e
  sempre respeitam `prefers-reduced-motion: reduce`

## Como validar antes de entregar

- `npm run build` (ou pelo menos `npx tsc --noEmit`) antes de considerar
  qualquer mudança pronta
- Testar localmente com `npm run dev` sempre que mexer em fluxo/animação —
  em especial, testar os dois ramos do RSVP (sim/não) e o modal de
  acompanhante depois de qualquer mudança no `RsvpWizard.tsx`
- Nunca commitar `.env.local` nem expor `SUPABASE_SERVICE_ROLE_KEY`,
  `RESEND_API_KEY` ou `ADMIN_PASSWORD` em código versionado

## Pendências conhecidas

- **Chave Pix real**: `lib/content.ts` → `presentesInfo.pix.chave` ainda
  está com o placeholder `"PIX_KEY_AQUI"`. Enquanto isso, `PixCard.tsx`
  mostra "Chave em breve" em vez da chave, e o botão de copiar fica
  desabilitado
- **QR Code do Pix**: `app/page.tsx` só renderiza a imagem do QR se
  `public/pix-qrcode.png` existir de verdade (checagem via `fs.existsSync`
  no servidor) — sem isso, mostra um placeholder "QR Code em breve". Gerar
  esse arquivo assim que a chave Pix definitiva estiver confirmada
- O prompt do Open Design (`docs/open-design-prompt.md`) **não foi usado**
  no resultado final — a section de presentes foi implementada diretamente
  em código (accordion nativo `<details>`/`<summary>` + card de Pix), porque
  o retorno do Open Design gerou HTML solto que colidia com a estrutura real
  da página. Esse arquivo pode ser removido/ignorado

**VALIDAÇÃO DE FUNCIONAMENTO E DEPLOY DO PROJETO**

1. VERIFICAÇÃO LOCAL
   - Rode `npm install`.
   - Rode `npm run build` e corrija qualquer erro de build antes de prosseguir.
   - Rode `npx tsc --noEmit` e corrija erros de tipo, se houver.

2. VERCEL CLI
   - Verifique se o `vercel` CLI está instalado (`npm i -g vercel` caso não esteja).
   - Rode `vercel login` se eu ainda não estiver autenticado, e me avise para eu
     completar o login manualmente (é interativo).
   - Rode `vercel link` para conectar esta pasta a um novo projeto Vercel (ou a um
     já existente, se eu indicar).

3. BANCO DE DADOS (supabase)
   -- Create the table
   create table rsvp (
   id uuid primary key,
   nome text not null,
   comparecera text not null check (comparecera in ('sim', 'nao')),
   leva_acompanhante boolean not null default false,
   nome_acompanhante text,
   mensagem text,
   criado_em timestamptz not null default now()
   );

   -- Enable Row Level Security and permit reads/writes
   alter table rsvp enable row level security;
   create policy "permitir leitura" on rsvp for select using (true);
   create policy "permitir insercao" on rsvp for insert with check (true);

4. VARIÁVEIS DE AMBIENTE
   - Configure via `vercel env add` (produção e preview) as seguintes variáveis,
     usando os valores do arquivo .env.example como referência:
     - ADMIN_EMAIL = allanpatrickdesiqueiralima@gmail.com
     - ADMIN_PASSWORD = wyvern
     - RESEND_API_KEY = (me pergunte se eu já tenho uma chave da resend.com;
       se eu não tiver, me explique rapidamente como gerar uma em
       https://resend.com/api-keys antes de continuar)

5. DEPLOY
   - Rode `vercel --prod` para publicar em produção.
   - Me mostre a URL final gerada.

6. TESTE PONTA A PONTA
   - Acesse a URL de produção e confirme que a página inicial carrega sem erros
     (imagens, fontes, brasão, links de mapa).
   - Envie uma confirmação de RSVP de teste via `curl` contra
     `/api/rsvp` (POST) simulando um convidado fictício.
   - Acesse `/admin`, faça login com a senha ADMIN_PASSWORD, e confirme que o
     RSVP de teste aparece na tabela.
   - Me confirme se o e-mail de notificação chegou (eu vou verificar minha caixa
     de entrada).
   - Se algo falhar em qualquer uma dessas etapas, investigue os logs com
     `vercel logs` e corrija antes de encerrar.

Ao final, me entregue: a URL pública do site, a URL do /admin, e um resumo do
que foi configurado (o que ficou automático e o que ainda depende de eu fazer
manualmente, como confirmar domínio próprio, se for o caso).
