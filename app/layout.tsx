import type { Metadata } from "next";
import "./globals.css";
import { Splash } from "@/components/Splash";
import { BottomNav } from "@/components/BottomNav";
export const metadata: Metadata = {
  title: "ZUXEN MÉXICO — Bioactivadores Premium",
  description: "La red de distribución de bioactivadores más innovadora de México",
  manifest: "/manifest.webmanifest",
  themeColor:"#06080f",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"ZUXEN"},
  viewport:{width:"device-width",initialScale:1,viewportFit:"cover"},
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#06080f"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <link rel="apple-touch-icon" href="/icons/icon-192.png"/>
        <style>{`
          *{-webkit-tap-highlight-color:transparent}
          html{overscroll-behavior:none}
          body{overscroll-behavior:none;touch-action:pan-y}
          ::selection{background:rgba(0,200,255,.25);color:#eef2ff}
        `}</style>
      </head>
      <body>
        <Splash/>
        <div className="shell">{children}</div>
        <BottomNav/>
      </body>
    </html>
  );
}
