"use client";

import { useState } from "react";
import { WEDDING } from "@/lib/content";
import RsvpWizard from "./RsvpWizard";
import PresentesScreen from "./PresentesScreen";

type Step = "hero" | "local" | "dresscode" | "rsvp" | "presentes";

const TRANSITION_MS = 320;

export default function InviteFlow({ temQrCode }: { temQrCode: boolean }) {
  const [step, setStep] = useState<Step>("hero");
  const [leaving, setLeaving] = useState(false);

  const inicialEla = WEDDING.noivos.ela.trim()[0];
  const inicialEle = WEDDING.noivos.ele.trim()[0];

  function navigate(next: Step) {
    setLeaving(true);
    setTimeout(() => {
      setStep(next);
      setLeaving(false);
    }, TRANSITION_MS);
  }

  return (
    <main>
      <div className={`stage ${leaving ? "stage-leaving" : "stage-entering"}`} key={step}>
        {step === "hero" && (
          <section className="hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brasao.png"
              alt={`Brasão com as iniciais ${inicialEla}${inicialEle}`}
              className="brasao hero-anim hero-anim-1"
              width={700}
              height={700}
            />
            <p className="eyebrow hero-anim hero-anim-2">Nosso casamento</p>
            <p className="hero-message hero-anim hero-anim-3">
              O amor nos uniu, e diante de Deus e das nossas famílias diremos “sim”.
            </p>
            <h1 className="hero-names hero-anim hero-anim-4">
              <span className="hero-name">{WEDDING.noivos.ela}</span>
              <span className="hero-amp">&amp;</span>
              <span className="hero-name">{WEDDING.noivos.ele}</span>
            </h1>
            <p className="hero-date hero-anim hero-anim-5">
              {WEDDING.data.diaSemanaExtenso} · {WEDDING.data.horario}h
            </p>

            <div className="hero-actions hero-anim hero-anim-6">
              <button type="button" className="btn" onClick={() => navigate("local")}>
                Onde será
              </button>
              <button type="button" className="btn-outline" onClick={() => navigate("dresscode")}>
                Confirmar presença
              </button>
            </div>
          </section>
        )}

        {step === "local" && (
          <section>
            <button type="button" className="back-link" onClick={() => navigate("hero")}>
              ‹ Voltar
            </button>
            <p className="eyebrow center">Onde celebrar com a gente</p>
            <h2 className="section-title">Cerimônia &amp; Recepção</h2>
            <div className="cards">
              <div className="card">
                <h3>Cerimônia</h3>
                <p className="place">{WEDDING.cerimonia.nome}</p>
                <p className="addr">{WEDDING.cerimonia.endereco}</p>
                <a className="btn" href={WEDDING.cerimonia.link} target="_blank" rel="noopener noreferrer">
                  Ver localização
                </a>
              </div>
              <div className="card">
                <h3>Recepção</h3>
                <p className="place">{WEDDING.recepcao.nome}</p>
                <p className="addr">Após a cerimônia, os convidados serão recepcionados aqui.</p>
                <a className="btn" href={WEDDING.recepcao.link} target="_blank" rel="noopener noreferrer">
                  Ver localização
                </a>
              </div>
            </div>
          </section>
        )}

        {step === "dresscode" && (
          <section className="dresscode dresscode-full">
            <button type="button" className="back-link" onClick={() => navigate("hero")}>
              ‹ Voltar
            </button>
            <p className="eyebrow">Antes de confirmar</p>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              Dress code
            </h2>
            <div className="rule" />
            <p className="dresscode-text">{WEDDING.dressCode}</p>
            <button type="button" className="btn" style={{ marginTop: 30 }} onClick={() => navigate("rsvp")}>
              Entendido
            </button>
          </section>
        )}

        {step === "rsvp" && (
          <section id="rsvp">
            <p className="eyebrow center">Sua presença é o nosso maior presente</p>
            <h2 className="section-title">Confirme sua presença</h2>
            <p className="blessing" style={{ marginTop: 12 }}>
              Por favor, confirme até {WEDDING.data.prazoConfirmacao}.
            </p>
            <RsvpWizard
              onVerPresentes={() => navigate("presentes")}
              onVoltarInicio={() => navigate("hero")}
            />
          </section>
        )}

        {step === "presentes" && (
          <PresentesScreen temQrCode={temQrCode} onVoltarInicio={() => navigate("hero")} />
        )}
      </div>

      <footer>
        {WEDDING.noivos.ela} &amp; {WEDDING.noivos.ele} · {WEDDING.data.diaSemanaExtenso}
      </footer>
    </main>
  );
}