"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const RANK_STYLE:Record<string,{color:string;glow:string;icon:string}>={
  Oro:{color:"#f0c040",glow:"rgba(240,192,64,.55)",icon:"🧁"},
  Plata:{color:"#00e5ff",glow:"rgba(0,229,255,.5)",icon:"🧁"},
  Bronce:{color:"#b48c50",glow:"rgba(180,140,80,.4)",icon:"🧁"},
  Nuevo:{color:"#6b82b8",glow:"rgba(107,130,184,.25)",icon:"🟣"},
};

type N={id:number;name:string;nivel:string;earn:number;av:string;phone?:string;estado?:string;children:N[]};

const ME:N={id:0,name:"Tu",nivel:"Plata",earn:3840,av:"TU",phone:"+52 442 000 0000",estado:"Queretaro",children:[
  {id:1,name:"Sofia Ramirez",nivel:"Oro",earn:5200,av:"SR",phone:"+52 442 111 2233",estado:"CDMX",children:[
    {id:3,name:"Valentina Rios",nivel:"Bronce",earn:720,av:"VR",phone:"+52 333 444 5566",estado:"Guadalajara",children:[]},
    {id:4,name:"Andres Nava",nivel:"Nuevo",earn:0,av:"AN",estado:"Monterrey",children:[]},
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

function NodeModal({node,onClose,isDark}:{node:N;onClose:()=>void;isDark:boolean}){
  const s=RANK_STYLE[node.nivel]||RANK_STYLE.Nuevo;
  const bg=isDark?"#0d1535":"#f8f9ff";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const txt2=isDark?"#6b82b8":"#6b7fa3";
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:100,
        display:"flex",alignItems:"flex-end",backdropFilter:"blur(6px)"}}>
      <motion.div initial={{y:320}} animate={{y:0}} exit={{y:320}}
        transition={{type:"spring",stiffness:340,damping:34}}
        onClick={e=>e.stopPropagation()}
        style={{background:bg,borderRadius:"24px 24px 0 0",
          border:"1px solid "+s.color+"33",borderBottom:0,
          padding:24,width:"100%",maxWidth:480,
          paddingBottom:"calc(24px + env(safe-area-inset-bottom))"}}>
        <div style={{width:40,height:4,borderRadius:2,background:"rgba(107,130,184,.25)",margin:"0 auto 22px"}}/>
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:20}}>
          <div style={{width:58,height:58,borderRadius:"50%",flexShrink:0,
            background:"radial-gradient(135deg,"+s.color+"22,transparent)",
            border:"2.5px solid "+s.color,display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:14,fontWeight:800,color:s.color,
            boxShadow:"0 0 18px "+s.glow}}>
            {node.av}
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:txt}}>{node.name}</div>
            <span style={{display:"inline-block",marginTop:5,padding:"3px 10px",
              borderRadius:20,background:s.color+"18",color:s.color,
              fontSize:11,fontWeight:700,border:"1px solid "+s.color+"30"}}>
              {node.nivel}
            </span>
          </div>
        </div>
        {[["Estado",node.estado||"Mexico"],["Telefono",node.phone||"—"],
          ["Ganancias",node.earn>0?"$"+node.earn.toLocaleString("es-MX")+" MXN":"Sin ganancias"],
          ["Red directa",node.children.length+" distribuidores"]].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
            padding:"11px 0",borderBottom:"1px solid rgba(107,130,184,.12)"}}>
            <span style={{color:txt2,fontSize:13}}>{l}</span>
            <span style={{fontWeight:700,fontSize:13,color:txt}}>{v}</span>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:22}}>
          <a href={"https://wa.me/"+(node.phone||"").replace(/\D/g,"")}
            style={{flex:1,background:"linear-gradient(135deg,#25d366,#128c7e)",color:"#fff",
              borderRadius:14,padding:"14px 0",textAlign:"center",fontWeight:800,fontSize:14,
              textDecoration:"none",display:"block"}}>
            WhatsApp
          </a>
          <button onClick={onClose}
            style={{flex:1,background:"transparent",color:txt2,
              border:"1px solid rgba(107,130,184,.25)",borderRadius:14,padding:14,
              fontFamily:"inherit",fontWeight:600,fontSize:14}}>
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const NODE_W={0:72,1:60,2:50};

