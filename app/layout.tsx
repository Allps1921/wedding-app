import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Áviny & Állan | 26 de setembro de 2026",
  description:
    "O amor nos uniu, e diante de Deus e das nossas famílias diremos 'sim'. Confira os detalhes do nosso casamento.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${montserrat.variable} ${alexBrush.variable}`}>
        {children}
      </body>
    </html>
  );
}
