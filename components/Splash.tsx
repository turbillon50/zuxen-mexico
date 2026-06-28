"use client";
import { useEffect, useState } from "react";
export function Splash(){
  const [hide,setHide]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const t=setTimeout(()=>setHide(true),1800);
    const t2=setTimeout(()=>setGone(true),2400);
    return ()=>{clearTimeout(t);clearTimeout(t2)};
  },[]);
  if(gone) return null;
  return(
    <div style={{position:"fixed",inset:0,background:"#08080c",display:"flex",
      flexDirection:"column",alignItems:"center",justifyContent:"center",
      zIndex:90,gap:20,transition:"opacity .6s",opacity:hide?0:1,
      pointerEvents:hide?"none":"auto"}}>
      <div style={{width:64,height:64,borderRadius:"50%",border:"2px solid #fff",
        boxShadow:"0 0 0 8px rgba(255,255,255,.06),0 0 40px rgba(255,255,255,.55)",
        animation:"vp 1.5s ease-in-out infinite"}}/>
      <b style={{letterSpacing:4,fontSize:13,color:"#cdd"}}>ZUXEN</b>
      <style>{`@keyframes vp{0%,100%{transform:scale(.9);opacity:.65}50%{transform:scale(1.05);opacity:1}}`}</style>
    </div>
  );
}
