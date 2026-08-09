"use client";

import { useState } from "react";

type Props = {
  chave: string;
  nomeFavorecido: string;
  temQrCode: boolean;
  qrCodeSrc: string;
};

export default function PixCard({ chave, nomeFavorecido, temQrCode, qrCodeSrc }: Props) {
  const [copiado, setCopiado] = useState(false);
  const chavePendente = chave === "PIX_KEY_AQUI";

  async function copiarChave() {
    if (chavePendente) return;
    try {
      await navigator.clipboard.writeText(chave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (ex: contexto não seguro) — usuário copia manualmente.
    }
  }

  return (
    <div className="pix-card">
      <p className="pix-card-title">Presente em dinheiro via Pix</p>

      <div className="pix-key-row">
        <span className="pix-key">{chavePendente ? "Chave em breve" : chave}</span>
        {!chavePendente && (
          <button type="button" className="pix-copy-btn" onClick={copiarChave}>
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        )}
      </div>

      <p className="pix-favorecido">{nomeFavorecido}</p>

      {temQrCode ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrCodeSrc} alt="QR Code do Pix" className="pix-qrcode" width={180} height={180} />
      ) : (
        <div className="pix-qrcode-placeholder">QR Code em breve</div>
      )}
    </div>
  );
}