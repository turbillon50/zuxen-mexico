"use client";
import { motion,AnimatePresence,useScroll,useTransform } from "framer-motion";
import { useRef } from "react";
import { PRODUCTS,PLANS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { PlanCard } from "@/components/PlanCard";

const STATS=[["4,800+","Distribuidores"],["32","Estados"],["$2M+","Comisiones"]];
const RANKS=[
  {label:"Bronce",pct:"5%",desc:"2 directos frontales",color:"rgba(180,140,80,.9)",glow:"rgba(180,140,80,.3)"},
  {label:"Plata",pct:"10%",desc:"25 registros nivel 2",color:"#00c8ff",glow:"rgba(0,200,255,.3)"},
  {label:"Oro",pct:"20%",desc:"125 afiliados nivel 3",color:"#f5a623",glow:"rgba(245,166,35,.4)"},
];

export default function HomePage(){
  const heroRef=useRef<HTMLDivElement>(null);
  const {scrollY}=useScroll({container:heroRef});
  const heroOpacity=useTransform(scrollY,[0,200],[1,0]);
  const heroY=useTransform(scrollY,[0,200],[0,-40]);

  return(
    <motion.div
      initial={{opacity:0,y:18}}
      animate={{opacity:1,y:0}}
      transition={{type:"spring",stiffness:280,damping:30}}>

      {/* HERO */}
      <div style={{height:220,position:"relative",overflow:"hidden",
        background:"linear-gradient(180deg,#0a1628 0%,#06080f 100%)"}}>
        {/* Blobs */}
        <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
          <motion.div animate={{x:[0,15,0],y:[0,-10,0]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}
            style={{position:"absolute",width:300,height:300,borderRadius:"50%",top:"-30%",left:"-10%",
              background:"radial-gradient(circle,rgba(0,200,255,.18),transparent 65%)",filter:"blur(40px)"}}/>
          <motion.div animate={{x:[0,-10,0],y:[0,12,0]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut"}}
            style={{position:"absolute",width:250,height:250,borderRadius:"50%",bottom:"-20%",right:"-5%",
              background:"radial-gradient(circle,rgba(245,166,35,.12),transparent 65%)",filter:"blur(50px)"}}/>
        </div>
        {/* Contenido hero */}
        <motion.div style={{opacity:heroOpacity,y:heroY,position:"relative",
          display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",padding:"24px 24px 20px"}}>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.5}}>
            <div style={{fontSize:10,letterSpacing:4,color:"#00c8ff",marginBottom:6,
              textTransform:"uppercase",fontWeight:700}}>Bienvenido</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <h1 style={{fontSize:34,fontWeight:900,letterSpacing:1,
                background:"linear-gradient(90deg,#eef2ff,#00c8ff)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ZUXEN</h1>
              <span className="pill pill-cyan" style={{marginBottom:4}}>MÉXICO</span>
            </div>
            <p style={{fontSize:13,color:"#6b7fa3",marginTop:4,lineHeight:1.5}}>
              Bioactivadores premium para personas y mascotas
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        borderBottom:"1px solid rgba(0,200,255,.1)"}}>
        {STATS.map(([v,l],i)=>(
          <motion.div key={l} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            transition={{delay:.2+i*.05}} whileTap={{scale:.96}}
            style={{padding:"16px 12px",textAlign:"center",
              borderRight:i<2?"1px solid rgba(0,200,255,.1)":"none"}}>
            <div style={{fontSize:20,fontWeight:900,
              background:"linear-gradient(135deg,#00c8ff,#f5a623)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
            <div style={{fontSize:10,color:"#6b7fa3",marginTop:2,letterSpacing:.5}}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="v-section">
        <div className="v-sec-title">Nuestros Productos</div>
        <div className="h-scroll">
          {PRODUCTS.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              transition={{delay:.1+i*.06}} style={{width:160}}>
              <ProductCard product={p}/>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SISTEMA DE RANGOS */}
      <div className="v-section">
        <div className="v-sec-title">Sistema de Comisiones</div>
        {RANKS.map((r,i)=>(
          <motion.div key={r.label} className="v-card"
            initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
            transition={{delay:.15+i*.07}} whileTap={{scale:.97}}
            style={{borderColor:r.glow,display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:48,height:48,borderRadius:14,flexShrink:0,
              background:`radial-gradient(135deg,${r.glow},transparent)`,
              border:`1.5px solid ${r.color}`,display:"flex",alignItems:"center",
              justifyContent:"center",boxShadow:`0 0 14px ${r.glow}`}}>
              <span style={{fontSize:16,fontWeight:900,color:r.color}}>{r.pct}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:r.color}}>{r.label}</div>
              <div style={{fontSize:12,color:"#6b7fa3",marginTop:2}}>{r.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PLAN */}
      <div className="v-section">
        <div className="v-sec-title">Elige tu Plan</div>
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:.1+i*.06}}>
            <PlanCard plan={plan} featured={plan.id==="plata"}/>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="v-section" style={{paddingBottom:32}}>
        <motion.button whileTap={{scale:.96}}
          transition={{type:"spring",stiffness:400,damping:20}}
          onClick={()=>{window.location.href="/perfil"}}
          style={{border:0,cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:16,
            background:"linear-gradient(135deg,#00c8ff,#006aff)",
            color:"#06080f",width:"100%",padding:18,borderRadius:16,
            boxShadow:"0 0 28px rgba(0,200,255,.4)",letterSpacing:.5}}>
          Unirme a Zuxen →
        </motion.button>
        <p style={{textAlign:"center",fontSize:12,color:"#6b7fa3",marginTop:10}}>
          Activación $200 MXN/mes · Sin contratos · Cancela cuando quieras
        </p>
      </div>
    </motion.div>
  );
}
