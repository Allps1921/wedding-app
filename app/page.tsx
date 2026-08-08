import RsvpForm from "./components/RsvpForm";
import { WEDDING } from "@/lib/content";

export default function Home() {
  const inicialEla = WEDDING.noivos.ela.trim()[0];
  const inicialEle = WEDDING.noivos.ele.trim()[0];

  return (
    <main>
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brasao.png"
          alt={`Brasão com as iniciais ${inicialEla}${inicialEle}`}
          className="brasao"
        />
        <p className="eyebrow">Nosso casamento</p>
        <p className="hero-message">
          O amor nos uniu, e diante de Deus e das nossas famílias diremos “sim”.
        </p>
        <h1 className="hero-names">
          {WEDDING.noivos.ela} &amp; {WEDDING.noivos.ele}
        </h1>
        <p className="hero-date">
          {WEDDING.data.diaSemanaExtenso} · {WEDDING.data.horario}h
        </p>
      </section>

      <section id="local">
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

      <section className="dresscode">
        <p className="eyebrow">Dress code</p>
        <h2 className="section-title" style={{ marginBottom: 12 }}>
          Traje
        </h2>
        <p>{WEDDING.dressCode}</p>
      </section>

      <section id="rsvp">
        <p className="eyebrow center">Sua presença é o nosso maior presente</p>
        <h2 className="section-title">Confirme sua presença</h2>
        <p className="blessing" style={{ marginTop: 12 }}>
          Por favor, confirme até {WEDDING.data.prazoConfirmacao}.
        </p>
        <RsvpForm />
      </section>

      <section id="presentes">
        <p className="eyebrow center">Se desejar nos presentear</p>
        <h2 className="section-title">Lista de presentes</h2>
        <div className="gifts">
          {WEDDING.presentes.map((p) => (
            <div className="gift-card" key={p.id}>
              <h4>{p.nome}</h4>
              <p>{p.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        {WEDDING.noivos.ela} &amp; {WEDDING.noivos.ele} · {WEDDING.data.diaSemanaExtenso}
      </footer>
    </main>
  );
}
