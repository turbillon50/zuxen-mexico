'use client';
import './globals.css';
import {useState,useEffect} from 'react';
import BottomNav from '@/components/BottomNav';
import Splash from '@/components/Splash';
export default function RootLayout({children}:{children:React.ReactNode}){
  const [loading,setLoading]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setLoading(false),2500);return()=>clearTimeout(t);},[]);
  return(
    <html lang="es">
      <head>
        <title>ZUXEN MEXICO</title>
        <meta name="description" content="Bioactivadores que transforman tu vida y la de tus mascotas."/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#0a0f2e"/>
        <link rel="manifest" href="/manifest.webmanifest"/>
        <link rel="icon" href="/icons/icon-192.png"/>
      </head>
      <body style={{paddingBottom:'var(--nav-h)'}}>
        {loading?<Splash/>:<>{children}<BottomNav/></>}
      </body>
    </html>
  );
}
