import fs from "fs";
import path from "path";
import InviteFlow from "./components/InviteFlow";

export default function Home() {
  // Checagem no servidor: só tenta renderizar a imagem do QR Code se o
  // arquivo realmente existir em /public — evita ícone de imagem quebrada
  // enquanto a chave Pix definitiva (e o QR gerado a partir dela) não chegam.
  const qrPath = path.join(process.cwd(), "public", "pix-qrcode.png");
  const temQrCode = fs.existsSync(qrPath);

  return <InviteFlow temQrCode={temQrCode} />;
}