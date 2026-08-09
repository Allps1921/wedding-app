import { WEDDING } from "@/lib/content";

type Categoria = (typeof WEDDING.presentesInfo.categorias)[number];

export default function GiftCategories({ categorias }: { categorias: readonly Categoria[] }) {
  return (
    <div className="gift-categories">
      {categorias.map((cat, i) => (
        <details className="gift-category" key={cat.id} open={i === 0}>
          <summary>
            <span>{cat.nome}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="gift-category-chevron">
              <path d="M4 9l8 8 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <ul className="gift-category-items">
            {cat.itens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}