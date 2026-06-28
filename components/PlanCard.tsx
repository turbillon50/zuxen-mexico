"use client";
import { motion } from "framer-motion";
interface Pl{id:string;name:string;inv:number;pot:number;features:string[]}
export function PlanCard({plan:p,featured=false}:{plan:Pl;featured?:boolean}){
  const f=(n:number)=>n.toLocaleString("es-MX");
  const bdr = featured ? "1px solid #fff" : "1px solid var(--border)";
  const bsh = featured ? "0 0 40px rgba(255,255,255,.1)" : "none";
  return(
    <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}}
      viewport={{once:true}} transition={{duration:.35}}
      style={{background:"var(--surface-2)",borderRadius:"var(--radius)",padding:20,
        border:bdr,boxShadow:bsh,position:"relative",marginBottom:12}}>
      {featured&&<div style={{position:"absolute",top:-10,left:"50%",
        transform:"translateX(-50%)",background:"#fff",color:"#08080c",
        fontSize:10,fontWeight:800,padding:"3px 14px",borderRadius:20,
        letterSpacing:1}}>MAS POPULAR</div>}
      <h3 style={{fontSize:20,fontWeight:800,marginBottom:4}}>{p.name}</h3>
      <div style={{fontSize:13,color:"var(--txt-2)",marginBottom:8}}>
        Inversion: <b style={{color:"#fff"}}>${f(p.inv)} MXN</b>
      </div>
      <div style={{fontSize:13,color:"var(--txt-2)",marginBottom:18}}>
        Potencial: <b style={{color:"#4ade80",fontSize:18}}>${f(p.pot)} MXN</b>
      </div>
      <ul style={{listStyle:"none",padding:0}}>
        {p.features.map((feat,i)=>(
          <li key={i} style={{display:"flex",gap:8,padding:"6px 0",
            borderBottom:"1px solid var(--border)",fontSize:13}}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2}>
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            {feat}
          </li>
        ))}
      </ul>
      <button style={{width:"100%",marginTop:16,
        background:featured?"#fff":"transparent",
        color:featured?"#08080c":"#fff",
        border:featured?"none":"1px solid var(--border)",
        padding:13,borderRadius:12,fontWeight:700,fontSize:14,cursor:"pointer"}}>
        Comenzar
      </button>
    </motion.div>
  );
}
