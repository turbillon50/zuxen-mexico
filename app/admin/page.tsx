"use client";
import { DISTRIBUIDORES } from "@/lib/data";
import { motion } from "framer-motion";
const ST:Record<string,string>={activo:"pill pill-green",pendiente:"pill pill-gold",inactivo:"pill pill-red"};
export default function AdminPage(){
  return(
    <div>
      <div className="v-header">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          style={{fontSize:22,fontWeight:800}}>Dashboard</motion.h1>
      </div>
      <div className="v-section" style={{paddingTop:16}}>
        <div className="kpi-grid">
          {[["4,821","Distribuidores","+12%","kpi-cyan"],["$842K","Ventas mes","+8%","kpi-gold"],["$186K","Comisiones","+15%","kpi-green"],["247","Nuevos","+34",""]].map(([v,l,s,cls])=>(
            <motion.div key={l} className={"kpi "+cls}
              initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
              <div className="kpi-label">{l}</div>
              <div className="kpi-val-sm">{v}</div>
              <div className={cls==="kpi-gold"?"kpi-sub-gold":cls==="kpi-cyan"?"kpi-sub-cyan":"kpi-sub"}>{s}</div>
            </motion.div>
          ))}
        </div>
        <div className="v-sec-title">Distribuidores</div>
        <div style={{overflowX:"auto",borderRadius:16,border:"1px solid rgba(0,200,255,.1)"}}>
          <table>
            <thead><tr><th>Codigo</th><th>Nombre</th><th>Nivel</th><th>Red</th><th>Ganancias</th><th>Estado</th></tr></thead>
            <tbody>
              {DISTRIBUIDORES.map(d=>(
                <tr key={d.code}>
                  <td style={{fontSize:11,color:"#6b7fa3",fontFamily:"monospace"}}>{d.code}</td>
                  <td style={{fontWeight:600}}>{d.name}</td>
                  <td><span style={{fontSize:12,color:d.nivel==="Oro"?"#f5a623":d.nivel==="Plata"?"#00c8ff":"#b48c50",fontWeight:700}}>{d.nivel}</span></td>
                  <td style={{color:"#eef2ff"}}>{d.red}</td>
                  <td style={{color:"#4ade80",fontWeight:700}}>${d.earn.toLocaleString("es-MX")}</td>
                  <td><span className={ST[d.status]||"pill"}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
