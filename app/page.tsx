"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { PLANS } from "@/lib/data";
import { PlanCard } from "@/components/PlanCard";
import { useTheme } from "@/components/ThemeProvider";

function getGreeting(){
  const h=new Date().getHours();
  if(h<12) return "Buenos días";
  if(h<19) return "Buenas tardes";
  return "Buenas noches";
}

/* Mesh vivo — canvas animado */
function MeshCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    let raf=0;
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight};
    resize(); window.addEventListener("resize",resize);
    const pts=[
      {x:.15,y:.2,vx:.0004,vy:.0003,r:"0,229,255"},
      {x:.85,y:.8,vx:-.0003,vy:-.0004,r:"204,68,255"},
      {x:.85,y:.15,vx:-.0004,vy:.0003,r:"255,123,0"},
      {x:.2,y:.85,vx:.0003,vy:-.0003,r:"0,255,136"},
      {x:.5,y:.5,vx:.0002,vy:-.0005,r:"240,192,64"},
    ];
    let t=0;
    const draw=()=>{
      t+=1;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1) p.vx*=-1;
        if(p.y<0||p.y>1) p.vy*=-1;
        const gx=p.x*canvas.width, gy=p.y*canvas.height;
        const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,canvas.width*.45);
        const alpha=(0.08+0.03*Math.sin(t*.02)).toFixed(3);
        grad.addColorStop(0,"rgba("+p.r+","+alpha+")");
        grad.addColorStop(1,"rgba("+p.r+",0)");
        ctx.fillStyle=grad;
        ctx.beginPath();
        ctx.arc(gx,gy,canvas.width*.45,0,Math.PI*2);
        ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize)};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

const NUEVOS=[
  {av:"MH",name:"Mateo",color:"#00e5ff",nivel:"Plata"},
  {av:"SR",name:"Sofía",color:"#f0c040",nivel:"Oro"},
  {av:"VR",name:"Valentina",color:"#b48c50",nivel:"Bronce"},
  {av:"CL",name:"Camila",color:"#b48c50",nivel:"Bronce"},
  {av:"DM",name:"Diego",color:"#6b82b8",nivel:"Nuevo"},
  {av:"FC",name:"Fernanda",color:"#b48c50",nivel:"Bronce"},
];

const RANKS=[
  {label:"Bronce",pct:"5%",desc:"2 directos frontales",color:"#b48c50",glow:"rgba(180,140,80,.4)"},
  {label:"Plata",pct:"10%",desc:"25 registros nivel 2",color:"#00e5ff",glow:"rgba(0,229,255,.4)"},
  {label:"Oro",pct:"20%",desc:"125 afiliados nivel 3",color:"#f0c040",glow:"rgba(240,192,64,.5)"},
];

