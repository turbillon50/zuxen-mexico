"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { PLANS } from "@/lib/data";
import { PlanCard } from "@/components/PlanCard";
import { useTheme } from "@/components/ThemeProvider";

function getGreeting(){
  const h=new Date().getHours();
  if(h<12) return "Buenos dias";
  if(h<19) return "Buenas tardes";
  return "Buenas noches";
}

function MeshCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    let raf=0;
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight};
    resize();
    const pts=[
      {x:.1,y:.2,vx:.0005,vy:.0004,r:"0,255,255"},
      {x:.9,y:.8,vx:-.0004,vy:-.0005,r:"255,0,255"},
      {x:.85,y:.1,vx:-.0005,vy:.0004,r:"123,47,255"},
      {x:.15,y:.9,vx:.0004,vy:-.0004,r:"57,255,20"},
      {x:.5,y:.5,vx:.0003,vy:-.0006,r:"255,215,0"},
    ];
    let t=0;
    const draw=()=>{
      t++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1) p.vx*=-1;
        if(p.y<0||p.y>1) p.vy*=-1;
        const gx=p.x*canvas.width, gy=p.y*canvas.height;
        const a=(0.06+0.025*Math.sin(t*.015)).toFixed(3);
        const g=ctx.createRadialGradient(gx,gy,0,gx,gy,canvas.width*.4);
        g.addColorStop(0,`rgba(${p.r},${a})`);
        g.addColorStop(1,`rgba(${p.r},0)`);
        ctx.fillStyle=g;
        ctx.beginPath();
        ctx.arc(gx,gy,canvas.width*.4,0,Math.PI*2);
        ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf)};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

const NUEVOS=[
  {av:"MH",name:"Mateo",color:"#00ffff"},{av:"SR",name:"Sofia",color:"#ffd700"},
  {av:"VR",name:"Valen",color:"#ff6600"},{av:"CL",name:"Camila",color:"#ff00ff"},
  {av:"DM",name:"Diego",color:"#39ff14"},{av:"FC",name:"Fernanda",color:"#7b2fff"},
];
const RANKS=[
  {label:"BRONCE",pct:"5%",desc:"2 directos frontales",color:"#ff6600",glow:"rgba(255,102,0,.35)"},
  {label:"PLATA",pct:"10%",desc:"25 registros nivel 2",color:"#00ffff",glow:"rgba(0,255,255,.35)"},
  {label:"ORO",pct:"20%",desc:"125 afiliados nivel 3",color:"#ffd700",glow:"rgba(255,215,0,.45)"},
];

