"use client";

import { useState } from "react";

type Comparecera = "sim" | "nao" | null;

export default function RsvpForm() {
  const [nome, setNome] = useState("");
  const [comparecera, setComparecera] = useState<Comparecera>(null);
  const [levaAcompanhante, setLevaAcompanhante] = useState<boolean | null>(null);
  const [nomeAcompanhante, setNomeAcompanhante] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const podeEnviar = nome.trim().length >= 2 && comparecera !== null && status !== "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          comparecera,
          levaAcompanhante: comparecera === "sim" ? Boolean(levaAcompanhante) : false,
          nomeAcompanhante: levaAcompanhante ? nomeAcompanhante : undefined,
          mensagem,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar sua confirmação.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Algo deu errado. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="rsvp-success">
        <div className="form-success">
          {comparecera === "sim"
            ? "Presença confirmada! Contamos com você para celebrar esse dia. 💛"
            : "Confirmação recebida. Sentiremos sua falta!"}
        </div>
        <a className="scroll-arrow" href="#presentes" aria-label="Ir para a lista de presentes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 9l8 8 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <form className="rsvp-box" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como você gostaria de ser identificado(a)"
          required
        />
      </div>

      <div className="field">
        <label>Você poderá comparecer?</label>
        <div className="choice-group">
          <div
            className={`choice ${comparecera === "sim" ? "selected" : ""}`}
            onClick={() => setComparecera("sim")}
          >
            Sim, estarei lá
          </div>
          <div
            className={`choice ${comparecera === "nao" ? "selected" : ""}`}
            onClick={() => {
              setComparecera("nao");
              setLevaAcompanhante(null);
            }}
          >
            Não poderei ir
          </div>
        </div>
      </div>

      {comparecera === "sim" && (
        <div className="field">
          <label>Vai levar acompanhante?</label>
          <div className="choice-group">
            <div
              className={`choice ${levaAcompanhante === true ? "selected" : ""}`}
              onClick={() => setLevaAcompanhante(true)}
            >
              Sim
            </div>
            <div
              className={`choice ${levaAcompanhante === false ? "selected" : ""}`}
              onClick={() => setLevaAcompanhante(false)}
            >
              Não
            </div>
          </div>
        </div>
      )}

      {comparecera === "sim" && levaAcompanhante && (
        <div className="field">
          <label htmlFor="acompanhante">Nome do acompanhante</label>
          <input
            id="acompanhante"
            type="text"
            value={nomeAcompanhante}
            onChange={(e) => setNomeAcompanhante(e.target.value)}
            placeholder="Nome de quem vai com você"
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="mensagem">Deixe uma mensagem para os noivos (opcional)</label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Escreva aqui, se quiser"
        />
      </div>

      {status === "error" && <div className="form-error">{errorMsg}</div>}

      <button type="submit" className="submit-btn" disabled={!podeEnviar}>
        {status === "loading" ? "Enviando..." : "Confirmar presença"}
      </button>

      <p className="form-note">
        Convites individuais podem levar apenas um acompanhante. Convites em nome da família já
        incluem as crianças.
      </p>
    </form>
  );
}