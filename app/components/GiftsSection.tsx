"use client";

import { useState } from "react";
import Image from "next/image";
import { WEDDING } from "@/lib/content";
import styles from "./GiftsSection.module.css";

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
    <section id="presentes" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow center">Se desejar nos presentear</p>
        <h2 className="section-title">Lista de presentes</h2>

        {/* Pix destacado - posicionado acima de tudo para não ser ignorado */}
        <div className={styles.pixCard}>
          <h3 className={styles.pixTitle}>Presente em dinheiro via Pix</h3>
          <p className={styles.pixSubtitle}>
            Como já moramos juntos, a casa está montada — mas uma ajuda
            para a lua de mel e a Reforminha da casa seria maravilhosa.
          </p>
          <div className={styles.pixContent}>
            <div className={styles.pixKeyWrap}>
              <code className={styles.pixKey}>{pix.chave}</code>
              <button
                type="button"
                className={styles.copyBtn}
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
            <span className={styles.pixFavorecido}>{pix.nomeFavorecido}</span>

            {/* QR Code - visível no desktop, clicável no mobile */}
            <Image
              src={pix.qrCodeSrc || "/placeholder.svg"}
              alt="QR Code Pix para presente em dinheiro"
              className={styles.qrCode}
              width={140}
              height={140}
              priority
            />
          </div>
        </div>

        {/* Texto de abertura */}
        <p className={styles.intro}>{intro}</p>

        {/* Categorias colapsáveis */}
        <div className={styles.categories}>
          {categorias.map((cat) => (
            <div key={cat.id} className={styles.category}>
              <button
                type="button"
                className={styles.categoryToggle}
                onClick={() => toggleCat(cat.id)}
                aria-expanded={isExpanded(cat.id)}
                aria-controls={`cat-${cat.id}-items`}
              >
                <h3 className={styles.categoryTitle}>{cat.nome}</h3>
                <svg
                  className={`${styles.chevron} ${
                    isExpanded(cat.id) ? styles.chevronOpen : ""
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
                className={`${styles.categoryItems} ${
                  isExpanded(cat.id) ? styles.categoryItemsOpen : ""
                }`}
              >
                <ul className={styles.itemList}>
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
