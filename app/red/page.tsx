"use client";
import { NetworkTree } from "@/components/NetworkTree";
import { motion } from "framer-motion";
export default function RedPage(){
  return(
    <div>
      <div className="v-section" style={{paddingTop:20}}>
        <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{fontSize:24,fontWeight:800,marginBottom:16}}>Mi Red</motion.h1>
        <div className="kpi-grid">
          {[["47","Total en red"],["5","Nivel 1"],["25","Nivel 2"],["17","Nivel 3"]].map(([v,l])=>(
            <div key={l} className="kpi"><div className="kpi-label">{l}</div><div className="kpi-val">{v}</div></div>
          ))}
        </div>
        <div className="v-sec-title">Arbol de distribuidores</div>
        <NetworkTree/>
      </div>
    </div>
  );
}
