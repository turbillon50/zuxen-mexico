"use client";
import { useEffect, useState } from "react";

/* Logo SVG inspirado en el oficial: engranaje dorado + estrella arcoíris + rayos */
function ZuxenLogo(){
  return(
    <svg width={110} height={110} viewBox="0 0 120 120" fill="none"
      style={{animation:"rainbowGlow 4s linear infinite",filter:"drop-shadow(0 0 24px rgba(212,160,23,.7))"}}>
      {/* Engranaje dorado */}
      <path d="M60 10 l6 10 10-4 4 10 11-1 1 11 10 4-4 10 8 7-7 8 4 10-10 4-1 11-11-1-4 10-10-4-7 8-8-7-10 4-4-10-11 1-1-11-10-4 4-10-8-7 7-8-4-10 10-4 1-11 11 1 4-10 10 4z"
        fill="none" stroke="url(#goldGrad)" strokeWidth={3}
        style={{strokeDasharray:400,strokeDashoffset:400,animation:"drawGear 1.5s .2s ease forwards"}}/>
      {/* Estrella central multicolor */}
      <polygon points="60,28 65,50 88,50 70,63 77,85 60,72 43,85 50,63 32,50 55,50"
        fill="url(#rainbowGrad)" opacity={0}
        style={{animation:"starAppear .6s 1.2s ease forwards"}}/>
      {/* Rayos de energía izquierda (azul-verde) */}
      <path d="M18 55 Q30 50 42 58 Q30 65 18 60" fill="none" stroke="#00e5ff" strokeWidth={2}
        opacity={0} style={{animation:"rayLeft .5s 1.4s ease forwards"}}/>
      <path d="M10 50 Q25 45 38 55" fill="none" stroke="#00ff88" strokeWidth={1.5}
        opacity={0} style={{animation:"rayLeft .5s 1.5s ease forwards"}}/>
      {/* Rayos de energía derecha (naranja-morado) */}
      <path d="M102 55 Q90 50 78 58 Q90 65 102 60" fill="none" stroke="#ff7b00" strokeWidth={2}
        opacity={0} style={{animation:"rayRight .5s 1.4s ease forwards"}}/>
      <path d="M110 50 Q95 45 82 55" fill="none" stroke="#cc44ff" strokeWidth={1.5}
        opacity={0} style={{animation:"rayRight .5s 1.5s ease forwards"}}/>
      {/* Texto ZUXEN en dorado */}
      <text x="60" y="100" textAnchor="middle" fill="url(#goldGrad)"
        fontSize="13" fontWeight="900" letterSpacing="3"
        style={{opacity:0,animation:"fadeUp .5s 1.6s ease forwards"}}>ZUXEN</text>
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c040"/>
          <stop offset="50%" stopColor="#d4a017"/>
          <stop offset="100%" stopColor="#f0c040"/>
        </linearGradient>
        <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff"/>
          <stop offset="25%" stopColor="#00ff88"/>
          <stop offset="50%" stopColor="#f0c040"/>
          <stop offset="75%" stopColor="#ff7b00"/>
          <stop offset="100%" stopColor="#cc44ff"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

const PARTICLES=[
  {top:"25%",left:"15%",delay:.6,dx:"14px",color:"#00e5ff"},
  {top:"65%",left:"75%",delay:.9,dx:"-12px",color:"#cc44ff"},
  {top:"40%",left:"55%",delay:1.1,dx:"16px",color:"#f0c040"},
  {top:"20%",left:"80%",delay:.7,dx:"-14px",color:"#00ff88"},
  {top:"70%",left:"25%",delay:1.0,dx:"10px",color:"#ff7b00"},
  {top:"50%",left:"10%",delay:.8,dx:"-8px",color:"#00e5ff"},
  {top:"30%",left:"90%",delay:1.2,dx:"-16px",color:"#cc44ff"},
];

export function Splash(){
  const [fade,setFade]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setFade(true),2600);
    const t2=setTimeout(()=>setGone(true),3200);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  if(gone) return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#080f28",zIndex:9999,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:20,opacity:fade?0:1,transition:"opacity 600ms cubic-bezier(.16,1,.3,1)",pointerEvents:fade?"none":"auto",
      overflow:"hidden"}}>
      {/* Textura diagonal fondo */}
      <div style={{position:"absolute",inset:0,
        background:"repeating-linear-gradient(135deg,rgba(212,160,23,.02) 0px,rgba(212,160,23,.02) 1px,transparent 1px,transparent 40px)",
        pointerEvents:"none"}}/>
      {/* Blobs */}
      <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",
        top:"-25%",left:"-20%",filter:"blur(60px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(0,229,255,.15),transparent 65%)",
        animation:"blobDrift 8s ease-in-out infinite alternate"}}/>
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",
        bottom:"-20%",right:"-15%",filter:"blur(55px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(204,68,255,.12),transparent 65%)",
        animation:"blobDrift 10s ease-in-out infinite alternate-reverse"}}/>
      <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",
        top:"30%",right:"-10%",filter:"blur(65px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(255,123,0,.1),transparent 65%)",
        animation:"blobDrift 7s ease-in-out infinite"}}/>
      {/* Partículas de energía */}
      {PARTICLES.map((p,i)=>(
        <div key={i} style={{position:"absolute",top:p.top,left:p.left,
          width:4,height:4,borderRadius:"50%",background:p.color,
          boxShadow:`0 0 6px ${p.color}`,opacity:0,
          animationName:"particleFloat",animationDuration:"2.2s",
          animationDelay:`${p.delay+.6}s`,animationTimingFunction:"ease-out",
          animationIterationCount:"infinite",
          ["--dx" as string]:p.dx}}/>
      ))}
      {/* Logo oficial */}
      <div style={{animation:"logoIn 1s cubic-bezier(.16,1,.3,1) forwards",opacity:0}}>
        <ZuxenLogo/>
      </div>
      {/* Slogan */}
      <div style={{textAlign:"center",animation:"fadeUp .6s 1.8s ease forwards",opacity:0}}>
        <div style={{fontSize:12,color:"rgba(107,130,184,.8)",letterSpacing:4,textTransform:"uppercase"}}>
          BIOACTIVADORES · MÉXICO
        </div>
      </div>
      {/* Ecualizador gaming */}
      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:22,
        animation:"fadeUp .4s 1.9s ease forwards",opacity:0}}>
        {["#00e5ff","#00ff88","#f0c040","#ff7b00","#cc44ff","#00e5ff","#00ff88"].map((c,i)=>(
          <div key={i} style={{width:3,borderRadius:2,background:c,
            boxShadow:`0 0 4px ${c}`,transformOrigin:"bottom",
            animation:`eqBar ${.55+i*.08}s ${.1+i*.1}s ease-in-out infinite`}}/>
        ))}
      </div>
      {/* Progress */}
      <div style={{width:140,height:2,background:"rgba(212,160,23,.1)",borderRadius:2,overflow:"hidden",
        animation:"fadeUp .3s 2s ease forwards",opacity:0}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#00e5ff,#d4a017,#cc44ff)",borderRadius:2,
          animation:"progressFill 2.4s .3s ease forwards",width:"0%"}}/>
      </div>
      <style>{`
        @keyframes drawGear{to{stroke-dashoffset:0}}
        @keyframes starAppear{to{opacity:1}}
        @keyframes rayLeft{to{opacity:.9}}
        @keyframes rayRight{to{opacity:.9}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes logoIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
        @keyframes progressFill{from{width:0%}to{width:100%}}
        @keyframes blobDrift{to{transform:translate(20px,-15px) scale(1.12)}}
        @keyframes eqBar{0%,100%{height:4px}50%{height:20px}}
        @keyframes particleFloat{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:.9}80%{opacity:.4}100%{transform:translateY(-70px) translateX(var(--dx,0px));opacity:0}}
        @keyframes rainbowGlow{0%{filter:hue-rotate(0deg) drop-shadow(0 0 20px rgba(212,160,23,.7))}50%{filter:hue-rotate(180deg) drop-shadow(0 0 24px rgba(204,68,255,.7))}100%{filter:hue-rotate(360deg) drop-shadow(0 0 20px rgba(0,229,255,.7))}}
      `}</style>
    </div>
  );
}
