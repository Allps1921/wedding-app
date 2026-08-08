Estou com um projeto Next.js (convite de casamento com RSVP) nesta pasta.
Preciso que você deixe ele 100% funcional em produção na Vercel. Siga esta ordem:

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
   create table notes (
   id bigint primary key generated always as identity,
   title text not null
   );

-- Insert some sample data into the table
insert into notes (title)
values
('Today I created a Supabase project.'),
('I added some data and queried it from Next.js.'),
('It was awesome!');

alter table notes enable row level security;

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