export default function HomePage(){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const txt2=isDark?"#6b82b8":"#6b7fa3";
  const surf=isDark?"rgba(11,21,53,.82)":"rgba(255,255,255,.88)";
  const border=isDark?"rgba(212,160,23,.15)":"rgba(10,21,100,.1)";
  const META_PCT=62;

  return(
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:280,damping:30}}>

      {/* HERO con mesh vivo */}
      <div style={{height:260,position:"relative",overflow:"hidden",
        background:isDark?"#0b1535":"#dde3ff"}}>
        <MeshCanvas/>
        {/* Rayos gaming */}
        {[
          {top:"35%",dur:3,color:"#00e5ff",delay:0},
          {top:"55%",dur:4,color:"#cc44ff",delay:1.5},
          {top:"70%",dur:3.5,color:"#ff7b00",delay:.8},
        ].map((r,i)=>(
          <motion.div key={i}
            animate={{x:["-110%","210%"]}}
            transition={{duration:r.dur,repeat:Infinity,ease:"linear",delay:r.delay}}
            style={{position:"absolute",top:r.top,left:0,width:"40%",height:2,
              background:"linear-gradient(90deg,transparent,"+r.color+",transparent)",
              filter:"blur(1.5px)",opacity:.75,pointerEvents:"none"}}/>
        ))}
        {/* Logo oficial */}
        <div style={{position:"relative",height:"100%",display:"flex",
          flexDirection:"column",justifyContent:"flex-end",padding:"0 24px 22px"}}>
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
            <div style={{fontSize:10,letterSpacing:4,color:txt2,marginBottom:6,
              textTransform:"uppercase",fontWeight:700}}>{getGreeting()}, Sofía</div>
            <img src="/logo-zuxen.jpg" alt="ZUXEN"
              style={{height:56,objectFit:"contain",objectPosition:"left",marginBottom:8,
                filter:"drop-shadow(0 0 20px rgba(240,192,64,.6))",
                animation:"rainbowGlow 5s linear infinite"}}/>
            <p style={{fontSize:13,color:txt2,lineHeight:1.5}}>
              Bioactivadores premium para personas y mascotas
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS LIVE */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        borderTop:"1px solid "+border,borderBottom:"1px solid "+border,
        background:isDark?"rgba(8,15,40,.6)":"rgba(255,255,255,.5)"}}>
        {[["4,821+","Distribuidores"],["32","Estados"],["$2M+","Comisiones"]].map(([v,l],i)=>(
          <motion.div key={l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:.15+i*.05}}
            style={{padding:"16px 12px",textAlign:"center",
              borderRight:i<2?"1px solid "+border:"none"}}>
            <div style={{fontSize:19,fontWeight:900,
              background:"linear-gradient(135deg,#f0c040,#00e5ff)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
            <div style={{fontSize:10,color:txt2,marginTop:2}}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* META */}
      <div className="v-section">
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:12,color:txt2,fontWeight:600}}>Meta mensual</span>
          <span style={{fontSize:13,fontWeight:800,color:"#f0c040"}}>{META_PCT}%</span>
        </div>
        <div className="v-progress-track">
          <motion.div className="v-progress-fill"
            initial={{width:0}} animate={{width:META_PCT+"%"}}
            transition={{delay:.4,duration:1.2,ease:[.16,1,.3,1]}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
          <span style={{fontSize:11,color:txt2}}>$3,840 / $6,200 MXN</span>
          <span style={{fontSize:11,color:"#00ff88"}}>Rango Plata ✓</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="v-section">
        <div className="kpi-grid">
          {[
            {v:"$3,840",l:"Ganancias mes",sub:"+18%",color:"#f0c040",bc:"rgba(240,192,64,.2)"},
            {v:"47",l:"Red total",sub:"3 nuevos",color:"#00e5ff",bc:"rgba(0,229,255,.18)"},
            {v:"$684",l:"Comisiones",sub:"pagadas",color:"#00ff88",bc:"rgba(0,255,136,.15)"},
            {v:"3",l:"Ciclos",sub:"completados",color:"#cc44ff",bc:"rgba(204,68,255,.15)"},
          ].map(({v,l,sub,color,bc},i)=>(
            <motion.div key={l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:.12+i*.05}}
              style={{background:surf,border:"1px solid "+bc,borderRadius:18,padding:16,
                backdropFilter:"blur(14px)",boxShadow:"0 0 14px "+bc}}>
              <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontSize:22,fontWeight:900,color}}>{v}</div>
              <div style={{fontSize:11,color:"#00ff88",marginTop:3}}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NUEVOS EN RED */}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"0 18px 12px",alignItems:"center"}}>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:1.8,color:txt2,fontWeight:700}}>
            Nuevos en tu red
          </div>
          <span style={{fontSize:11,color:"#f0c040",fontWeight:700}}>Ver todos</span>
        </div>
        <div className="h-scroll">
          {NUEVOS.map((n,i)=>(
            <motion.div key={n.av} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:.08+i*.05}} whileTap={{scale:.92}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:68,cursor:"pointer"}}>
              <motion.div
                animate={{boxShadow:["0 0 0 0 "+n.color+"60","0 0 0 8px "+n.color+"00"]}}
                transition={{repeat:Infinity,duration:2.4,delay:i*.3}}
                style={{width:50,height:50,borderRadius:"50%",
                  background:"radial-gradient(135deg,"+n.color+"22,rgba(11,21,53,.9))",
                  border:"2px solid "+n.color,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:13,fontWeight:800,color:n.color}}>
                {n.av}
              </motion.div>
              <span style={{fontSize:10,color:txt,fontWeight:700}}>{n.name}</span>
              <span style={{fontSize:9,color:n.color}}>{n.nivel}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SIGUIENTE RANGO */}
      <div className="v-section">
        <div style={{background:surf,border:"1px solid rgba(240,192,64,.25)",borderRadius:20,
          padding:18,backdropFilter:"blur(14px)",boxShadow:"0 0 20px rgba(240,192,64,.1)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Siguiente rango</div>
              <div style={{fontSize:18,fontWeight:900,color:"#f0c040"}}>🥇 Oro</div>
            </div>
            <span style={{fontSize:11,color:"#f0c040",fontWeight:700}}>67%</span>
          </div>
          <div className="v-progress-track">
            <motion.div style={{height:"100%",borderRadius:6,
              background:"linear-gradient(90deg,#f0c040,#ffd700)",
              boxShadow:"0 0 10px rgba(240,192,64,.5)"}}
              initial={{width:0}} animate={{width:"67%"}}
              transition={{delay:.6,duration:1.2,ease:[.16,1,.3,1]}}/>
          </div>
          <div style={{fontSize:11,color:txt2,marginTop:6}}>Te faltan 3 afiliados directos</div>
        </div>
      </div>

      {/* COMISIONES */}
      <div className="v-section">
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:1.8,
          color:txt2,fontWeight:700,marginBottom:12}}>Sistema de Comisiones</div>
        {RANKS.map((r,i)=>(
          <motion.div key={r.label}
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
            transition={{delay:.1+i*.07}} whileTap={{scale:.97}}
            style={{background:surf,border:"1px solid "+r.color+"33",borderRadius:20,
              padding:"14px 18px",marginBottom:10,backdropFilter:"blur(14px)",
              boxShadow:"0 0 16px "+r.glow,
              display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:14,flexShrink:0,
              background:"radial-gradient(135deg,"+r.glow+",transparent)",
              border:"1.5px solid "+r.color,display:"flex",alignItems:"center",
              justifyContent:"center",boxShadow:"0 0 18px "+r.glow}}>
              <span style={{fontSize:18,fontWeight:900,color:r.color}}>{r.pct}</span>
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:r.color}}>{r.label}</div>
              <div style={{fontSize:12,color:txt2,marginTop:2}}>{r.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PLANES */}
      <div className="v-section">
        <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:1.8,
          color:txt2,fontWeight:700,marginBottom:12}}>Elige tu Plan</div>
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:.08+i*.07}}>
            <PlanCard plan={plan} featured={plan.id==="plata"}/>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="v-section" style={{paddingBottom:36}}>
        <motion.button whileTap={{scale:.96}}
          onClick={()=>{window.location.href="/perfil"}}
          style={{border:0,cursor:"pointer",fontFamily:"inherit",fontWeight:900,fontSize:16,
            borderRadius:16,padding:18,width:"100%",letterSpacing:.5,
            background:"linear-gradient(135deg,#f0c040,#d4a017,#f0c040)",
            backgroundSize:"200% 100%",color:"#06080f",
            boxShadow:"0 0 32px rgba(240,192,64,.45)",
            animation:"goldShimmer 3s ease-in-out infinite"}}>
          Unirme a Zuxen México →
        </motion.button>
        <p style={{textAlign:"center",fontSize:12,color:txt2,marginTop:10}}>
          Activación $200 MXN/mes · Sin contratos · Cancela cuando quieras
        </p>
      </div>

      {/* FAB WhatsApp */}
      <a href="https://wa.me/529984292748?text=Hola%20quiero%20info%20de%20Zuxen"
        style={{position:"fixed",right:18,
          bottom:"calc(var(--nav-h) + 20px + env(safe-area-inset-bottom))",
          width:54,height:54,borderRadius:"50%",border:0,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:30,
          background:"linear-gradient(135deg,#25d366,#128c7e)",
          boxShadow:"0 4px 20px rgba(37,211,102,.45)",textDecoration:"none"}}
        aria-label="WhatsApp">
        <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </motion.div>
  );
}