export default function HomePage(){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const txt=isDark?"#e0f0ff":"#0a0f2a";
  const txt2=isDark?"#6080a0":"#5060a0";
  const surf=isDark?"rgba(0,0,20,.8)":"rgba(255,255,255,.88)";
  const border=isDark?"rgba(0,255,255,.15)":"rgba(0,100,255,.12)";
  const META=62;
  return(
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:280,damping:30}}>

      {/* HERO cyberpunk */}
      <div style={{height:260,position:"relative",overflow:"hidden",
        background:"#000"}}>
        <MeshCanvas/>
        {/* Grid overlay */}
        <div style={{position:"absolute",inset:0,
          backgroundImage:"linear-gradient(rgba(0,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,.04) 1px,transparent 1px)",
          backgroundSize:"40px 40px",pointerEvents:"none"}}/>
        {/* Scanline */}
        <div style={{position:"absolute",left:0,right:0,height:1,
          background:"linear-gradient(90deg,transparent,rgba(0,255,255,.4),transparent)",
          animation:"scanline 4s linear infinite",pointerEvents:"none"}}/>
        {/* Rayos horizontales */}
        {[
          {top:"30%",dur:2.5,color:"#00ffff",delay:0},
          {top:"60%",dur:3.5,color:"#ff00ff",delay:1},
          {top:"75%",dur:3,color:"#ffd700",delay:.5},
        ].map((r,i)=>(
          <motion.div key={i}
            animate={{x:["-110%","210%"]}}
            transition={{duration:r.dur,repeat:Infinity,ease:"linear",delay:r.delay}}
            style={{position:"absolute",top:r.top,left:0,width:"35%",height:1,
              background:`linear-gradient(90deg,transparent,${r.color},transparent)`,
              boxShadow:`0 0 6px ${r.color}`,opacity:.8,pointerEvents:"none"}}/>
        ))}
        {/* Contenido hero */}
        <div style={{position:"relative",height:"100%",display:"flex",
          flexDirection:"column",justifyContent:"flex-end",padding:"0 24px 22px"}}>
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
            <div style={{fontSize:9,letterSpacing:4,color:"rgba(0,255,255,.5)",
              marginBottom:6,textTransform:"uppercase",fontFamily:"monospace"}}>
              {getGreeting()}, SOFIA
            </div>
            {/* LOGO SIN FONDO */}
            <img src="/logo-zuxen.jpg" alt="ZUXEN"
              style={{height:64,objectFit:"contain",objectPosition:"left",
                display:"block",marginBottom:8,
                mixBlendMode:"screen",
                filter:"brightness(1.15) saturate(1.4) drop-shadow(0 0 20px rgba(0,255,255,.7))",
                animation:"rainbowGlow 5s linear infinite"}}/>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{padding:"2px 8px",borderRadius:3,fontSize:9,fontWeight:800,
                letterSpacing:1,background:"rgba(0,255,255,.1)",
                color:"#00ffff",border:"1px solid rgba(0,255,255,.3)"}}>WEB3</span>
              <span className="live-badge"><span className="live-dot"/>&nbsp;EN VIVO</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        borderTop:"1px solid rgba(0,255,255,.1)",borderBottom:"1px solid rgba(0,255,255,.1)",
        background:"rgba(0,0,10,.8)"}}>
        {[["4,821+","Distribuidores"],["32","Estados"],["$2M+","Comisiones"]].map(([v,l],i)=>(
          <motion.div key={l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:.12+i*.05}}
            style={{padding:"15px 10px",textAlign:"center",
              borderRight:i<2?"1px solid rgba(0,255,255,.08)":"none"}}>
            <div style={{fontSize:18,fontWeight:900,
              background:"linear-gradient(135deg,#00ffff,#ff00ff)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
            <div style={{fontSize:9,color:txt2,marginTop:2,letterSpacing:.5,textTransform:"uppercase"}}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* META */}
      <div className="v-section">
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:10,color:txt2,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Meta mensual</span>
          <span style={{fontSize:12,fontWeight:800,color:"#ffd700",textShadow:"0 0 8px rgba(255,215,0,.6)"}}>{META}%</span>
        </div>
        <div className="v-progress-track">
          <motion.div className="v-progress-fill"
            initial={{width:0}} animate={{width:`${META}%`}}
            transition={{delay:.4,duration:1.2,ease:[.16,1,.3,1]}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{fontSize:10,color:txt2,fontFamily:"monospace"}}>$3,840 / $6,200 MXN</span>
          <span style={{fontSize:10,color:"#39ff14",fontFamily:"monospace"}}>PLATA ACTIVO</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="v-section">
        <div className="kpi-grid">
          {[
            {v:"$3,840",l:"Ganancias mes",sub:"+18%",color:"#ffd700",cls:"kpi-gold"},
            {v:"47",l:"Red total",sub:"3 nuevos",color:"#00ffff",cls:"kpi-cyan"},
            {v:"$684",l:"Comisiones",sub:"pagadas",color:"#39ff14",cls:"kpi-green"},
            {v:"3",l:"Ciclos",sub:"completados",color:"#ff00ff",cls:"kpi-mag"},
          ].map(({v,l,sub,color,cls},i)=>(
            <motion.div key={l} className={`kpi ${cls}`}
              initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.05}}>
              <div className="kpi-label">{l}</div>
              <div className="kpi-val" style={{color,textShadow:`0 0 10px ${color}66`}}>{v}</div>
              <div className="kpi-sub" style={{color}}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NUEVOS EN RED */}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"0 18px 12px",alignItems:"center"}}>
          <div className="v-sec-title" style={{margin:0}}>Nuevos en tu red</div>
          <span style={{fontSize:10,color:"#ffd700",fontWeight:700,letterSpacing:1,cursor:"pointer"}}>VER TODOS</span>
        </div>
        <div className="h-scroll">
          {NUEVOS.map((n,i)=>(
            <motion.div key={n.av}
              initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.06+i*.04}}
              whileTap={{scale:.9}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:64,cursor:"pointer"}}>
              <motion.div
                animate={{boxShadow:[`0 0 0 0 ${n.color}60`,`0 0 0 8px ${n.color}00`]}}
                transition={{repeat:Infinity,duration:2.2,delay:i*.3}}
                style={{width:48,height:48,borderRadius:8,
                  background:`rgba(0,0,20,.9)`,
                  border:`1px solid ${n.color}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:13,fontWeight:900,color:n.color,
                  textShadow:`0 0 8px ${n.color}`,fontFamily:"monospace"}}>
                {n.av}
              </motion.div>
              <span style={{fontSize:9,color:txt,fontWeight:700,letterSpacing:.5}}>{n.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SIGUIENTE RANGO */}
      <div className="v-section">
        <div style={{background:surf,border:"1px solid rgba(255,215,0,.2)",borderRadius:"var(--radius)",
          padding:16,boxShadow:"0 0 16px rgba(255,215,0,.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div>
              <div style={{fontSize:9,color:txt2,textTransform:"uppercase",letterSpacing:2,marginBottom:4}}>Siguiente rango</div>
              <div style={{fontSize:16,fontWeight:900,color:"#ffd700",
                textShadow:"0 0 12px rgba(255,215,0,.7)",letterSpacing:1}}>ORO</div>
            </div>
            <span style={{fontSize:11,color:"#ffd700",fontWeight:800,fontFamily:"monospace"}}>67%</span>
          </div>
          <div className="v-progress-track">
            <motion.div style={{height:"100%",background:"linear-gradient(90deg,#ffd700,#ff6600)",
              boxShadow:"0 0 10px rgba(255,215,0,.6)"}}
              initial={{width:0}} animate={{width:"67%"}}
              transition={{delay:.6,duration:1.2,ease:[.16,1,.3,1]}}/>
          </div>
          <div style={{fontSize:10,color:txt2,marginTop:5,fontFamily:"monospace"}}>Faltan 3 afiliados directos</div>
        </div>
      </div>

      {/* COMISIONES */}
      <div className="v-section">
        <div className="v-sec-title">Sistema de comisiones</div>
        {RANKS.map((r,i)=>(
          <motion.div key={r.label}
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:.08+i*.06}}
            whileTap={{scale:.97}}
            style={{background:surf,border:`1px solid ${r.color}33`,borderRadius:"var(--radius)",
              padding:"14px 18px",marginBottom:10,
              boxShadow:`0 0 14px ${r.glow}`,
              display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:8,flexShrink:0,
              background:`rgba(0,0,20,.8)`,border:`1px solid ${r.color}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:`0 0 16px ${r.glow}`}}>
              <span style={{fontSize:16,fontWeight:900,color:r.color,
                textShadow:`0 0 10px ${r.color}`}}>{r.pct}</span>
            </div>
            <div>
              <div style={{fontWeight:900,fontSize:13,color:r.color,letterSpacing:1,
                textShadow:`0 0 8px ${r.color}`}}>{r.label}</div>
              <div style={{fontSize:12,color:txt2,marginTop:3}}>{r.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PLANES */}
      <div className="v-section">
        <div className="v-sec-title">Planes de negocio</div>
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:.06+i*.07}}>
            <PlanCard plan={plan} featured={plan.id==="plata"}/>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="v-section" style={{paddingBottom:36}}>
        <motion.button whileTap={{scale:.96}} className="v-btn v-btn-primary"
          onClick={()=>{window.location.href="/perfil"}}>
          UNIRME A ZUXEN MEXICO
        </motion.button>
        <p style={{textAlign:"center",fontSize:11,color:txt2,marginTop:10,fontFamily:"monospace"}}>
          $200 MXN/MES · SIN CONTRATOS · CANCELA CUANDO QUIERAS
        </p>
      </div>

      {/* FAB WhatsApp */}
      <a href="https://wa.me/529984292748?text=Hola%20quiero%20info%20de%20Zuxen"
        className="fab" aria-label="WhatsApp">
        <svg width={26} height={26} viewBox="0 0 24 24" fill="#25d366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </motion.div>
  );
}
