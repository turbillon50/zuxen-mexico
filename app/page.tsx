"use client";
import { motion } from "framer-motion";
import { PRODUCTS,PLANS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { PlanCard } from "@/components/PlanCard";
export default function HomePage(){
  return(
    <div>
      <div style={{height:200,position:"relative",overflow:"hidden",
        background:"#10101a",borderBottom:"1px solid var(--border)",
        display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:24}}>
        <div style={{position:"absolute",inset:0,
          background:"radial-gradient(40% 45% at 18% 20%,rgba(255,255,255,.22),transparent),radial-gradient(55% 55% at 85% 70%,rgba(130,160,255,.25),transparent)",
          filter:"blur(10px)",animation:"drift 9s ease-in-out infinite alternate"}}/>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
          transition={{duration:.5}} style={{position:"relative"}}>
          <div style={{fontSize:11,letterSpacing:3,color:"#9a9aac",marginBottom:4,textTransform:"uppercase"}}>Bienvenido a</div>
          <h1 style={{fontSize:32,fontWeight:900,letterSpacing:2}}>ZUXEN MEXICO</h1>
          <p style={{fontSize:13,color:"#9a9aac",marginTop:4}}>Bioactivadores premium para personas y mascotas</p>
        </motion.div>
        <style>{`@keyframes drift{to{transform:translate(10px,-8px) scale(1.08)}}`}</style>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderBottom:"1px solid var(--border)"}}>
        {[["4,800+","Distribuidores"],["32","Estados"],["$2M+","Comisiones"]].map(([v,l])=>(
          <div key={l} style={{padding:"16px 12px",textAlign:"center",borderRight:"1px solid var(--border)"}}>
            <div style={{fontSize:18,fontWeight:800}}>{v}</div>
            <div style={{fontSize:10,color:"var(--txt-2)",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      <div className="v-section">
        <div className="v-sec-title">Nuestros Productos</div>
        {PRODUCTS.map(p=><ProductCard key={p.id} product={p}/>)}
      </div>
      <div className="v-section">
        <div className="v-sec-title">Plan de Negocio</div>
        {PLANS.map(plan=><PlanCard key={plan.id} plan={plan} featured={plan.id==="plata"}/>)}
      </div>
      <div className="v-section">
        <div className="v-sec-title">Sistema Binario</div>
        {[[5,"5%","2 directos frontales"],[10,"10%","25 registros nivel 2"],[20,"20%","125 afiliados nivel 3"]].map(([pct,label,desc])=>(
          <div key={String(pct)} className="v-card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{desc}</div>
                <div style={{fontSize:12,color:"var(--txt-2)",marginTop:2}}>Comision mensual sobre compras de tu red</div>
              </div>
              <div style={{fontSize:24,fontWeight:900,color:"#4ade80"}}>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="v-section" style={{paddingBottom:32}}>
        <motion.button whileTap={{scale:.97}}
          onClick={()=>{window.location.href="/perfil"}}
          style={{border:0,cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:16,
            background:"#fff",color:"#08080c",width:"100%",padding:16,borderRadius:14}}>
          Unirme Ahora
        </motion.button>
        <p style={{textAlign:"center",fontSize:12,color:"var(--txt-2)",marginTop:12}}>Activacion $200 MXN/mes. Sin contratos.</p>
      </div>
    </div>
  );
}
