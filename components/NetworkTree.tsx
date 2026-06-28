"use client";
import { motion } from "framer-motion";
const NODES=[
  {id:1,name:"Sofia Ramirez",nivel:"Plata",earn:3840,l:0,av:"SR"},
  {id:2,name:"Mateo Hernandez",nivel:"Bronce",earn:740,l:1,av:"MH"},
  {id:3,name:"Valentina Rios",nivel:"Bronce",earn:200,l:2,av:"VR"},
  {id:4,name:"Camila Lopez",nivel:"Plata",earn:1100,l:1,av:"CL"},
  {id:5,name:"Diego Morales",nivel:"Bronce",earn:480,l:1,av:"DM"},
  {id:6,name:"Andres Navarro",nivel:"Bronce",earn:360,l:2,av:"AN"},
  {id:7,name:"Lucia Torres",nivel:"Nuevo",earn:0,l:1,av:"LT"},
];
export function NetworkTree(){
  return(
    <div>
      {NODES.map((node,i)=>(
        <motion.div key={node.id}
          initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}}
          viewport={{once:true}} transition={{delay:i*.06,duration:.3}}
          style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
            background:"var(--surface)",border:"1px solid var(--border)",
            borderRadius:12,marginBottom:8,
            marginLeft:node.l===0?0:node.l===1?28:56}}>
          <div style={{width:34,height:34,borderRadius:"50%",
            background:"linear-gradient(135deg,#fff,#aab)",display:"flex",
            alignItems:"center",justifyContent:"center",
            fontSize:11,fontWeight:800,color:"#08080c",flexShrink:0}}>
            {node.av}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600}}>{node.name}</div>
            <div style={{fontSize:11,color:"var(--txt-2)"}}>{node.nivel}</div>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:"#4ade80"}}>
            {node.earn>0?(("$")+node.earn.toLocaleString("es-MX")+"/mes"):"Sin ganancias"}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
