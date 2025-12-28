import "./globals.css";
import NavbarMarketplace from "./components/NavbarMarketplace";
import FooterMarketplace from "./components/FooterMarketplace";
import EcoAssistant from "./components/EcoAssistant";

export const metadata = {
  title: "Kelab",
  description: "Plataforma ambiental",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-gray-100">
        <NavbarMarketplace />
        <main className="flex-grow">{children}</main>
        <EcoAssistant />
        <FooterMarketplace />
      </body>
    </html>
  );
}
