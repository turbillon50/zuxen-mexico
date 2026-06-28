"use client";
import { motion } from "framer-motion";
interface P{id:string;name:string;desc:string;pub:number;dist:number;cat:string}
const CAT:Record<string,string>={personas:"Personas",mascotas:"Mascotas",medbed:"MedBed"};
export function ProductCard({product:p}:{product:P}){
  const f=(n:number)=>n.toLocaleString("es-MX");
  return(
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}} transition={{duration:.35}}
      style={{background:"var(--surface-2)",border:"1px solid var(--border)",
        borderRadius:"var(--radius)",padding:16,marginBottom:12,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,
        background:"linear-gradient(90deg,#fff,rgba(130,160,255,.6))"}}/>
      <span style={{display:"inline-block",fontSize:11,padding:"3px 9px",borderRadius:8,
        background:"rgba(255,255,255,.08)",border:"1px solid var(--border)",
        color:"#cdd",marginBottom:8}}>{CAT[p.cat]||p.cat}</span>
      <h4 style={{fontSize:15,fontWeight:700,marginBottom:4}}>{p.name}</h4>
      <p style={{fontSize:12,color:"var(--txt-2)",marginBottom:14,lineHeight:1.5}}>{p.desc}</p>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:12,color:"var(--txt-2)"}}>Precio publico</span>
        <span style={{fontWeight:700}}>${f(p.pub)} MXN</span>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",
        paddingTop:8,borderTop:"1px solid var(--border)"}}>
        <span style={{fontSize:12,color:"var(--txt-2)"}}>Distribuidor</span>
        <span style={{fontWeight:800,color:"#4ade80"}}>${f(p.dist)} MXN</span>
      </div>
    </motion.div>
  );
}
