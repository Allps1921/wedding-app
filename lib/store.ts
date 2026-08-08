import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase não configurado — verifique SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export type RsvpEntry = {
  id: string;
  nome: string;
  comparecera: "sim" | "nao";
  levaAcompanhante: boolean;
  nomeAcompanhante?: string;
  mensagem?: string;
  criadoEm: string;
};

export async function salvarRsvp(entry: RsvpEntry) {
  const { error } = await supabase.from("rsvp").insert([
    {
      id: entry.id,
      nome: entry.nome,
      comparecera: entry.comparecera,
      leva_acompanhante: entry.levaAcompanhante,
      nome_acompanhante: entry.nomeAcompanhante || null,
      mensagem: entry.mensagem || null,
      criado_em: entry.criadoEm,
    },
  ]);
  if (error) throw error;
}

export async function listarRsvps(): Promise<RsvpEntry[]> {
  const { data, error } = await supabase
    .from("rsvp")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    nome: row.nome,
    comparecera: row.comparecera,
    levaAcompanhante: row.leva_acompanhante,
    nomeAcompanhante: row.nome_acompanhante || undefined,
    mensagem: row.mensagem || undefined,
    criadoEm: row.criado_em,
  }));
}
