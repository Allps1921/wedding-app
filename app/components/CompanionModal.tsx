"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { WEDDING } from "@/lib/content";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: (nomeAcompanhante: string) => void;
};

export default function CompanionModal({ open, onCancel, onConfirm }: Props) {
  const [nome, setNome] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  const podeConfirmar = nome.trim().length >= 2;

  return createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-box">
        <p className="eyebrow">{WEDDING.acompanhanteModal.titulo}</p>
        <p className="modal-text">{WEDDING.acompanhanteModal.mensagem}</p>

        <div className="field" style={{ marginTop: 20 }}>
          <label htmlFor="nome-acompanhante">{WEDDING.acompanhanteModal.campoLabel}</label>
          <input
            id="nome-acompanhante"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome de quem vai com você"
            autoFocus
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={onCancel}>
            Voltar
          </button>
          <button
            type="button"
            className="btn"
            disabled={!podeConfirmar}
            onClick={() => onConfirm(nome.trim())}
          >
            {WEDDING.acompanhanteModal.botaoConfirmar}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}