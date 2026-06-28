"use client";
import { DISTRIBUIDORES } from "@/lib/data";
import { motion } from "framer-motion";
const ST:Record<string,string>={activo:"pill pill-green",pendiente:"pill pill-gold",inactivo:"pill pill-red"};
export default function AdminPage(){
  return(
    <div>
      <div className="v-section" style={{paddingTop:20}}>
        <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{fontSize:24,fontWeight:800,marginBottom:16}}>Panel Admin</motion.h1>
        <div className="kpi-grid">
          {[["4,821","Distribuidores","up +12%"],["$842K","Ventas mes","up +8%"],["$186K","Comisiones","up +15%"],["247","Nuevos","up +34"]].map(([v,l,s])=>(
            <div key={l} className="kpi"><div className="kpi-label">{l}</div><div className="kpi-val">{v}</div><div className="kpi-sub">{s}</div></div>
          ))}
        </div>
        <div className="v-sec-title">Distribuidores</div>
        <div style={{overflowX:"auto"}}>
          <table>
            <thead><tr><th>Codigo</th><th>Nombre</th><th>Nivel</th><th>Red</th><th>Ganancias</th><th>Estado</th></tr></thead>
            <tbody>
              {DISTRIBUIDORES.map(d=>(
                <tr key={d.code}>
                  <td style={{fontSize:11,color:"var(--txt-2)"}}>{d.code}</td>
                  <td style={{fontWeight:600}}>{d.name}</td>
                  <td>{d.nivel}</td><td>{d.red}</td>
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
