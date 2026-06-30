"use client";
import { useEffect, useState } from "react";

const PARTICLES=[
  {top:"28%",left:"12%",delay:.5,dx:"18px",color:"#00e5ff",size:4},
  {top:"62%",left:"78%",delay:.8,dx:"-14px",color:"#cc44ff",size:3},
  {top:"42%",left:"58%",delay:1.0,dx:"16px",color:"#f0c040",size:3},
  {top:"18%",left:"82%",delay:.6,dx:"-18px",color:"#00ff88",size:3},
  {top:"72%",left:"22%",delay:1.1,dx:"12px",color:"#ff7b00",size:4},
  {top:"50%",left:"8%",delay:.7,dx:"-10px",color:"#00e5ff",size:2},
  {top:"32%",left:"88%",delay:1.2,dx:"-16px",color:"#cc44ff",size:2},
  {top:"80%",left:"60%",delay:.9,dx:"14px",color:"#f0c040",size:3},
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
      gap:18,opacity:fade?0:1,transition:"opacity 600ms cubic-bezier(.16,1,.3,1)",
      pointerEvents:fade?"none":"auto",overflow:"hidden"}}>
      {/* Textura diagonal */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"repeating-linear-gradient(135deg,rgba(212,160,23,.03) 0px,rgba(212,160,23,.03) 1px,transparent 1px,transparent 40px)"}}/>
      {/* Mesh vivo — canvas gradient animado */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 20% 20%,rgba(0,229,255,.18) 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,rgba(204,68,255,.15) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(255,123,0,.1) 0%,transparent 50%),radial-gradient(ellipse at 20% 80%,rgba(0,255,136,.1) 0%,transparent 50%)",
        animation:"meshMove 8s ease-in-out infinite alternate"}}/>
      {/* Partículas */}
      {PARTICLES.map((p,i)=>(
        <div key={i} style={{position:"absolute",top:p.top,left:p.left,
          width:p.size,height:p.size,borderRadius:"50%",background:p.color,
          boxShadow:"0 0 8px "+p.color+",0 0 16px "+p.color+"55",opacity:0,
          animationName:"particleFloat",animationDuration:"2.2s",
          animationDelay:(p.delay+.4)+"s",animationTimingFunction:"ease-out",
          animationIterationCount:"infinite",...({"--dx":p.dx} as React.CSSProperties)}}/>
      ))}
      {/* Rayos de energia cruzando */}
      <div style={{position:"absolute",top:"38%",left:0,right:0,height:2,pointerEvents:"none",
        background:"linear-gradient(90deg,transparent 0%,#00e5ff 30%,transparent 50%,#cc44ff 70%,transparent 100%)",
        animation:"rayPulse 2s ease-in-out infinite",filter:"blur(1px)",opacity:.7}}/>
      <div style={{position:"absolute",top:"58%",left:0,right:0,height:2,pointerEvents:"none",
        background:"linear-gradient(90deg,transparent 0%,#ff7b00 20%,transparent 50%,#00ff88 80%,transparent 100%)",
        animation:"rayPulse 2.5s ease-in-out infinite reverse",filter:"blur(1px)",opacity:.6}}/>
      {/* LOGO OFICIAL desde imagen real */}
      <div style={{animation:"logoIn 1s cubic-bezier(.16,1,.3,1) forwards",opacity:0,
        filter:"drop-shadow(0 0 30px rgba(212,160,23,.6)) drop-shadow(0 0 60px rgba(0,229,255,.3))",
        willChange:"filter"}}>
        <img src="/logo-zuxen.jpg" alt="ZUXEN" width={220} height={70}
          style={{objectFit:"contain",borderRadius:8,
            animation:"logoIn 1s cubic-bezier(.16,1,.3,1) forwards, rainbowGlow 4s 1s linear infinite",
            opacity:0}}/>
      </div>
      {/* Slogan */}
      <div style={{textAlign:"center",animation:"fadeUp .6s 1.4s ease forwards",opacity:0}}>
        <div style={{fontSize:11,color:"rgba(107,130,184,.8)",letterSpacing:4,textTransform:"uppercase"}}>
          BIOACTIVADORES · MEXICO
        </div>
      </div>
      {/* Ecualizador multicolor */}
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:24,
        animation:"fadeUp .4s 1.6s ease forwards",opacity:0}}>
        {["#00e5ff","#00ff88","#f0c040","#ff7b00","#cc44ff","#f0c040","#00e5ff"].map((c,i)=>(
          <div key={i} style={{width:4,borderRadius:3,background:c,
            boxShadow:"0 0 6px "+c+",0 0 12px "+c+"66",transformOrigin:"bottom",
            animation:"eqBar "+(0.5+i*0.09)+"s "+(0.1+i*0.11)+"s ease-in-out infinite"}}/>
        ))}
      </div>
      {/* Progress arcoiris */}
      <div style={{width:140,height:3,background:"rgba(212,160,23,.1)",borderRadius:3,overflow:"hidden",
        animation:"fadeUp .3s 1.8s ease forwards",opacity:0,
        boxShadow:"0 0 8px rgba(212,160,23,.2)"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#00e5ff,#00ff88,#f0c040,#ff7b00,#cc44ff)",
          borderRadius:3,animation:"progressFill 2.4s .3s ease forwards",width:"0%"}}/>
      </div>
      <style>{`
        @keyframes logoIn{from{opacity:0;transform:scale(.6) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes progressFill{from{width:0%}to{width:100%}}
        @keyframes meshMove{0%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}100%{opacity:.8;transform:scale(1)}}
        @keyframes rayPulse{0%,100%{opacity:.4;transform:scaleX(.8)}50%{opacity:.9;transform:scaleX(1)}}
        @keyframes particleFloat{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:1}80%{opacity:.5}100%{transform:translateY(-80px) translateX(var(--dx,0px));opacity:0}}
        @keyframes eqBar{0%,100%{height:4px}50%{height:22px}}
        @keyframes rainbowGlow{0%{filter:drop-shadow(0 0 20px rgba(212,160,23,.7)) hue-rotate(0deg)}50%{filter:drop-shadow(0 0 28px rgba(204,68,255,.8)) hue-rotate(180deg)}100%{filter:drop-shadow(0 0 20px rgba(0,229,255,.7)) hue-rotate(360deg)}}
      `}</style>
    </div>
  );
}
