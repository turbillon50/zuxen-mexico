"use client";
import { motion } from "framer-motion";
import { PRODUCTS,PLANS } from "@/lib/data";

function getGreeting(){
  const h=new Date().getHours();
  if(h<12) return"Buenos dias";
  if(h<19) return"Buenas tardes";
  return"Buenas noches";
}

const CAT_COLORS:Record<string,{c:string;g:string;label:string}>={
  personas:{c:"#f0c040",g:"rgba(212,160,23,.4)",label:"Personas"},
  mascotas:{c:"#00e5ff",g:"rgba(0,229,255,.3)",label:"Mascotas"},
  medbed:{c:"#cc44ff",g:"rgba(204,68,255,.3)",label:"MedBed"},
};

const RANKS=[
  {label:"Bronce",pct:"5%",desc:"2 directos frontales",color:"#b48c50",glow:"rgba(180,140,80,.35)"},
  {label:"Plata",pct:"10%",desc:"25 registros nivel 2",color:"#00e5ff",glow:"rgba(0,229,255,.35)"},
  {label:"Oro",pct:"20%",desc:"125 afiliados nivel 3",color:"#f0c040",glow:"rgba(212,160,23,.45)"},
];

const NUEVOS=[
  {av:"MH",name:"Mateo",color:"#00e5ff"},{av:"SR",name:"Sofia",color:"#f0c040"},
  {av:"VR",name:"Valen",color:"#b48c50"},{av:"CL",name:"Camila",color:"#b48c50"},
  {av:"DM",name:"Diego",color:"#6b82b8"},{av:"LT",name:"Lucia",color:"#6b82b8"},
];

