"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { PRODUCTS, PLANS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { PlanCard } from "@/components/PlanCard";
import { useTheme } from "@/components/ThemeProvider";

const CATS=["Todos","Personas","Mascotas","MedBed"];
const CAT_MAP:Record<string,string>={Personas:"personas",Mascotas:"mascotas",MedBed:"medbed"};

export default function ProductosPage(){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const [cat,setCat]=useState("Todos");
  const filtered=cat==="Todos"?PRODUCTS:PRODUCTS.filter(p=>p.cat===CAT_MAP[cat]);
  return(
    <div>
      <div className="v-header">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          style={{fontSize:22,fontWeight:800,color:txt,marginBottom:14}}>
          Catálogo
        </motion.h1>
        {/* Filtros */}
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              style={{padding:"6px 14px",borderRadius:20,border:"1px solid",flexShrink:0,
                fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .2s",
                background:cat===c?"#f0c040":isDark?"rgba(212,160,23,.08)":"rgba(10,21,100,.06)",
                color:cat===c?"#06080f":isDark?"#6b82b8":"#6b7fa3",
                borderColor:cat===c?"#f0c040":isDark?"rgba(212,160,23,.18)":"rgba(10,21,100,.12)"}}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {/* Imagen catálogo oficial */}
      <div className="v-section" style={{paddingBottom:0}}>
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
          <img src="/catalogo-zuxen.png" alt="Catálogo Zuxen"
            style={{width:"100%",borderRadius:20,border:"1px solid rgba(212,160,23,.2)",
              boxShadow:"0 0 30px rgba(212,160,23,.15)",marginBottom:20}}/>
        </motion.div>
      </div>
      {/* Lista productos */}
      <div className="v-section">
        <div className="v-sec-title">{cat==="Todos"?"Todos los productos":cat}</div>
        {filtered.map((p,i)=>(
          <motion.div key={p.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:.05+i*.06}}>
            <ProductCard product={p}/>
          </motion.div>
        ))}
      </div>
      {/* Planes */}
      <div className="v-section">
        <div className="v-sec-title">Planes de negocio</div>
        {PLANS.map((plan,i)=>(
          <motion.div key={plan.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:.1+i*.08}}>
            <PlanCard plan={plan} featured={plan.id==="plata"}/>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
