"use client";

import { useState } from "react";
import { WEDDING } from "@/lib/content";
import CompanionModal from "./CompanionModal";

type Comparecera = "sim" | "nao" | null;
type SubStep = "nome" | "comparecera" | "acompanhante" | "mensagem" | "nao-info" | "resultado";

type Props = {
  onVerPresentes: () => void;
  onVoltarInicio: () => void;
};

export default function RsvpWizard({ onVerPresentes, onVoltarInicio }: Props) {
  const [subStep, setSubStep] = useState<SubStep>("nome");
  const [nome, setNome] = useState("");
  const [comparecera, setComparecera] = useState<Comparecera>(null);
  const [levaAcompanhante, setLevaAcompanhante] = useState<boolean | null>(null);
  const [nomeAcompanhante, setNomeAcompanhante] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function irParaComparecera() {
    if (nome.trim().length < 2) return;
    setSubStep("comparecera");
  }

  function escolherComparecera(valor: "sim" | "nao") {
    setComparecera(valor);
    if (valor === "sim") {
      setSubStep("acompanhante");
    } else {
      setLevaAcompanhante(false);
      setSubStep("nao-info");
    }
  }

  function escolherAcompanhante(valor: boolean) {
    if (valor) {
      setShowModal(true);
    } else {
      setLevaAcompanhante(false);
      setNomeAcompanhante("");
      setSubStep("mensagem");
    }
  }

  function confirmarAcompanhante(nomeInformado: string) {
    setLevaAcompanhante(true);
    setNomeAcompanhante(nomeInformado);
    setShowModal(false);
    setSubStep("mensagem");
  }

  function cancelarAcompanhante() {
    setShowModal(false);
    setLevaAcompanhante(null);
  }

  async function enviar() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          comparecera,
          levaAcompanhante: Boolean(levaAcompanhante),
          nomeAcompanhante: levaAcompanhante ? nomeAcompanhante : undefined,
          mensagem,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar sua confirmação.");
      }

      setStatus("idle");
      setSubStep("resultado");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div className="rsvp-wizard">
      {subStep === "nome" && (
        <div className="wizard-fade field" key="step-nome">
          <label htmlFor="nome">Como podemos te chamar?</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && irParaComparecera()}
          />
          <button
            type="button"
            className="btn"
            style={{ marginTop: 18 }}
            disabled={nome.trim().length < 2}
            onClick={irParaComparecera}
          >
            Continuar
          </button>
        </div>
      )}

      {subStep === "comparecera" && (
        <div className="wizard-fade" key="step-comparecera">
          <p className="wizard-question">{nome.split(" ")[0]}, você poderá comparecer?</p>
          <div className="choice-group">
            <div className="choice" onClick={() => escolherComparecera("sim")}>
              Sim, estarei lá
            </div>
            <div className="choice" onClick={() => escolherComparecera("nao")}>
              Não poderei ir
            </div>
          </div>
        </div>
      )}

      {subStep === "acompanhante" && (
        <div className="wizard-fade" key="step-acompanhante">
          <p className="wizard-question">Vai levar acompanhante?</p>
          <div className="choice-group">
            <div className="choice" onClick={() => escolherAcompanhante(true)}>
              Sim
            </div>
            <div className="choice" onClick={() => escolherAcompanhante(false)}>
              Não
            </div>
          </div>
        </div>
      )}

      {subStep === "nao-info" && (
        <div className="wizard-fade rsvp-resultado" key="step-nao-info">
          <p className="section-title" style={{ fontSize: 26 }}>
            {WEDDING.rsvpResultado.naoTitulo}
          </p>
          <p className="blessing">{WEDDING.rsvpResultado.naoMensagem}</p>
          <p className="blessing" style={{ marginTop: 12 }}>
            {WEDDING.rsvpResultado.naoSiteAtivo}
          </p>

          <div className="field" style={{ marginTop: 24, textAlign: "left" }}>
            <label htmlFor="mensagem-nao">Deixe uma mensagem para os noivos (opcional)</label>
            <textarea
              id="mensagem-nao"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Escreva aqui, se quiser"
            />
          </div>

          {status === "error" && <div className="form-error" style={{ marginTop: 12 }}>{errorMsg}</div>}

          <button
            type="button"
            className="btn"
            style={{ marginTop: 18 }}
            disabled={status === "loading"}
            onClick={enviar}
          >
            {status === "loading" ? "Enviando..." : "Enviar"}
          </button>
        </div>
      )}

      {subStep === "mensagem" && (
        <div className="wizard-fade field" key="step-mensagem">
          <label htmlFor="mensagem">Deixe uma mensagem para os noivos (opcional)</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva aqui, se quiser"
          />
          {status === "error" && <div className="form-error" style={{ marginTop: 12 }}>{errorMsg}</div>}
          <button
            type="button"
            className="btn"
            style={{ marginTop: 18 }}
            disabled={status === "loading"}
            onClick={enviar}
          >
            {status === "loading" ? "Enviando..." : "Confirmar"}
          </button>
        </div>
      )}

      {subStep === "resultado" && comparecera === "sim" && (
        <div className="wizard-fade rsvp-resultado" key="step-resultado-sim">
          <p className="section-title" style={{ fontSize: 28 }}>
            {WEDDING.rsvpResultado.simTitulo}
          </p>
          <p className="blessing">{WEDDING.rsvpResultado.simMensagem}</p>
          <p className="blessing" style={{ marginTop: 14 }}>
            {WEDDING.rsvpResultado.simPresenteConvite}
          </p>
          <button type="button" className="btn" style={{ marginTop: 22 }} onClick={onVerPresentes}>
            Ver lista de presentes
          </button>
        </div>
      )}

      {subStep === "resultado" && comparecera === "nao" && (
        <div className="wizard-fade rsvp-resultado" key="step-resultado-nao">
          <p className="section-title" style={{ fontSize: 28 }}>
            {WEDDING.rsvpResultado.naoEnviadoTitulo}
          </p>
          <p className="blessing">{WEDDING.rsvpResultado.naoEnviadoMensagem}</p>
          <p className="blessing" style={{ marginTop: 12 }}>
            {WEDDING.rsvpResultado.naoPresenteConvite}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={onVerPresentes}>
              Ver lista de presentes
            </button>
            <button type="button" className="btn-outline" onClick={onVoltarInicio}>
              Voltar ao início
            </button>
          </div>
        </div>
      )}

      <CompanionModal open={showModal} onCancel={cancelarAcompanhante} onConfirm={confirmarAcompanhante} />
    </div>
  );
}