import NavbarMarketplace from "@/app/components/NavbarMarketplace";
import FooterMarketplace from "@/app/components/FooterMarketplace";
import EcoAssistant from "@/app/components/EcoAssistant";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
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