function TNode({node,depth=0,index=0,filtro,onSel,isDark}:{
  node:N;depth?:number;index?:number;filtro:string;onSel:(n:N)=>void;isDark:boolean
}){
  const s=RANK_STYLE[node.nivel]||RANK_STYLE.Nuevo;
  const isRoot=depth===0;
  const dim=filtro!=="Todos"&&node.nivel!==filtro&&!isRoot;
  const sz=(NODE_W[depth as 0|1|2]||42) as number;
  const surface=isDark?"rgba(11,21,53,.9)":"rgba(255,255,255,.9)";
  const txt=isDark?"#e8eeff":"#1a1f3a";

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",
      opacity:dim?.2:1,transition:"opacity .3s"}}>
      <motion.div
        initial={{opacity:0,scale:.5,y:24}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{type:"spring",stiffness:300,damping:24,delay:depth*.1+index*.05}}
        whileTap={{scale:.88}}
        onClick={()=>onSel(node)}
        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
          cursor:"pointer",position:"relative"}}>
        {/* Halo pulsante en activos con ganancias */}
        {node.earn>0&&(
          <motion.div
            animate={{scale:[1,1.35,1],opacity:[.5,0,.5]}}
            transition={{repeat:Infinity,duration:2.4,ease:"easeOut"}}
            style={{position:"absolute",width:sz+12,height:sz+12,borderRadius:"50%",
              background:s.color+"22",top:-6,left:-6,pointerEvents:"none"}}/>
        )}
        {/* Avatar */}
        <motion.div
          animate={isRoot?{boxShadow:["0 0 0 0 "+s.color+"60","0 0 0 10px "+s.color+"00"]}:{}}
          transition={isRoot?{repeat:Infinity,duration:2.2}:{}}
          style={{width:sz,height:sz,borderRadius:"50%",
            background:surface,
            border:"2.5px solid "+s.color,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:isRoot?14:depth===1?12:10,fontWeight:800,color:s.color,
            boxShadow:"0 0 16px "+s.glow+", 0 2px 8px rgba(0,0,0,.3)",
            position:"relative",backdropFilter:"blur(8px)"}}>
          {node.av}
          {isRoot&&(
            <div style={{position:"absolute",top:-3,right:-3,width:13,height:13,
              borderRadius:"50%",background:"#00ff88",
              boxShadow:"0 0 8px #00ff88",border:"2px solid "+surface}}/>
          )}
        </motion.div>
        {/* Label */}
        <div style={{textAlign:"center",maxWidth:sz+20}}>
          <div style={{fontSize:isRoot?12:depth===1?11:10,fontWeight:700,color:txt,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {isRoot?"Tu":node.name.split(" ")[0]}
          </div>
          <div style={{fontSize:9,color:s.color,fontWeight:700,letterSpacing:.5,marginTop:1}}>
            {node.nivel}
          </div>
          {node.earn>0&&(
            <div style={{fontSize:9,color:"#00ff88",marginTop:1,fontWeight:600}}>
              ${(node.earn/1000).toFixed(1)}k
            </div>
          )}
        </div>
      </motion.div>

      {/* Hijos con líneas limpias */}
      {node.children.length>0&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          {/* Linea vertical */}
          <motion.div
            initial={{height:0}} animate={{height:20}}
            transition={{delay:depth*.1+.1,duration:.3}}
            style={{width:2,background:"linear-gradient(180deg,"+s.color+"80,"+s.color+"30)",
              borderRadius:1}}/>
          {/* Linea horizontal + hijos */}
          <div style={{position:"relative",display:"flex",gap:8,alignItems:"flex-start"}}>
            {node.children.length>1&&(
              <div style={{position:"absolute",top:0,left:"50%",
                transform:"translateX(-50%)",
                width:"calc(100% - "+(sz/2)+"px)",height:2,
                background:"linear-gradient(90deg,transparent,"+s.color+"40,transparent)",
                borderRadius:1}}/>
            )}
            {node.children.map((ch,i)=>(
              <div key={ch.id} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <motion.div initial={{height:0}} animate={{height:16}}
                  transition={{delay:depth*.1+i*.04+.2,duration:.3}}
                  style={{width:2,background:RANK_STYLE[ch.nivel]?.color+"50"||"#6b82b850",borderRadius:1}}/>
                <TNode node={ch} depth={depth+1} index={i}
                  filtro={filtro} onSel={onSel} isDark={isDark}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NetworkTree({isDark}:{isDark:boolean}){
  const [sel,setSel]=useState<N|null>(null);
  const [filtro,setFiltro]=useState("Todos");
  const totalRed=ME.children.reduce((a,n)=>a+1+n.children.length,0);
  const totalEarn=ME.children.reduce((a,n)=>a+n.earn+n.children.reduce((b,c)=>b+c.earn,0),0);
  const border=isDark?"rgba(212,160,23,.15)":"rgba(10,21,100,.1)";
  const txt=isDark?"#e8eeff":"#1a1f3a";
  const txt2=isDark?"#6b82b8":"#6b7fa3";
  const kpiSurf=isDark?"rgba(11,21,53,.8)":"rgba(255,255,255,.85)";

  return(
    <div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <div style={{background:kpiSurf,border:"1px solid rgba(212,160,23,.25)",
          backdropFilter:"blur(12px)",borderRadius:18,padding:16}}>
          <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Red total</div>
          <div style={{fontSize:24,fontWeight:900,color:txt}}>{totalRed}</div>
          <div style={{fontSize:11,color:"#00e5ff",marginTop:2}}>distribuidores</div>
        </div>
        <div style={{background:kpiSurf,border:"1px solid rgba(212,160,23,.25)",
          backdropFilter:"blur(12px)",borderRadius:18,padding:16}}>
          <div style={{fontSize:10,color:txt2,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Ganancias red</div>
          <div style={{fontSize:24,fontWeight:900,color:txt}}>${(totalEarn/1000).toFixed(1)}k</div>
          <div style={{fontSize:11,color:"#f0c040",marginTop:2}}>este mes</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        {FILTROS.map(f=>{
          const active=filtro===f;
          return(
            <button key={f} onClick={()=>setFiltro(f)}
              style={{padding:"5px 12px",borderRadius:20,border:"1px solid",
                fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer",
                transition:"all .2s",
                background:active?"#f0c040":isDark?"rgba(212,160,23,.08)":"rgba(10,21,100,.06)",
                color:active?"#06080f":txt2,
                borderColor:active?"#f0c040":isDark?"rgba(212,160,23,.2)":"rgba(10,21,100,.12)"}}>
              {f}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{display:"flex",gap:14,marginBottom:20,flexWrap:"wrap"}}>
        {Object.entries(RANK_STYLE).map(([r,s])=>(
          <div key={r} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:s.color,
              boxShadow:"0 0 5px "+s.color}}/>
            <span style={{fontSize:11,color:txt2,fontWeight:600}}>{r}</span>
          </div>
        ))}
      </div>

      {/* Arbol NITIDO */}
      <div style={{overflowX:"auto",overflowY:"visible",paddingBottom:24,
        WebkitOverflowScrolling:"touch"}}>
        <div style={{display:"flex",justifyContent:"center",
          padding:"12px 32px 32px",minWidth:"max-content"}}>
          <TNode node={ME} filtro={filtro} onSel={setSel} isDark={isDark}/>
        </div>
      </div>

      <p style={{textAlign:"center",fontSize:11,color:txt2,marginTop:4,marginBottom:8}}>
        Toca un nodo para ver detalles y WhatsApp
      </p>

      <AnimatePresence>
        {sel&&<NodeModal node={sel} onClose={()=>setSel(null)} isDark={isDark}/>}
      </AnimatePresence>
    </div>
  );
}
