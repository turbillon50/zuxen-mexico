"use client";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
export default function ProductosPage(){
  return(
    <div>
      <div className="v-section" style={{paddingTop:20}}>
        <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} style={{fontSize:24,fontWeight:800,marginBottom:4}}>Productos ZUXEN</motion.h1>
        <p style={{fontSize:13,color:"var(--txt-2)",marginBottom:20}}>Precios publicos y de distribuidor activo</p>
        {["personas","mascotas","medbed"].map(cat=>(
          <div key={cat}>
            <div className="v-sec-title">{cat==="personas"?"Para Personas":cat==="mascotas"?"Para Mascotas":"MedBed"}</div>
            {PRODUCTS.filter(p=>p.cat===cat).map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        ))}
      </div>
    </div>
  );
}
