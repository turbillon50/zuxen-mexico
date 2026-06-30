"use client";
import { DISTRIBUIDORES } from "@/lib/data";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const NIVEL_COLOR:Record<string,string>={
  Diamante:"#cc44ff",Rubi:"#ef4444",Oro:"#f0c040",Plata:"#00e5ff",Bronce:"#b48c50"
};
const ST:Record<string,{bg:string;color:string}>={
  activo:{bg:"rgba(0,255,136,.1)",color:"#00ff88"},
  pendiente:{bg:"rgba(240,192,64,.1)",color:"#f0c040"},
  inactivo:{bg:"rgba(239,68,68,.1)",color:"#ef4444"},
};

export default function AdminPage(){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const txt2=isDark?"#6b82b8":"#6b7fa3";
  const surf=isDark?"rgba(11,21,53,.82)":"rgba(255,255,255,.88)";
  const border=isDark?"rgba(212,160,23,.15)":"rgba(10,21,100,.1)";

  return(
    <div>
      <div className="v-header">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          style={{fontSize:22,fontWeight:800,color:txt}}>Dashboard</motion.h1>
      </div>
      <div className="v-section" style={{paddingTop:16}}>
        {/* KPIs */}
        <div className="kpi-grid">
          {[
            {v:"4,821",l:"Distribuidores",sub:"+12% mes",color:"#00e5ff",bc:"rgba(0,229,255,.2)"},
            {v:"$842K",l:"Ventas mes",sub:"+8% mes",color:"#f0c040",bc:"rgba(240,192,64,.2)"},
            {v:"$186K",l:"Comisiones",sub:"+15% mes",color:"#00ff88",bc:"rgba(0,255,136,.15)"},
            {v:"247",l:"Nuevos",sub:"+34 semana",color:"#cc44ff",bc:"rgba(204,68,255,.15)"},
          ].map(({v,l,sub,color,bc},i)=>(
            <motion.div key={l} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              transition={{delay:.05+i*.06}}
              style={{background:surf,border:"1px solid "+bc,borderRadius:18,padding:16,
                backdropFilter:"blur(14px)",boxShadow:"0 0 16px "+bc}}>
              <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontSize:22,fontWeight:900,color}}>{v}</div>
              <div style={{fontSize:11,color:"#00ff88",marginTop:3}}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabla */}
        <div style={{fontSize:11,color:txt2,textTransform:"uppercase",letterSpacing:1.8,
          marginBottom:12,fontWeight:700,marginTop:8}}>Distribuidores</div>
        <div style={{overflowX:"auto",borderRadius:20,border:"1px solid "+border,
          background:surf,backdropFilter:"blur(14px)"}}>
          <table style={{minWidth:520}}>
            <thead>
              <tr style={{borderBottom:"1px solid "+border}}>
                {["Código","Nombre","Nivel","Red","Ganancias","Estado"].map(h=>(
                  <th key={h} style={{padding:"12px 14px",fontSize:10,color:txt2,
                    textTransform:"uppercase",letterSpacing:.8,fontWeight:700,
                    textAlign:"left"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DISTRIBUIDORES.map((d,i)=>{
                const nc=NIVEL_COLOR[d.nivel]||"#6b82b8";
                const st=ST[d.status]||ST.inactivo;
                return(
                  <motion.tr key={d.code} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
                    transition={{delay:.1+i*.04}}
                    style={{borderBottom:"1px solid "+border,cursor:"pointer"}}>
                    <td style={{padding:"13px 14px",fontSize:11,color:txt2,fontFamily:"monospace"}}>{d.code}</td>
                    <td style={{padding:"13px 14px",fontWeight:700,color:txt}}>{d.name}</td>
                    <td style={{padding:"13px 14px"}}>
                      <span style={{fontWeight:700,fontSize:12,color:nc,
                        textShadow:"0 0 8px "+nc+"66"}}>{d.nivel}</span>
                    </td>
                    <td style={{padding:"13px 14px",color:txt,fontWeight:600}}>{d.red}</td>
                    <td style={{padding:"13px 14px",fontWeight:800,
                      color:"#00ff88",fontSize:13}}>
                      ${d.earn.toLocaleString("es-MX")}
                    </td>
                    <td style={{padding:"13px 14px"}}>
                      <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                        background:st.bg,color:st.color}}>{d.status}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
