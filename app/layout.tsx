import type { Metadata } from "next";
import "./globals.css";
import { Splash } from "@/components/Splash";
import { BottomNav } from "@/components/BottomNav";
export const metadata: Metadata = {
  title: "ZUXEN MEXICO",
  description: "Bioactivadores de bienestar premium para personas y mascotas",
  manifest: "/manifest.webmanifest",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#08080c"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
        <link rel="apple-touch-icon" href="/icons/icon-192.png"/>
      </head>
      <body>
        <Splash/>
        <div className="shell">{children}</div>
        <BottomNav/>
      </body>
    </html>
  );
}
