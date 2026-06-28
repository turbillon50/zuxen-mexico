"use client";
import { motion } from "framer-motion";
export default function PerfilPage(){
  return(
    <div>
      <div className="v-section" style={{paddingTop:20}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
          <div style={{width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#fff,#aab)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:"#08080c"}}>SR</div>
          <div>
            <div style={{fontSize:18,fontWeight:800}}>Sofia Ramirez</div>
            <div style={{fontSize:12,color:"var(--txt-2)"}}>Distribuidor Plata - ZUX-04821</div>
          </div>
        </div>
        <div className="kpi-grid">
          {[["$3,840","Ganancias mes"],["47","Red total"],["3","Ciclos cobrados"],["Activa","Activacion"]].map(([v,l])=>(
            <div key={l} className="kpi"><div className="kpi-label">{l}</div><div className="kpi-val" style={{fontSize:16}}>{v}</div></div>
          ))}
        </div>
        <div className="v-sec-title">Datos de cuenta</div>
        <div className="v-card">
          {[["Correo","sofia.ramirez@gmail.com"],["Telefono","+52 442 123 4567"],["Ciudad","Queretaro, QRO"],["CLABE","...0742"]].map(([l,v])=>(
            <div key={l} className="v-card-row"><span className="v-muted">{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <motion.button whileTap={{scale:.97}} style={{width:"100%",background:"#fff",color:"#08080c",border:"none",padding:14,borderRadius:12,fontWeight:800,fontSize:15,cursor:"pointer",marginTop:8}}>Guardar Cambios</motion.button>
        <button style={{width:"100%",background:"transparent",color:"var(--txt-2)",border:"1px solid var(--border)",padding:14,borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer",marginTop:8}}>Cerrar Sesion</button>
      </div>
    </div>
  );
}