export default function HomePage(){
  const personas=PRODUCTS.filter(p=>p.cat==="personas");
  const mascotas=PRODUCTS.filter(p=>p.cat==="mascotas");
  return(
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:280,damping:30}}>

      {/* HERO gaming */}
      <div style={{height:240,position:"relative",overflow:"hidden",
        background:"linear-gradient(180deg,#0b1535 0%,#080f28 100%)"}}>
        {/* Textura diagonal */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          background:"repeating-linear-gradient(135deg,rgba(212,160,23,.025) 0px,rgba(212,160,23,.025) 1px,transparent 1px,transparent 40px)"}} />
        {/* Rayos energia animados */}
        <motion.div animate={{x:["-100%","200%"]}} transition={{duration:3,repeat:Infinity,ease:"linear",delay:0.5}}
          style={{position:"absolute",top:"35%",left:0,width:"45%",height:2,
            background:"linear-gradient(90deg,transparent,#00e5ff,transparent)",
            filter:"blur(2px)",pointerEvents:"none"}}/>
        <motion.div animate={{x:["-100%","200%"]}} transition={{duration:4,repeat:Infinity,ease:"linear",delay:1.5}}
          style={{position:"absolute",top:"55%",left:0,width:"40%",height:2,
            background:"linear-gradient(90deg,transparent,#cc44ff,transparent)",
            filter:"blur(2px)",pointerEvents:"none"}}/>
        <motion.div animate={{x:["200%","-100%"]}} transition={{duration:3.5,repeat:Infinity,ease:"linear",delay:0.8}}
          style={{position:"absolute",top:"45%",right:0,width:"40%",height:2,
            background:"linear-gradient(90deg,transparent,#ff7b00,transparent)",
            filter:"blur(2px)",pointerEvents:"none"}}/>
        {/* Blobs */}
        <motion.div animate={{x:[0,12,0],y:[0,-8,0]}} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",width:280,height:280,borderRadius:"50%",top:"-30%",left:"-10%",
            background:"radial-gradient(circle,rgba(0,229,255,.14),transparent 65%)",filter:"blur(40px)",pointerEvents:"none"}}/>
        <motion.div animate={{x:[0,-10,0],y:[0,10,0]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",width:240,height:240,borderRadius:"50%",bottom:"-20%",right:"-5%",
            background:"radial-gradient(circle,rgba(204,68,255,.1),transparent 65%)",filter:"blur(50px)",pointerEvents:"none"}}/>
        {/* Contenido */}
        <div style={{position:"relative",display:"flex",flexDirection:"column",
          justifyContent:"flex-end",height:"100%",padding:"24px 24px 22px"}}>
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
            <div style={{fontSize:10,letterSpacing:4,color:"#6b82b8",marginBottom:5,
              textTransform:"uppercase",fontWeight:700}}>{getGreeting()}, Sofia</div>
            <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:6}}>
              <h1 style={{fontSize:38,fontWeight:900,letterSpacing:1,
                background:"linear-gradient(90deg,#f0c040,#fff 50%,#f0c040)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ZUXEN</h1>
              <span className="pill pill-gold">MEXICO</span>
              <span className="live-badge"><span className="live-dot"/>&nbsp;EN VIVO</span>
            </div>
            <p style={{fontSize:13,color:"#6b82b8",lineHeight:1.5}}>
              Bioactivadores premium para personas y mascotas
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        borderTop:"1px solid rgba(212,160,23,.1)",borderBottom:"1px solid rgba(212,160,23,.1)"}}>
        {[["4,821+","Distribuidores"],["32","Estados"],["$2M+","Comisiones"]].map(([v,l],i)=>(
          <motion.div key={l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.15+i*.05}}
            style={{padding:"16px 12px",textAlign:"center",
              borderRight:i<2?"1px solid rgba(212,160,23,.1)":"none"}}>
            <div style={{fontSize:19,fontWeight:900,
              background:"linear-gradient(135deg,#f0c040,#00e5ff)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
            <div style={{fontSize:10,color:"#6b82b8",marginTop:2}}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* META */}
      <div className="v-section">
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:12,color:"#6b82b8",fontWeight:600}}>Meta mensual</span>
          <span style={{fontSize:13,fontWeight:800,color:"#f0c040"}}>62%</span>
        </div>
        <div className="v-progress-track">
          <motion.div className="v-progress-fill"
            initial={{width:0}} animate={{width:"62%"}} transition={{delay:.4,duration:1.2,ease:[.16,1,.3,1]}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
          <span style={{fontSize:11,color:"#6b82b8"}}>$3,840 / $6,200 MXN</span>
          <span style={{fontSize:11,color:"#00ff88"}}>Rango Plata</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="v-section">
        <div className="kpi-grid">
          {[["$3,840","Ganancias mes","kpi-gold","+18%","kpi-sub-gold"],["47","Red total","kpi-cyan","3 nuevos","kpi-sub-cyan"],["$684","Comisiones","kpi-green","pagadas","kpi-sub"],["3","Ciclos","","completados",""]].map(([v,l,cls,s,scls])=>(
            <motion.div key={l} className={"kpi "+(cls||"")} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
              <div className="kpi-label">{l}</div>
              <div className="kpi-val">{v}</div>
              {s&&<div className={scls||"kpi-sub"}>{s}</div>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* NUEVOS EN RED */}
      <div style={{paddingTop:4}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 18px 12px"}}>
          <div className="v-sec-title" style={{margin:0}}>Nuevos en tu red</div>
          <span style={{fontSize:11,color:"#f0c040",fontWeight:700}}>Ver todos</span>
        </div>
        <div className="h-scroll">
          {NUEVOS.map((n,i)=>(
            <motion.div key={n.av} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:.08+i*.05}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:64}}>
              <div style={{width:46,height:46,borderRadius:"50%",
                background:"radial-gradient(135deg,"+n.color+"22,rgba(11,21,53,.9))",
                border:"2px solid "+n.color,display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:12,fontWeight:800,color:n.color,boxShadow:"0 0 10px "+n.color+"55"}}>
                {n.av}
              </div>
              <span style={{fontSize:10,color:"#e8eeff",fontWeight:600}}>{n.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRODUCTOS PERSONAS */}
      <div className="v-section">
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div className="v-sec-title" style={{margin:0}}>Bioactivadores Personas</div>
          <span className="pill pill-gold" style={{marginBottom:0}}>HUMANOS</span>
        </div>
        {personas.map((p,i)=>(
          <motion.div key={p.id} className="v-card"
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:.1+i*.07}}
            whileTap={{scale:.97}}
            style={{borderColor:"rgba(212,160,23,.2)",display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:14,flexShrink:0,
              background:"radial-gradient(135deg,rgba(212,160,23,.25),rgba(11,21,53,.8))",
              border:"1.5px solid rgba(212,160,23,.4)",display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:20,boxShadow:"0 0 14px rgba(212,160,23,.3)"}}>
              ⭐
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:"#e8eeff"}}>{p.name}</div>
              <div style={{fontSize:11,color:"#6b82b8",marginTop:2}}>{p.desc}</div>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                <span className="pill pill-gold" style={{fontSize:10}}>Dist: ${p.dist} MXN</span>
                <span style={{fontSize:10,color:"#6b82b8",padding:"4px 0"}}>Pub: ${p.pub} MXN</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PRODUCTOS MASCOTAS */}
      <div className="v-section">
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div className="v-sec-title" style={{margin:0}}>Bioactivadores Mascotas</div>
          <span className="pill pill-cyan">MASCOTAS</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {mascotas.map((p,i)=>(
            <motion.div key={p.id} className="v-card"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.06}}
              whileTap={{scale:.96}}
              style={{borderColor:"rgba(0,229,255,.2)",textAlign:"center",padding:16}}>
              <div style={{fontSize:32,marginBottom:8}}>{p.id==="gato"?"🐱":"🐶"}</div>
              <div style={{fontWeight:700,fontSize:13,color:"#e8eeff",marginBottom:4}}>{p.name}</div>
              <div className="pill pill-cyan" style={{marginBottom:6,fontSize:10}}>
                ${p.dist} MXN
              </div>
              <div style={{fontSize:10,color:"#6b82b8"}}>Pub: ${p.pub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* COMISIONES */}
      <div className="v-section">
        <div className="v-sec-title">Sistema de Comisiones</div>
        {RANKS.map((r,i)=>(
          <motion.div key={r.label} className="v-card"
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
            transition={{delay:.1+i*.07}} whileTap={{scale:.97}}
            style={{borderColor:r.glow,display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:14,flexShrink:0,
              background:"radial-gradient(135deg,"+r.glow+",transparent)",
              border:"1.5px solid "+r.color,display:"flex",alignItems:"center",
              justifyContent:"center",boxShadow:"0 0 18px "+r.glow}}>
              <span style={{fontSize:18,fontWeight:900,color:r.color}}>{r.pct}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:r.color}}>{r.label}</div>
              <div style={{fontSize:12,color:"#6b82b8",marginTop:2}}>{r.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PLANES */}
      <div className="v-section">
        <div className="v-sec-title">Elige tu Plan</div>
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} className="v-card"
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.06}}
            whileTap={{scale:.97}}
            style={{borderColor:plan.id==="oro"?"rgba(212,160,23,.35)":plan.id==="plata"?"rgba(0,229,255,.25)":undefined}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:800,fontSize:16,color:plan.id==="oro"?"#f0c040":plan.id==="plata"?"#00e5ff":"#b48c50"}}>
                {plan.name}
              </div>
              <div style={{fontSize:13,color:"#6b82b8"}}>
                Inv: <span style={{fontWeight:700,color:"#e8eeff"}}>${plan.inv.toLocaleString("es-MX")}</span>
              </div>
            </div>
            <div style={{fontSize:11,color:"#6b82b8",marginBottom:10"}}>Potencial: <span style={{color:"#00ff88",fontWeight:700"}}>${plan.pot.toLocaleString("es-MX")} MXN</span></div>
            {plan.features.map(f=>(
              <div key={f} style={{fontSize:12,color:"#e8eeff",padding:"4px 0",display:"flex",gap:8}}>
                <span style={{color:"#f0c040"}}>◆</span>{f}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="v-section" style={{paddingBottom:32}}>
        <motion.button whileTap={{scale:.96}} className="v-btn v-btn-primary"
          onClick={()=>{window.location.href="/perfil"}}>
          Unirme a Zuxen Mexico
        </motion.button>
        <p style={{textAlign:"center",fontSize:12,color:"#6b82b8",marginTop:10}}>
          Activacion $200 MXN/mes · Sin contratos
        </p>
      </div>

      {/* FAB WhatsApp */}
      <a href="https://wa.me/529984292748?text=Hola%20quiero%20info%20de%20Zuxen"
        className="fab" aria-label="WhatsApp">
        <svg width={26} height={26} viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </motion.div>
  );
}
