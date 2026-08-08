import { NextRequest, NextResponse } from "next/server";
import { salvarRsvp, RsvpEntry } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, comparecera, levaAcompanhante, nomeAcompanhante, mensagem } = body;

    if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
      return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
    }
    if (comparecera !== "sim" && comparecera !== "nao") {
      return NextResponse.json({ error: "Confirmação inválida." }, { status: 400 });
    }

    const entry: RsvpEntry = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      comparecera,
      levaAcompanhante: Boolean(levaAcompanhante),
      nomeAcompanhante: nomeAcompanhante?.trim() || undefined,
      mensagem: mensagem?.trim() || undefined,
      criadoEm: new Date().toISOString(),
    };

    await salvarRsvp(entry);

    // Envia notificação por e-mail (se RESEND_API_KEY estiver configurada)
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const statusTexto = entry.comparecera === "sim" ? "confirmou presença ✅" : "não poderá comparecer ❌";
        const acompanhanteTexto = entry.levaAcompanhante
          ? `Levará acompanhante: ${entry.nomeAcompanhante || "(nome não informado)"}`
          : "Não levará acompanhante.";

        await resend.emails.send({
          from: "Convite de Casamento <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL,
          subject: `RSVP: ${entry.nome} ${statusTexto}`,
          text: `${entry.nome} ${statusTexto}\n${acompanhanteTexto}\n${
            entry.mensagem ? `Mensagem: ${entry.mensagem}` : ""
          }\n\nRecebido em: ${new Date(entry.criadoEm).toLocaleString("pt-BR")}`,
        });
      } catch (emailError) {
        // Não falha a requisição se o e-mail não puder ser enviado —
        // o registro já está salvo no banco.
        console.error("Falha ao enviar e-mail de notificação:", emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao processar RSVP:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
