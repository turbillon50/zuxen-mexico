"use client";
import { useEffect, useState } from "react";
export function Splash(){
  const [fade,setFade]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setFade(true),2200);
    const t2=setTimeout(()=>setGone(true),2800);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  if(gone) return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#06080f",zIndex:9999,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:24,opacity:fade?0:1,transition:"opacity 600ms ease",pointerEvents:fade?"none":"auto"}}>
      {/* Blobs de fondo */}
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(0,200,255,.18),transparent 70%)",
        top:"15%",left:"-5%",animation:"blobDrift 6s ease-in-out infinite alternate",filter:"blur(40px)"}}/>
      <div style={{position:"absolute",width:250,height:250,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(10,22,40,.8),transparent 70%)",
        bottom:"10%",right:"-10%",animation:"blobDrift 8s ease-in-out infinite alternate-reverse",filter:"blur(50px)"}}/>
      {/* Logo hexágono Z */}
      <div style={{position:"relative"}}>
        <svg width={90} height={90} viewBox="0 0 100 100" fill="none"
          style={{animation:"logoIn 1s cubic-bezier(.16,1,.3,1) forwards",filter:"drop-shadow(0 0 20px rgba(0,200,255,.5))"}}>
          <polygon points="50,4 94,28 94,72 50,96 6,72 6,28"
            stroke="#00c8ff" strokeWidth={2.5} fill="rgba(0,200,255,.05)"
            style={{strokeDasharray:240,strokeDashoffset:240,animation:"drawHex 1.2s .2s ease forwards"}}/>
          <path d="M34 35 L66 35 L34 65 L66 65" stroke="#f5a623" strokeWidth={5}
            strokeLinecap="round" strokeLinejoin="round" fill="none"
            style={{strokeDasharray:100,strokeDashoffset:100,animation:"drawZ .8s .9s ease forwards"}}/>
        </svg>
      </div>
      {/* Nombre */}
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:15,fontWeight:900,letterSpacing:8,color:"#00c8ff",
          animation:"fadeUp .6s 1s ease forwards",opacity:0}}>ZUXEN</div>
        <div style={{fontSize:11,color:"rgba(107,127,163,.8)",letterSpacing:3,marginTop:4,
          animation:"fadeUp .6s 1.2s ease forwards",opacity:0}}>BIOACTIVADORES · MÉXICO</div>
      </div>
      {/* Barra de progreso */}
      <div style={{width:120,height:2,background:"rgba(0,200,255,.12)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#00c8ff,#f5a623)",borderRadius:2,
          width:"0%",animation:"progressFill 2s .3s ease forwards"}}/>
      </div>
      <style>{`
        @keyframes drawHex{to{stroke-dashoffset:0}}
        @keyframes drawZ{to{stroke-dashoffset:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes logoIn{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
        @keyframes progressFill{from{width:0%}to{width:100%}}
        @keyframes blobDrift{to{transform:translate(20px,-15px) scale(1.1)}}
      `}</style>
    </div>
  );
}
