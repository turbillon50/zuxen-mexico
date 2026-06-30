"use client";
import { motion } from "framer-motion";
export default function PerfilPage(){
  return(
    <div>
      <div className="v-header">
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{position:"relative"}}>
            <div className="avatar-ring" style={{width:58,height:58,borderRadius:"50%",
              background:"radial-gradient(135deg,rgba(0,200,255,.2),rgba(13,18,32,.9))",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:18,fontWeight:800,color:"#00c8ff"}}>SR</div>
            <div style={{position:"absolute",bottom:-2,right:-2,width:16,height:16,
              borderRadius:"50%",background:"#4ade80",border:"2px solid #06080f",
              boxShadow:"0 0 6px #4ade80"}}/>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:800}}>Sofia Ramirez</div>
            <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
              <span className="pill pill-cyan">Plata</span>
              <span className="pill pill-gold">ZUX-04821</span>
              <span className="pill pill-green">Activa</span>
            </div>
          </div>
        </div>
      </div>
      <div className="v-section" style={{paddingTop:16}}>
        <div className="kpi-grid">
          <div className="kpi kpi-gold"><div className="kpi-label">Ganancias mes</div><div className="kpi-val">$3,840</div><div className="kpi-sub-gold">MXN</div></div>
          <div className="kpi kpi-cyan"><div className="kpi-label">Red total</div><div className="kpi-val">47</div><div className="kpi-sub-cyan">distribuidores</div></div>
          <div className="kpi"><div className="kpi-label">Ciclos</div><div className="kpi-val">3</div><div style={{fontSize:11,color:"#6b7fa3",marginTop:3}}>cobrados</div></div>
          <div className="kpi kpi-green"><div className="kpi-label">Estado</div><div className="kpi-val-sm">Activa</div><div className="kpi-sub">sin deuda</div></div>
        </div>
        <div className="v-sec-title">Datos de cuenta</div>
        <div className="v-card">
          {[["Correo","sofia@gmail.com"],["Telefono","+52 442 123 4567"],["Ciudad","Queretaro, QRO"],["CLABE","...0742"]].map(([l,v])=>(
            <div key={l} className="v-card-row"><span className="v-muted">{l}</span><span style={{fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <motion.button whileTap={{scale:.97}} className="v-btn v-btn-primary" style={{marginTop:8}}>Guardar Cambios</motion.button>
        <button className="v-btn v-btn-ghost" style={{marginTop:10}}>Cerrar Sesion</button>
      </div>
    </div>
  );
}
