import { WEDDING } from "@/lib/content";
import PixCard from "./Pixcard";
import GiftCategories from "./Giftcategories";

type Props = {
  temQrCode: boolean;
  onVoltarInicio: () => void;
};

export default function PresentesScreen({ temQrCode, onVoltarInicio }: Props) {
  return (
    <div className="wizard-fade">
      <p className="eyebrow center">Se desejar nos presentear</p>
      <h2 className="section-title">Lista de presentes</h2>
      <p className="blessing" style={{ marginTop: 12 }}>
        {WEDDING.presentesInfo.intro}
      </p>

      <PixCard
        chave={WEDDING.presentesInfo.pix.chave}
        nomeFavorecido={WEDDING.presentesInfo.pix.nomeFavorecido}
        temQrCode={temQrCode}
        qrCodeSrc={WEDDING.presentesInfo.pix.qrCodeSrc}
      />

      <GiftCategories categorias={WEDDING.presentesInfo.categorias} />

      <button type="button" className="back-link" onClick={onVoltarInicio} style={{ marginTop: 40 }}>
        ‹ Voltar ao início
      </button>
    </div>
  );
}