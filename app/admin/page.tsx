"use client";

import { useState } from "react";
import { WEDDING } from "@/lib/content";

type RsvpEntry = {
  id: string;
  nome: string;
  comparecera: "sim" | "nao";
  levaAcompanhante: boolean;
  nomeAcompanhante?: string;
  mensagem?: string;
  criadoEm: string;
};

export default function AdminPage() {
  const [senha, setSenha] = useState("");
  const [entries, setEntries] = useState<RsvpEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function carregar(senhaAtual: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: senhaAtual }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível carregar os dados.");
      }
      const data = await res.json();
      setEntries(data.entries);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar.");
      setEntries(null);
    } finally {
      setLoading(false);
    }
  }

  if (!entries) {
    return (
      <div className="admin-wrap">
        <form
          className="admin-login"
          onSubmit={(e) => {
            e.preventDefault();
            carregar(senha);
          }}
        >
          <p className="eyebrow center">Acesso restrito</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            style={{
              padding: "12px 14px",
              border: "1px solid var(--line)",
              fontFamily: "var(--font-serif)",
              fontSize: 16,
            }}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </button>
          {error && <div className="form-error">{error}</div>}
        </form>
      </div>
    );
  }

  const confirmados = entries.filter((e) => e.comparecera === "sim");
  const naoVao = entries.filter((e) => e.comparecera === "nao");
  const totalAcompanhantes = confirmados.filter((e) => e.levaAcompanhante).length;
  const totalPessoas = confirmados.length + totalAcompanhantes;

  return (
    <div className="admin-wrap">
      <p className="eyebrow center">Painel privado</p>
      <h1 className="section-title" style={{ marginBottom: 4 }}>
        Confirmações — {WEDDING.noivos.ela} &amp; {WEDDING.noivos.ele}
      </h1>

      <div className="summary-bar">
        <div className="summary-item">
          <span className="n">{confirmados.length}</span>
          <span className="l">Confirmados</span>
        </div>
        <div className="summary-item">
          <span className="n">{totalAcompanhantes}</span>
          <span className="l">Acompanhantes</span>
        </div>
        <div className="summary-item">
          <span className="n">{totalPessoas}</span>
          <span className="l">Total de pessoas</span>
        </div>
        <div className="summary-item">
          <span className="n">{naoVao.length}</span>
          <span className="l">Não vão</span>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Acompanhante</th>
            <th>Mensagem</th>
            <th>Recebido em</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.nome}</td>
              <td>
                <span className={`tag ${e.comparecera}`}>
                  {e.comparecera === "sim" ? "Vai" : "Não vai"}
                </span>
              </td>
              <td>{e.levaAcompanhante ? e.nomeAcompanhante || "Sim (sem nome)" : "—"}</td>
              <td>{e.mensagem || "—"}</td>
              <td>{new Date(e.criadoEm).toLocaleString("pt-BR")}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 24 }}>
                Nenhuma confirmação recebida ainda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
