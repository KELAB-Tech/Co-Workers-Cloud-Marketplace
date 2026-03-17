import NavbarMarketplace from "@/app/components/NavbarMarketplace";
import FooterMarketplace from "@/app/components/FooterMarketplace";
import EcoAssistant from "@/app/components/EcoAssistant";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-gray-100"
      >
        <NavbarMarketplace />
        <main className="flex-grow">{children}</main>
        <EcoAssistant />
        <FooterMarketplace />
      </body>
    </html>
  );
}
