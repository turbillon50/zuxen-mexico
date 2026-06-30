"use client";
import { motion } from "framer-motion";
interface Pl{id:string;name:string;inv:number;pot:number;features:string[]}
const PLAN_STYLE:Record<string,{color:string;glow:string;icon:string;badge?:string}>={
  bronce:{color:"#b48c50",glow:"rgba(180,140,80,.4)",icon:"🥉"},
  plata:{color:"#00e5ff",glow:"rgba(0,229,255,.45)",icon:"🥈",badge:"MÁS POPULAR"},
  oro:{color:"#f0c040",glow:"rgba(240,192,64,.55)",icon:"🥇"},
};
export function PlanCard({plan:p,featured=false}:{plan:Pl;featured?:boolean}){
  const s=PLAN_STYLE[p.id]||PLAN_STYLE.bronce;
  const f=(n:number)=>n.toLocaleString("es-MX");
  return(
    <motion.div whileTap={{scale:.97}}
      style={{background:"rgba(11,21,53,.82)",border:"1.5px solid "+s.color+"44",
        borderRadius:20,padding:22,marginBottom:12,position:"relative",overflow:"hidden",
        backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
        boxShadow:"0 0 24px "+s.glow}}>
      {/* Línea top */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,
        background:"linear-gradient(90deg,transparent,"+s.color+",transparent)"}}/>
      {/* Badge popular */}
      {s.badge&&(
        <div style={{position:"absolute",top:-1,right:20,
          background:"linear-gradient(135deg,"+s.color+","+s.color+"cc)",
          color:"#06080f",fontSize:9,fontWeight:900,padding:"4px 12px",
          borderRadius:"0 0 10px 10px",letterSpacing:1}}>
          {s.badge}
        </div>
      )}
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
        <div style={{fontSize:36,filter:"drop-shadow(0 0 10px "+s.color+")"}}>{s.icon}</div>
        <div>
          <div style={{fontSize:22,fontWeight:900,color:s.color,letterSpacing:.5}}>{p.name}</div>
          <div style={{fontSize:12,color:"#6b82b8",marginTop:2}}>
            Inversión: <span style={{color:"#e8eeff",fontWeight:700}}>${f(p.inv)} MXN</span>
          </div>
        </div>
      </div>
      {/* Potencial */}
      <div style={{background:"rgba(8,15,40,.6)",borderRadius:14,padding:"12px 16px",marginBottom:14}}>
        <div style={{fontSize:10,color:"#6b82b8",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>
          Potencial de ganancias
        </div>
        <div style={{fontSize:26,fontWeight:900,color:"#00ff88",
          textShadow:"0 0 16px rgba(0,255,136,.5)"}}>
          ${f(p.pot)} MXN
        </div>
      </div>
      {/* Features */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {p.features.map(feat=>(
          <div key={feat} style={{display:"flex",alignItems:"center",gap:10,
            fontSize:13,color:"#e8eeff"}}>
            <div style={{width:20,height:20,borderRadius:6,flexShrink:0,
              background:s.color+"18",border:"1px solid "+s.color+"44",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,color:s.color,fontWeight:800}}>◆</div>
            {feat}
          </div>
        ))}
      </div>
      {/* CTA */}
      <motion.button whileTap={{scale:.96}}
        style={{marginTop:18,width:"100%",border:0,cursor:"pointer",fontFamily:"inherit",
          fontWeight:900,fontSize:15,borderRadius:14,padding:"14px 0",
          background:"linear-gradient(135deg,"+s.color+","+s.color+"cc)",
          color:"#06080f",boxShadow:"0 0 20px "+s.glow,letterSpacing:.5}}>
        Elegir {p.name}
      </motion.button>
    </motion.div>
  );
}
