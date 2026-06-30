"use client";
import { motion,AnimatePresence } from "framer-motion";
import { useState } from "react";
const RC:Record<string,string>={Oro:"#f5a623",Plata:"#00c8ff",Bronce:"#b48c50",Nuevo:"#6b7fa3"};
const RG:Record<string,string>={Oro:"rgba(245,166,35,.45)",Plata:"rgba(0,200,255,.45)",Bronce:"rgba(180,140,80,.25)",Nuevo:"transparent"};
type N={id:number;name:string;nivel:string;earn:number;av:string;phone?:string;estado?:string;children:N[]};
const ME:N={id:0,name:"Tu",nivel:"Plata",earn:3840,av:"TU",phone:"+52 442 000 0000",estado:"Queretaro",children:[
  {id:1,name:"Sofia Ramirez",nivel:"Oro",earn:5200,av:"SR",phone:"+52 442 111 2233",estado:"CDMX",children:[
    {id:3,name:"Valentina Rios",nivel:"Bronce",earn:720,av:"VR",phone:"+52 333 444 5566",estado:"Guadalajara",children:[]},
    {id:4,name:"Andres Nava",nivel:"Nuevo",earn:0,av:"AN",phone:"+52 55 7788 9900",estado:"Monterrey",children:[]},
  ]},
  {id:2,name:"Mateo Hernandez",nivel:"Plata",earn:2100,av:"MH",phone:"+52 81 2233 4455",estado:"Monterrey",children:[
    {id:5,name:"Camila Lopez",nivel:"Bronce",earn:480,av:"CL",children:[]},
    {id:6,name:"Diego Morales",nivel:"Nuevo",earn:120,av:"DM",children:[]},
    {id:7,name:"Lucia Torres",nivel:"Nuevo",earn:0,av:"LT",children:[]},
  ]},
  {id:8,name:"Fernanda Cruz",nivel:"Bronce",earn:340,av:"FC",phone:"+52 222 334 4556",estado:"Puebla",children:[
    {id:9,name:"Pablo Ruiz",nivel:"Nuevo",earn:0,av:"PR",children:[]},
  ]},
]};
const FILTROS=["Todos","Oro","Plata","Bronce","Nuevo"];
function Modal({node,onClose}:{node:N;onClose:()=>void}){
  const c=RC[node.nivel]||"#6b7fa3";
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:100,display:"flex",alignItems:"flex-end",backdropFilter:"blur(4px)"}}>
      <motion.div initial={{y:320}} animate={{y:0}} exit={{y:320}}
        transition={{type:"spring",stiffness:320,damping:32}}
        onClick={e=>e.stopPropagation()}
        style={{background:"#0d1220",borderRadius:"20px 20px 0 0",border:"1px solid rgba(0,200,255,.15)",borderBottom:0,
          padding:24,width:"100%",maxWidth:480,paddingBottom:"calc(24px + env(safe-area-inset-bottom))"}}>
        <div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,.1)",margin:"0 auto 20px"}}/>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:20}}>
          <div style={{width:54,height:54,borderRadius:"50%",background:`radial-gradient(135deg,${c}25,rgba(13,18,32,.9))`,
            border:`2px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:13,fontWeight:800,color:c,boxShadow:`0 0 14px ${RG[node.nivel]}`}}>
            {node.av}
          </div>
          <div>
            <div style={{fontSize:16,fontWeight:800}}>{node.name}</div>
            <span className="pill pill-cyan" style={{marginTop:4}}>{node.nivel}</span>
          </div>
        </div>
        {[["Estado",node.estado||"Mexico"],["Telefono",node.phone||"—"],
          ["Ganancias",node.earn>0?"$"+node.earn.toLocaleString("es-MX")+" MXN":"Sin ganancias"],
          ["Red directa",node.children.length+" distribuidores"]].map(([l,v])=>(
          <div key={l} className="v-card-row">
            <span className="v-muted">{l}</span><span style={{fontWeight:600,fontSize:13}}>{v}</span>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <a href={"https://wa.me/"+(node.phone||"").replace(/\D/g,"")}
            style={{flex:1,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",
              borderRadius:14,padding:"13px 0",textAlign:"center",fontWeight:800,fontSize:14,textDecoration:"none",display:"block"}}>
            WhatsApp
          </a>
          <button onClick={onClose}
            style={{flex:1,background:"transparent",color:"#6b7fa3",
              border:"1px solid rgba(0,200,255,.2)",borderRadius:14,padding:13,fontFamily:"inherit",fontWeight:600,fontSize:14}}>
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
function TNode({node,depth=0,index=0,filtro,onSel}:{node:N;depth?:number;index?:number;filtro:string;onSel:(n:N)=>void}){
  const c=RC[node.nivel]||"#6b7fa3";const g=RG[node.nivel]||"transparent";
  const isRoot=depth===0;const dim=filtro!=="Todos"&&node.nivel!==filtro&&!isRoot;
  const sz=isRoot?54:depth===1?44:36;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:dim?.25:1,transition:"opacity .3s"}}>
      <motion.div initial={{opacity:0,scale:.6,y:18}} animate={{opacity:1,scale:1,y:0}}
        transition={{type:"spring",stiffness:280,damping:22,delay:depth*.12+index*.06}}
        whileTap={{scale:.88}} onClick={()=>onSel(node)}
        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",position:"relative"}}>
        <motion.div
          animate={node.earn>0?{boxShadow:["0 0 0 0 rgba(0,200,255,.4)","0 0 0 9px rgba(0,200,255,0)","0 0 0 0 rgba(0,200,255,0)"]}:{}}
          transition={node.earn>0?{repeat:Infinity,duration:2.5}:{}}
          style={{width:sz,height:sz,borderRadius:"50%",background:"radial-gradient(135deg,"+c+"22,rgba(13,18,32,.95))",
            border:"2px solid "+c,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:isRoot?13:11,fontWeight:800,color:c,boxShadow:"0 0 12px "+g,position:"relative"}}>
          {node.av}
          {isRoot&&<div style={{position:"absolute",top:-3,right:-3,width:12,height:12,borderRadius:"50%",
            background:"#00c8ff",boxShadow:"0 0 8px #00c8ff",animation:"pulse-cyan 2s infinite"}}/>}
        </motion.div>
        <div style={{textAlign:"center",maxWidth:76}}>
          <div style={{fontSize:isRoot?12:10,fontWeight:700,color:"#eef2ff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {isRoot?"Tu":node.name.split(" ")[0]}
          </div>
          <div style={{fontSize:9,color:c,fontWeight:600}}>{node.nivel}</div>
          {node.earn>0&&<div style={{fontSize:9,color:"#4ade80"}}>${(node.earn/1000).toFixed(1)}k</div>}
        </div>
      </motion.div>
      {node.children.length>0&&(
        <div style={{display:"flex",gap:6,position:"relative",marginTop:8,paddingTop:16}}>
          <svg style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",overflow:"visible"}} width={2} height={16}>
            <motion.line x1={1} y1={0} x2={1} y2={16} stroke={c+"55"} strokeWidth={1.5}
              initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:depth*.15,duration:.5}}/>
          </svg>
          {node.children.map((ch,i)=><TNode key={ch.id} node={ch} depth={depth+1} index={i} filtro={filtro} onSel={onSel}/>)}
        </div>
      )}
    </div>
  );
}
export function NetworkTree(){
  const [sel,setSel]=useState<N|null>(null);
  const [filtro,setFiltro]=useState("Todos");
  const totalRed=ME.children.reduce((a,n)=>a+1+n.children.length,0);
  const totalEarn=ME.children.reduce((a,n)=>a+n.earn+n.children.reduce((b,c)=>b+c.earn,0),0);
  return(
    <div>
      <div className="kpi-grid">
        <div className="kpi kpi-cyan"><div className="kpi-label">Red total</div><div className="kpi-val">{totalRed}</div><div className="kpi-sub-cyan">distribuidores</div></div>
        <div className="kpi kpi-gold"><div className="kpi-label">Ganancias red</div><div className="kpi-val">${(totalEarn/1000).toFixed(1)}k</div><div className="kpi-sub-gold">este mes</div></div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {FILTROS.map(f=>(
          <button key={f} onClick={()=>setFiltro(f)}
            className={"pill pill-cyan"+(filtro===f?" pill-active":"")}
            style={{border:0,fontFamily:"inherit"}}>{f}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:12,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(RC).map(([r,c])=>(
          <div key={r} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:c,boxShadow:"0 0 4px "+c}}/>
            <span style={{fontSize:10,color:"#6b7fa3"}}>{r}</span>
          </div>
        ))}
      </div>
      <div style={{overflowX:"auto",paddingBottom:8}}>
        <div style={{display:"flex",justifyContent:"center",padding:"8px 24px 24px",minWidth:"max-content"}}>
          <TNode node={ME} filtro={filtro} onSel={setSel}/>
        </div>
      </div>
      <p style={{textAlign:"center",fontSize:11,color:"#6b7fa3",marginTop:4}}>Toca un nodo para ver detalles</p>
      <AnimatePresence>{sel&&<Modal node={sel} onClose={()=>setSel(null)}/>}</AnimatePresence>
    </div>
  );
}
