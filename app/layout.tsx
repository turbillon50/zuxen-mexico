import type { Metadata } from "next";
import "./globals.css";
import { Splash } from "@/components/Splash";
import { BottomNav } from "@/components/BottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";
export const metadata: Metadata = {
  title: "ZUXEN MEXICO — Bioactivadores Premium",
  description: "La red de distribucion de bioactivadores mas innovadora de Mexico",
  manifest: "/manifest.webmanifest",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#080f28"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <link rel="apple-touch-icon" href="/icons/icon-192.png"/>
        <style>{`
          *{-webkit-tap-highlight-color:transparent}
          html{overscroll-behavior:none}
          body{overscroll-behavior:none;touch-action:pan-y}
          [data-theme="light"] body{background:#eef1ff;color:#1a1f3a}
          [data-theme="light"] body::before{background:repeating-linear-gradient(135deg,rgba(212,160,23,.04) 0px,rgba(212,160,23,.04) 1px,transparent 1px,transparent 40px),radial-gradient(ellipse 100% 80% at 50% 50%,#eef1ff 55%,#dde3ff)}
          [data-theme="light"] .v-card{background:rgba(255,255,255,.88);border-color:rgba(10,21,100,.1)}
          [data-theme="light"] .kpi{background:rgba(255,255,255,.92);border-color:rgba(10,21,100,.08)}
          [data-theme="light"] .v-header{background:rgba(238,241,255,.95);border-bottom-color:rgba(10,21,100,.08)}
          [data-theme="light"] .v-search{background:rgba(255,255,255,.9);border-color:rgba(10,21,100,.12);color:#1a1f3a}
          [data-theme="light"] nav[data-vulcano-bottomnav]{background:rgba(238,241,255,.95)!important;border-top-color:rgba(10,21,100,.1)!important}
          [data-theme="light"] .v-sec-title{color:#6b7fa3}
          [data-theme="light"] .v-muted{color:#6b7fa3}
          ::selection{background:rgba(212,160,23,.3)}
        `}</style>
      </head>
      <body>
        <ThemeProvider>
          <Splash/>
          <div className="shell">{children}</div>
          <BottomNav/>
        </ThemeProvider>
      </body>
    </html>
  );
}
