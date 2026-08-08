import { NextRequest, NextResponse } from "next/server";
import { listarRsvps } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { senha } = await req.json();
    const senhaCorreta = process.env.ADMIN_PASSWORD || "wyvern";

    if (senha !== senhaCorreta) {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    const entries = await listarRsvps();
    // Mais recentes primeiro
    entries.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Erro ao listar RSVPs:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
