"use client";
import { motion } from "framer-motion";
interface P{id:string;name:string;desc:string;pub:number;dist:number;cat:string}
const META:Record<string,{icon:string;color:string;glow:string;label:string}>={
  personas:{icon:"⭐",color:"#f0c040",glow:"rgba(240,192,64,.4)",label:"Personas"},
  mascotas:{icon:"🐾",color:"#00e5ff",glow:"rgba(0,229,255,.35)",label:"Mascotas"},
  medbed:{icon:"🛏️",color:"#cc44ff",glow:"rgba(204,68,255,.35)",label:"MedBed"},
};
export function ProductCard({product:p}:{product:P}){
  const m=META[p.cat]||META.personas;
  const f=(n:number)=>n.toLocaleString("es-MX");
  return(
    <motion.div whileTap={{scale:.96}}
      style={{background:"rgba(11,21,53,.82)",border:"1px solid "+m.color+"33",
        borderRadius:20,padding:18,marginBottom:12,position:"relative",overflow:"hidden",
        backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
        boxShadow:"0 0 20px "+m.glow}}>
      {/* Línea top del color */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,
        background:"linear-gradient(90deg,transparent,"+m.color+",transparent)"}}/>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:44,height:44,borderRadius:12,flexShrink:0,
          background:"radial-gradient(135deg,"+m.glow+",transparent)",
          border:"1.5px solid "+m.color+"55",display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:22,
          boxShadow:"0 0 14px "+m.glow}}>
          {m.icon}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:m.color,fontWeight:700,letterSpacing:.8,
            textTransform:"uppercase",marginBottom:2}}>{m.label}</div>
          <h4 style={{fontSize:14,fontWeight:800,color:"#e8eeff",lineHeight:1.3}}>{p.name}</h4>
        </div>
      </div>
      <p style={{fontSize:12,color:"#6b82b8",marginBottom:14,lineHeight:1.55}}>{p.desc}</p>
      {/* Precios */}
      <div style={{background:"rgba(8,15,40,.5)",borderRadius:12,padding:"10px 12px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:11,color:"#6b82b8"}}>Precio público</span>
          <span style={{fontWeight:600,fontSize:13,color:"#e8eeff"}}>${f(p.pub)} MXN</span>
        </div>
        <div style={{height:1,background:"rgba(212,160,23,.12)",margin:"6px 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:"#6b82b8"}}>Distribuidor</span>
          <span style={{fontWeight:900,fontSize:16,color:m.color,
            textShadow:"0 0 12px "+m.color}}>${f(p.dist)} MXN</span>
        </div>
      </div>
    </motion.div>
  );
}
