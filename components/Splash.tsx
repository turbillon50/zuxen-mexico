"use client";
import { useEffect, useState } from "react";
const PARTICLES=[
  {top:"30%",left:"20%",delay:0,dx:"12px",size:3},
  {top:"60%",left:"70%",delay:.4,dx:"-8px",size:2},
  {top:"45%",left:"50%",delay:.8,dx:"16px",size:2},
  {top:"25%",left:"80%",delay:.2,dx:"-14px",size:3},
  {top:"70%",left:"30%",delay:.6,dx:"10px",size:2},
  {top:"55%",left:"15%",delay:1,dx:"-10px",size:2},
];
export function Splash(){
  const [fade,setFade]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setFade(true),2400);
    const t2=setTimeout(()=>setGone(true),3000);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  if(gone) return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#06080f",zIndex:9999,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:24,opacity:fade?0:1,transition:"opacity 600ms cubic-bezier(.16,1,.3,1)",pointerEvents:fade?"none":"auto"}}>
      {/* Blobs */}
      <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",
        top:"-20%",left:"-15%",filter:"blur(60px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(0,200,255,.15),transparent 65%)",
        animation:"blobDrift 7s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",
        bottom:"-15%",right:"-10%",filter:"blur(55px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(245,166,35,.1),transparent 65%)",
        animation:"blobDrift 9s ease-in-out infinite alternate-reverse"}}/>
      {/* Partículas flotantes */}
      {PARTICLES.map((p,i)=>(
        <div key={i} style={{position:"absolute",top:p.top,left:p.left,
          width:p.size,height:p.size,borderRadius:"50%",
          background:"var(--cyan,#00c8ff)",opacity:0,
          animationName:"particleFloat",animationDuration:"2.4s",
          animationDelay:`${p.delay+.8}s`,animationTimingFunction:"ease-out",
          animationIterationCount:"infinite",
          ["--dx" as string]:p.dx}}/>
      ))}
      {/* Logo */}
      <div style={{position:"relative"}}>
        <svg width={96} height={96} viewBox="0 0 100 100" fill="none"
          style={{filter:"drop-shadow(0 0 28px rgba(0,200,255,.55))",
            animation:"logoIn 1s cubic-bezier(.16,1,.3,1) forwards"}}>
          <polygon points="50,4 94,28 94,72 50,96 6,72 6,28"
            stroke="#00c8ff" strokeWidth={2.5} fill="rgba(0,200,255,.05)"
            style={{strokeDasharray:240,strokeDashoffset:240,animation:"drawHex 1.2s .2s ease forwards"}}/>
          <path d="M34 35 L66 35 L34 65 L66 65" stroke="#f5a623" strokeWidth={5.5}
            strokeLinecap="round" strokeLinejoin="round" fill="none"
            style={{strokeDasharray:100,strokeDashoffset:100,animation:"drawZ .8s .9s ease forwards"}}/>
        </svg>
        {/* Halo pulsante detrás del logo */}
        <div style={{position:"absolute",inset:-16,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,200,255,.12),transparent 70%)",
          animation:"breathe 2s ease-in-out infinite"}}/>
      </div>
      {/* Textos */}
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:16,fontWeight:900,letterSpacing:8,color:"#00c8ff",
          animation:"fadeUp .6s 1s ease forwards",opacity:0}}>ZUXEN</div>
        <div style={{fontSize:11,color:"rgba(107,127,163,.8)",letterSpacing:3,marginTop:5,
          animation:"fadeUp .6s 1.2s ease forwards",opacity:0}}>BIOACTIVADORES · MÉXICO</div>
      </div>
      {/* Ecualizador — MEJORA 18 */}
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:20,
        animation:"fadeUp .4s 1.4s ease forwards",opacity:0}}>
        {[1,2,3,4,5].map((b,i)=>(
          <div key={b} style={{width:4,borderRadius:2,background:"#00c8ff",opacity:.7,
            transformOrigin:"bottom",
            animation:`eqBar ${.6+i*.1}s ${.2+i*.12}s ease-in-out infinite`}}/>
        ))}
      </div>
      {/* Progress */}
      <div style={{width:130,height:2,background:"rgba(0,200,255,.1)",borderRadius:2,overflow:"hidden",
        animation:"fadeUp .4s 1.6s ease forwards",opacity:0}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#00c8ff,#f5a623)",borderRadius:2,
          animation:"progressFill 2.2s .3s ease forwards",width:"0%"}}/>
      </div>
      <style>{`
        @keyframes drawHex{to{stroke-dashoffset:0}}
        @keyframes drawZ{to{stroke-dashoffset:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes logoIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
        @keyframes progressFill{from{width:0%}to{width:100%}}
        @keyframes blobDrift{to{transform:translate(20px,-15px) scale(1.12)}}
        @keyframes breathe{0%,100%{opacity:.5;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
        @keyframes eqBar{0%,100%{height:4px}50%{height:18px}}
        @keyframes particleFloat{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:.7}80%{opacity:.3}100%{transform:translateY(-70px) translateX(var(--dx,0px));opacity:0}}
      `}</style>
    </div>
  );
}
