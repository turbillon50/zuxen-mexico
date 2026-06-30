"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { NetworkTree } from "@/components/NetworkTree";
export default function RedPage(){
  const [q,setQ]=useState("");
  return(
    <div>
      <div className="v-header">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          style={{fontSize:22,fontWeight:800,marginBottom:12}}>Mi Red</motion.h1>
        <input className="v-search" placeholder="Buscar distribuidor..." value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className="v-section" style={{paddingTop:16}}>
        <div className="v-sec-title">Arbol de distribuidores</div>
        <NetworkTree/>
      </div>
    </div>
  );
}
