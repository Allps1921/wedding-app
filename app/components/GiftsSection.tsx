"use client";

import { useState } from "react";
import Image from "next/image";
import { WEDDING } from "@/lib/content";

export default function GiftsSection() {
  // Começa com todas as categorias abertas; o visitante pode fechar individualmente.
  const [openCat, setOpenCat] = useState<string | null>("all");

  const { intro, categorias, pix } = WEDDING.presentesInfo;

  const toggleCat = (id: string) => {
    if (openCat === "all") {
      // Fechar todas e abrir apenas esta
      setOpenCat(id);
    } else if (openCat === id) {
      // Fechar esta (e todas ficam fechadas)
      setOpenCat(null);
    } else {
      // Abrir esta, mantém fechadas as outras
      setOpenCat(id);
    }
  };

  const isExpanded = (id: string) => openCat === "all" || openCat === id;

  const copyToClipboard = (text: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <section id="presentes">
      <div className="wrap">
        <p className="eyebrow center">Se desejar nos presentear</p>
        <h2 className="section-title">Lista de presentes</h2>

        {/* Pix destacado - posicionado acima de tudo para não ser ignorado */}
        <div className="pix-card">
          <h3 className="pix-title">Presente em dinheiro via Pix</h3>
          <p className="pix-subtitle">
            Como já moramos juntos, a casa está montada — mas uma ajuda
            para a lua de mel e a Reforminha da casa seria maravilhosa.
          </p>
          <div className="pix-content">
            <div className="pix-key-wrap">
              <code className="pix-key">{pix.chave}</code>
              <button
                type="button"
                className="copy-btn"
                onClick={() => copyToClipboard(pix.chave)}
                aria-label="Copiar chave Pix"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <span className="pix-favorecido">{pix.nomeFavorecido}</span>

            {/* QR Code - visível no desktop, clicável no mobile */}
            <Image
              src={pix.qrCodeSrc || "/placeholder.svg"}
              alt="QR Code Pix para presente em dinheiro"
              className="qr-code"
              width={140}
              height={140}
              priority
            />
          </div>
        </div>

        {/* Texto de abertura */}
        <p className="pix-intro">{intro}</p>

        {/* Categorias colapsáveis */}
        <div className="categories">
          {categorias.map((cat) => (
            <div key={cat.id} className="category">
              <button
                type="button"
                className="category-toggle"
                onClick={() => toggleCat(cat.id)}
                aria-expanded={isExpanded(cat.id)}
                aria-controls={`cat-${cat.id}-items`}
              >
                <h3 className="category-title">{cat.nome}</h3>
                <svg
                  className={`chevron ${
                    isExpanded(cat.id) ? "chevron-open" : ""
                  }`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                id={`cat-${cat.id}-items`}
                className={`category-items ${
                  isExpanded(cat.id) ? "category-items-open" : ""
                }`}
              >
                <ul className="item-list">
                  {cat.itens.map((item) => (
                    <li key={`${cat.id}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll arrow indicando que a section vai até o footer */}
        <a className="scroll-arrow" href="#rsvp" aria-label="Voltar para a confirmação de presença">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 9l8 8 8-8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
