"use client";
import { motion } from "framer-motion";

const RANK_COLOR:Record<string,string>={
  "Oro":"#f5a623","Plata":"#00c8ff","Bronce":"rgba(180,140,80,.9)","Nuevo":"#6b7fa3"
};
const RANK_GLOW:Record<string,string>={
  "Oro":"rgba(245,166,35,.5)","Plata":"rgba(0,200,255,.5)","Bronce":"rgba(180,140,80,.3)","Nuevo":"transparent"
};

const ME={id:0,name:"Tú",nivel:"Plata",earn:3840,av:"TÚ",children:[
  {id:1,name:"Sofía Ramírez",nivel:"Oro",earn:5200,av:"SR",children:[
    {id:3,name:"Valentina Ríos",nivel:"Bronce",earn:720,av:"VR",children:[]},
    {id:4,name:"Andrés Nava",nivel:"Nuevo",earn:0,av:"AN",children:[]},
  ]},
  {id:2,name:"Mateo Hernández",nivel:"Plata",earn:2100,av:"MH",children:[
    {id:5,name:"Camila López",nivel:"Bronce",earn:480,av:"CL",children:[]},
    {id:6,name:"Diego Morales",nivel:"Nuevo",earn:120,av:"DM",children:[]},
    {id:7,name:"Lucía Torres",nivel:"Nuevo",earn:0,av:"LT",children:[]},
  ]},
  {id:8,name:"Fernanda Cruz",nivel:"Bronce",earn:340,av:"FC",children:[
    {id:9,name:"Pablo Ruiz",nivel:"Nuevo",earn:0,av:"PR",children:[]},
  ]},
]};

type Node={id:number;name:string;nivel:string;earn:number;av:string;children:Node[]};
function TreeNode({node,depth=0,index=0}:{node:Node;depth?:number;index?:number}){
  const color=RANK_COLOR[node.nivel]||"#6b7fa3";
  const glow=RANK_GLOW[node.nivel]||"transparent";
  const isRoot=depth===0;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <motion.div
        initial={{opacity:0,scale:.6,y:20}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{type:"spring",stiffness:300,damping:22,delay:depth*.15+index*.07}}
        whileTap={{scale:.93}}
        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
          cursor:"pointer",position:"relative"}}>
        {/* Avatar */}
        <motion.div
          animate={isRoot?{boxShadow:["0 0 0 0 rgba(0,200,255,.5)","0 0 0 10px rgba(0,200,255,0)","0 0 0 0 rgba(0,200,255,0)"]}:{}}
          transition={isRoot?{repeat:Infinity,duration:2.4,ease:"easeOut"}:{}}
          style={{width:isRoot?52:depth===1?42:34,height:isRoot?52:depth===1?42:34,
            borderRadius:"50%",background:`radial-gradient(135deg,${color}33,rgba(13,18,32,.9))`,
            border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:isRoot?12:depth===1?11:10,fontWeight:800,color,
            boxShadow:`0 0 12px ${glow}`,position:"relative"}}>
          {node.av}
          {isRoot&&(
            <div style={{position:"absolute",top:-3,right:-3,width:12,height:12,
              borderRadius:"50%",background:"#00c8ff",
              boxShadow:"0 0 8px #00c8ff",animation:"pulse-cyan 2s infinite"}}/>
          )}
        </motion.div>
        {/* Info */}
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:isRoot?13:depth===1?12:10,fontWeight:700,
            color:"#eef2ff",whiteSpace:"nowrap",maxWidth:80,overflow:"hidden",
            textOverflow:"ellipsis"}}>{isRoot?"Tú":node.name.split(" ")[0]}</div>
          <div style={{fontSize:9,color,fontWeight:600,letterSpacing:.5}}>{node.nivel}</div>
          {node.earn>0&&(
            <div style={{fontSize:9,color:"#4ade80",marginTop:1}}>
              ${node.earn.toLocaleString("es-MX")}
            </div>
          )}
        </div>
      </motion.div>
      {/* Hijos */}
      {node.children.length>0&&(
        <div style={{display:"flex",gap:8,position:"relative",marginTop:8,paddingTop:16}}>
          {/* Línea vertical desde nodo padre */}
          <svg style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",overflow:"visible"}}
            width={2} height={16}>
            <motion.line x1={1} y1={0} x2={1} y2={16} stroke="rgba(0,200,255,.3)" strokeWidth={1.5}
              initial={{pathLength:0}} animate={{pathLength:1}}
              transition={{delay:depth*.2,duration:.5}}/>
          </svg>
          {/* Línea horizontal conectora */}
          {node.children.length>1&&(
            <svg style={{position:"absolute",top:16,left:"50%",overflow:"visible",
              transform:`translateX(calc(-50%))`}}
              width={Math.max((node.children.length-1)*64,1)} height={1}>
              <motion.line x1={0} y1={0} x2={(node.children.length-1)*64} y2={0}
                stroke="rgba(0,200,255,.2)" strokeWidth={1}
                initial={{pathLength:0}} animate={{pathLength:1}}
                transition={{delay:depth*.2+.2,duration:.5}}/>
            </svg>
          )}
          {node.children.map((child,i)=>(
            <TreeNode key={child.id} node={child} depth={depth+1} index={i}/>
          ))}
        </div>
      )}
    </div>
  );
}

export function NetworkTree(){
  return(
    <div style={{overflowX:"auto",paddingBottom:16}}>
      {/* Leyenda */}
      <div style={{display:"flex",gap:12,padding:"0 18px 16px",flexWrap:"wrap"}}>
        {Object.entries(RANK_COLOR).map(([rank,color])=>(
          <div key={rank} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:color,
              boxShadow:`0 0 4px ${color}`}}/>
            <span style={{fontSize:10,color:"#6b7fa3"}}>{rank}</span>
          </div>
        ))}
      </div>
      {/* Árbol */}
      <div style={{display:"flex",justifyContent:"center",padding:"8px 24px 24px",
        minWidth:"max-content"}}>
        <TreeNode node={ME}/>
      </div>
    </div>
  );
}
