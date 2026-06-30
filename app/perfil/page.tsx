"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function PerfilPage(){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const txt2=isDark?"#6b82b8":"#6b7fa3";
  const surf=isDark?"rgba(11,21,53,.82)":"rgba(255,255,255,.88)";
  const border=isDark?"rgba(212,160,23,.15)":"rgba(10,21,100,.1)";
  return(
    <div>
      <div className="v-header">
        {/* Avatar + datos */}
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{position:"relative"}}>
            <motion.div animate={{boxShadow:["0 0 0 0 rgba(240,192,64,.5)","0 0 0 10px rgba(240,192,64,0)"]}}
              transition={{repeat:Infinity,duration:2.2}}
              style={{width:62,height:62,borderRadius:"50%",
                background:"radial-gradient(135deg,rgba(240,192,64,.22),rgba(11,21,53,.9))",
                border:"2.5px solid #f0c040",display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:20,fontWeight:800,color:"#f0c040"}}>SR</motion.div>
            <div style={{position:"absolute",bottom:-1,right:-1,width:16,height:16,
              borderRadius:"50%",background:"#00ff88",border:"2px solid "+surf,
              boxShadow:"0 0 8px #00ff88"}}/>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:txt}}>Sofia Ramirez</div>
            <div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,
                background:"rgba(0,229,255,.1)",color:"#00e5ff",border:"1px solid rgba(0,229,255,.2)"}}>Plata</span>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,
                background:"rgba(240,192,64,.1)",color:"#f0c040",border:"1px solid rgba(240,192,64,.2)"}}>ZUX-04821</span>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,
                background:"rgba(0,255,136,.1)",color:"#00ff88",border:"1px solid rgba(0,255,136,.2)"}}>Activa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="v-section" style={{paddingTop:16}}>
        {/* KPIs */}
        <div className="kpi-grid" style={{marginBottom:20}}>
          {[
            {v:"$3,840",l:"Ganancias mes",sub:"+18%",sc:"#f0c040",bc:"rgba(240,192,64,.25)"},
            {v:"47",l:"Red total",sub:"3 nuevos",sc:"#00e5ff",bc:"rgba(0,229,255,.2)"},
            {v:"3",l:"Ciclos",sub:"cobrados",sc:"#00ff88",bc:"rgba(0,255,136,.15)"},
            {v:"62%",l:"Meta mes",sub:"en progreso",sc:"#cc44ff",bc:"rgba(204,68,255,.15)"},
          ].map(({v,l,sub,sc,bc})=>(
            <motion.div key={l} whileTap={{scale:.97}}
              style={{background:surf,border:"1px solid "+bc,borderRadius:18,padding:16,
                backdropFilter:"blur(12px)",boxShadow:"0 0 14px "+bc}}>
              <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontSize:22,fontWeight:900,color:sc}}>{v}</div>
              <div style={{fontSize:11,color:txt2,marginTop:3}}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Datos */}
        <div style={{background:surf,border:"1px solid "+border,borderRadius:20,
          padding:18,backdropFilter:"blur(14px)",marginBottom:12}}>
          <div style={{fontSize:11,color:txt2,textTransform:"uppercase",letterSpacing:1.5,
            marginBottom:14,fontWeight:700}}>Datos de cuenta</div>
          {[["Correo","sofia@gmail.com"],["Teléfono","+52 442 123 4567"],
            ["Ciudad","Querétaro, QRO"],["CLABE","...0742"],["Código","ZUX-04821"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"11px 0",borderBottom:"1px solid "+border}}>
              <span style={{color:txt2,fontSize:13}}>{l}</span>
              <span style={{fontWeight:700,fontSize:13,color:txt}}>{v}</span>
            </div>
          ))}
        </div>

        <motion.button whileTap={{scale:.97}}
          style={{width:"100%",border:0,cursor:"pointer",fontFamily:"inherit",fontWeight:900,fontSize:15,
            borderRadius:14,padding:16,marginBottom:10,
            background:"linear-gradient(135deg,#f0c040,#d4a017)",color:"#06080f",
            boxShadow:"0 0 24px rgba(240,192,64,.4)"}}>
          Guardar Cambios
        </motion.button>
        <button style={{width:"100%",background:"transparent",color:txt2,
          border:"1px solid "+border,borderRadius:14,padding:14,
          fontFamily:"inherit",fontWeight:600,fontSize:14,cursor:"pointer"}}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
