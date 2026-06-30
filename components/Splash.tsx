"use client";
import React,{ useEffect, useState } from "react";

const P=[
  {top:"25%",left:"10%",delay:.4,dx:"20px",color:"#00ffff"},
  {top:"70%",left:"80%",delay:.7,dx:"-16px",color:"#ff00ff"},
  {top:"40%",left:"60%",delay:.9,dx:"14px",color:"#ffd700"},
  {top:"15%",left:"85%",delay:.5,dx:"-20px",color:"#39ff14"},
  {top:"75%",left:"20%",delay:1.0,dx:"18px",color:"#ff6600"},
  {top:"55%",left:"5%",delay:.6,dx:"-12px",color:"#00ffff"},
  {top:"30%",left:"92%",delay:1.1,dx:"-18px",color:"#ff00ff"},
  {top:"85%",left:"55%",delay:.8,dx:"10px",color:"#ffd700"},
];
export function Splash(){
  const [fade,setFade]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setFade(true),2800);
    const t2=setTimeout(()=>setGone(true),3400);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  if(gone) return null;
  const css=`
    @keyframes blobD{to{transform:translate(20px,-15px) scale(1.1)}}
    @keyframes logoIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes prog{from{width:0%}to{width:100%}}
    @keyframes scan{0%{transform:translateY(-100vh)}100%{transform:translateY(100vh)}}
    @keyframes eq{0%,100%{height:3px}50%{height:20px}}
    @keyframes mp{0%,100%{opacity:.5;transform:scale(.9)}50%{opacity:1;transform:scale(1.15)}}
    @keyframes pf{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:1}80%{opacity:.5}100%{transform:translateY(-80px) translateX(var(--dx,0px));opacity:0}}
    @keyframes rg{0%{filter:brightness(1.15) saturate(1.4) drop-shadow(0 0 20px rgba(0,255,255,.7)) hue-rotate(0deg)}50%{filter:brightness(1.15) saturate(1.4) drop-shadow(0 0 28px rgba(255,0,255,.8)) hue-rotate(180deg)}100%{filter:brightness(1.15) saturate(1.4) drop-shadow(0 0 20px rgba(0,255,255,.7)) hue-rotate(360deg)}}
  `;
  return(
    <div style={{position:"fixed",inset:0,background:"#000",zIndex:9999,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:20,opacity:fade?0:1,transition:"opacity 600ms ease",
      pointerEvents:fade?"none":"auto",overflow:"hidden"}}>
      <style dangerouslySetInnerHTML={{__html:css}}/>
      <div style={{position:"absolute",inset:0,
        backgroundImage:"linear-gradient(rgba(0,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,.05) 1px,transparent 1px)",
        backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",
        top:"-20%",left:"-20%",filter:"blur(80px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(0,255,255,.12),transparent 65%)",
        animationName:"blobD",animationDuration:"8s",animationIterationCount:"infinite",animationDirection:"alternate"}}/>
      <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",
        bottom:"-15%",right:"-15%",filter:"blur(80px)",pointerEvents:"none",
        background:"radial-gradient(circle,rgba(255,0,255,.1),transparent 65%)",
        animationName:"blobD",animationDuration:"10s",animationIterationCount:"infinite",animationDirection:"alternate-reverse"}}/>
      <div style={{position:"absolute",left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent,rgba(0,255,255,.4),transparent)",
        animationName:"scan",animationDuration:"3s",animationTimingFunction:"linear",animationIterationCount:"infinite",
        pointerEvents:"none",zIndex:1}}/>
      {P.map((p,i)=>(
        <div key={i} style={{position:"absolute",top:p.top,left:p.left,
          width:4,height:4,borderRadius:"50%",background:p.color,
          boxShadow:`0 0 8px ${p.color}`,opacity:0,
          animationName:"pf",animationDuration:"2s",
          animationDelay:`${p.delay+.4}s`,animationTimingFunction:"ease-out",
          animationIterationCount:"infinite",
          ...({'--dx':p.dx} as React.CSSProperties)}}/>
      ))}
      <div style={{position:"relative",animationName:"logoIn",animationDuration:"1s",
        animationTimingFunction:"cubic-bezier(.16,1,.3,1)",animationFillMode:"forwards",opacity:0}}>
        <div style={{position:"absolute",inset:-20,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(0,255,255,.15),transparent 70%)",
          animationName:"mp",animationDuration:"2s",animationIterationCount:"infinite",
          pointerEvents:"none"}}/>
        <img src="/logo-zuxen.png" alt="ZUXEN"
          style={{width:240,height:"auto",display:"block",
            mixBlendMode:"screen" as React.CSSProperties["mixBlendMode"],
            animationName:"rg",animationDuration:"4s",animationTimingFunction:"linear",
            animationIterationCount:"infinite"}}/>
      </div>
      <div style={{textAlign:"center",animationName:"fadeUp",animationDuration:".5s",
        animationDelay:"1.6s",animationFillMode:"forwards",opacity:0}}>
        <div style={{fontSize:9,letterSpacing:4,color:"rgba(0,255,255,.6)",
          textTransform:"uppercase",fontFamily:"monospace"}}>BIOACTIVADORES · MÉXICO · WEB3</div>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:22,
        animationName:"fadeUp",animationDuration:".4s",animationDelay:"1.8s",
        animationFillMode:"forwards",opacity:0}}>
        {["#00ffff","#39ff14","#ffd700","#ff6600","#ff00ff","#ffd700","#00ffff"].map((c,i)=>(
          <div key={i} style={{width:3,borderRadius:1,background:c,
            boxShadow:`0 0 6px ${c}`,transformOrigin:"bottom",
            animationName:"eq",animationDuration:`${.45+i*.08}s`,
            animationDelay:`${.1+i*.1}s`,animationTimingFunction:"ease-in-out",
            animationIterationCount:"infinite"}}/>
        ))}
      </div>
      <div style={{width:140,height:2,background:"rgba(0,255,255,.08)",overflow:"hidden",
        animationName:"fadeUp",animationDuration:".3s",animationDelay:"2s",
        animationFillMode:"forwards",opacity:0}}>
        <div style={{height:"100%",
          background:"linear-gradient(90deg,#00ffff,#ff00ff,#ffd700)",
          animationName:"prog",animationDuration:"2.6s",animationDelay:".3s",
          animationFillMode:"forwards",width:"0%",
          boxShadow:"0 0 8px rgba(0,255,255,.8)"}}/>
      </div>
    </div>
  );
}
