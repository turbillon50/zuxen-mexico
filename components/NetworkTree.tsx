"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ─── Paleta ─────────────────────────────────────────────────── */
const C = {
  cyan:   "#00c8ff",
  gold:   "#f5a623",
  green:  "#4ade80",
  red:    "#ff4d6d",
  void:   "#06080f",
  surf:   "rgba(255,255,255,0.07)",
  surfHi: "rgba(255,255,255,0.13)",
  border: "rgba(0,200,255,0.18)",
};

/* ─── Rangos ──────────────────────────────────────────────────── */
const RANK: Record<string,{color:string;glow:string;label:string}> = {
  Oro:    { color:"#f5a623", glow:"rgba(245,166,35,.5)",   label:"ORO"    },
  Plata:  { color:"#00c8ff", glow:"rgba(0,200,255,.45)",   label:"PLATA"  },
  Bronce: { color:"#cd7f32", glow:"rgba(205,127,50,.4)",   label:"BRONCE" },
  Nuevo:  { color:"#8b9fd4", glow:"rgba(139,159,212,.3)",  label:"NUEVO"  },
};

/* ─── Tipos & datos demo ──────────────────────────────────────── */
type N = {
  id:number; name:string; nivel:string; earn:number;
  av:string; phone?:string; estado?:string; children:N[];
};

const ME:N = {
  id:0, name:"Tu", nivel:"Plata", earn:3840, av:"TU",
  phone:"+52 442 000 0000", estado:"Queretaro",
  children:[
    { id:1, name:"Sofia Ramirez",    nivel:"Oro",    earn:5200, av:"SR",
      phone:"+52 442 111 2233", estado:"CDMX",
      children:[
        { id:3, name:"Valentina Rios", nivel:"Bronce", earn:720, av:"VR",
          phone:"+52 333 444 5566", estado:"Guadalajara", children:[] },
        { id:4, name:"Andres Nava",    nivel:"Nuevo",  earn:0,   av:"AN",
          estado:"Monterrey", children:[] },
      ]},
    { id:2, name:"Mateo Hernandez",  nivel:"Plata",  earn:2100, av:"MH",
      phone:"+52 81 2233 4455", estado:"Monterrey",
      children:[
        { id:5, name:"Camila Lopez",  nivel:"Bronce", earn:480, av:"CL", children:[] },
        { id:6, name:"Diego Morales", nivel:"Nuevo",  earn:120, av:"DM", children:[] },
        { id:7, name:"Lucia Torres",  nivel:"Nuevo",  earn:0,   av:"LT", children:[] },
      ]},
    { id:8, name:"Fernanda Cruz",    nivel:"Bronce", earn:340, av:"FC",
      phone:"+52 222 334 4556", estado:"Puebla",
      children:[
        { id:9, name:"Pablo Ruiz",    nivel:"Nuevo",  earn:0,   av:"PR", children:[] },
      ]},
  ],
};

const FILTROS = ["Todos","Oro","Plata","Bronce","Nuevo"];

/* ─── Modal de detalle ────────────────────────────────────────── */
function NodeModal({ node, onClose }: { node:N; onClose:()=>void }) {
  const r = RANK[node.nivel] ?? RANK.Nuevo;
  const rows:[string,string][] = [
    ["Estado",      node.estado || "México"],
    ["Teléfono",    node.phone  || "—"],
    ["Ganancias",   node.earn > 0 ? `$${node.earn.toLocaleString("es-MX")} MXN` : "Sin ganancias"],
    ["Red directa", `${node.children.length} distribuidores`],
  ];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}
      style={{position:"fixed",inset:0,zIndex:200,
        background:"rgba(0,0,0,.72)",backdropFilter:"blur(8px)",
        display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <motion.div
        initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}
        transition={{type:"spring",stiffness:340,damping:34}}
        onClick={e=>e.stopPropagation()}
        style={{width:"100%",maxWidth:480,
          background:"linear-gradient(160deg,#0e1830,#06080f)",
          borderRadius:"28px 28px 0 0",
          border:`1.5px solid ${r.color}44`,borderBottom:"none",
          padding:"24px 24px calc(32px + env(safe-area-inset-bottom))"}}>

        {/* handle */}
        <div style={{width:44,height:5,borderRadius:3,
          background:"rgba(255,255,255,.15)",margin:"0 auto 24px"}}/>

        {/* cabecera */}
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:24}}>
          <div style={{width:64,height:64,borderRadius:"50%",flexShrink:0,
            background:`radial-gradient(135deg,${r.color}28,transparent)`,
            border:`3px solid ${r.color}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:16,fontWeight:900,color:r.color,
            boxShadow:`0 0 24px ${r.glow}`}}>
            {node.av}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:6}}>
              {node.name}
            </div>
            <span style={{display:"inline-block",padding:"4px 12px",borderRadius:20,
              background:`${r.color}22`,color:r.color,
              fontSize:11,fontWeight:700,letterSpacing:1,
              border:`1px solid ${r.color}44`}}>
              {r.label}
            </span>
          </div>
        </div>

        {/* filas */}
        {rows.map(([label,val])=>(
          <div key={label} style={{display:"flex",justifyContent:"space-between",
            alignItems:"center",padding:"12px 0",
            borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <span style={{color:"#8b9fd4",fontSize:13}}>{label}</span>
            <span style={{fontWeight:700,fontSize:13,color:
              label==="Ganancias"&&node.earn>0 ? C.green : "#fff"}}>{val}</span>
          </div>
        ))}

        {/* botones */}
        <div style={{display:"flex",gap:12,marginTop:24}}>
          {node.phone && (
            <a href={`https://wa.me/${(node.phone).replace(/\D/g,"")}`}
              style={{flex:1,background:"linear-gradient(135deg,#25d366,#128c7e)",
                color:"#fff",borderRadius:16,padding:"15px 0",textAlign:"center",
                fontWeight:800,fontSize:14,textDecoration:"none",display:"block"}}>
              WhatsApp
            </a>
          )}
          <button onClick={onClose}
            style={{flex:1,background:"rgba(255,255,255,.06)",color:"#8b9fd4",
              border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:15,
              fontFamily:"inherit",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Nodo del árbol ──────────────────────────────────────────── */
const SZ = [86, 68, 54] as const;

function TNode({
  node, depth=0, index=0, filtro, onSel,
}:{
  node:N; depth?:number; index?:number; filtro:string; onSel:(n:N)=>void;
}) {
  const r    = RANK[node.nivel] ?? RANK.Nuevo;
  const isRoot = depth===0;
  const dim  = filtro!=="Todos" && node.nivel!==filtro && !isRoot;
  const sz   = SZ[Math.min(depth,2) as 0|1|2];

  /* refs para calcular posición de líneas SVG */
  const selfRef  = useRef<HTMLDivElement>(null);
  const childRefs = useRef<(HTMLDivElement|null)[]>([]);

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",
      opacity:dim?0.18:1,transition:"opacity .35s",position:"relative"}}>

      {/* — Nodo — */}
      <motion.div
        initial={{opacity:0,scale:.4,y:20}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{type:"spring",stiffness:280,damping:22,delay:depth*.12+index*.06}}
        whileTap={{scale:.87}}
        onClick={()=>onSel(node)}
        style={{display:"flex",flexDirection:"column",alignItems:"center",
          gap:7,cursor:"pointer",position:"relative",zIndex:2}}>

        {/* halo pulsante */}
        {node.earn>0 && (
          <motion.div
            animate={{scale:[1,1.5,1],opacity:[.4,0,.4]}}
            transition={{repeat:Infinity,duration:2.6,ease:"easeOut"}}
            style={{position:"absolute",
              width:sz+16,height:sz+16,borderRadius:"50%",
              background:`${r.color}20`,top:-8,left:-8,pointerEvents:"none"}}/>
        )}

        {/* círculo */}
        <motion.div
          ref={selfRef}
          animate={isRoot?{
            boxShadow:[
              `0 0 0 0 ${r.color}70`,
              `0 0 0 14px ${r.color}00`,
            ],
          }:{}}
          transition={isRoot?{repeat:Infinity,duration:2.4}:{}}
          style={{
            width:sz,height:sz,borderRadius:"50%",
            background:isRoot
              ? `radial-gradient(135deg,${r.color}30 0%,rgba(0,0,0,.4) 100%)`
              : C.surf,
            border:`${isRoot?3:2.5}px solid ${r.color}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:isRoot?15:depth===1?13:11,fontWeight:900,color:"#fff",
            boxShadow:`0 0 ${isRoot?28:16}px ${r.glow}, 0 4px 12px rgba(0,0,0,.5)`,
            backdropFilter:"blur(10px)",
            position:"relative",
            userSelect:"none",
          }}>
          {node.av}
          {/* punto online root */}
          {isRoot && (
            <div style={{position:"absolute",top:-2,right:-2,
              width:14,height:14,borderRadius:"50%",
              background:"#00ff88",
              boxShadow:"0 0 10px #00ff88",
              border:"2.5px solid #06080f"}}/>
          )}
        </motion.div>

        {/* labels */}
        <div style={{textAlign:"center",width:sz+24}}>
          <div style={{fontSize:isRoot?13:depth===1?12:10,fontWeight:700,
            color:"#fff",whiteSpace:"nowrap",
            overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.2}}>
            {isRoot?"Tú":node.name.split(" ")[0]}
          </div>
          <div style={{
            marginTop:3,display:"inline-block",
            padding:"2px 8px",borderRadius:10,
            background:`${r.color}22`,
            border:`1px solid ${r.color}50`,
            fontSize:9,fontWeight:800,color:r.color,letterSpacing:.8}}>
            {r.label}
          </div>
          {node.earn>0 && (
            <div style={{fontSize:10,color:C.green,
              marginTop:3,fontWeight:700}}>
              +${(node.earn/1000).toFixed(1)}k
            </div>
          )}
        </div>
      </motion.div>

      {/* — Rama hijos — */}
      {node.children.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:4}}>
          {/* línea vertical central */}
          <svg width="2" height="32" style={{display:"block"}}>
            <defs>
              <linearGradient id={`vg${node.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={r.color} stopOpacity=".9"/>
                <stop offset="100%" stopColor={C.gold}  stopOpacity=".6"/>
              </linearGradient>
            </defs>
            <line x1="1" y1="0" x2="1" y2="32"
              stroke={`url(#vg${node.id})`} strokeWidth="2.5"/>
          </svg>

          {/* fila de hijos */}
          <div style={{display:"flex",gap:16,alignItems:"flex-start",
            position:"relative"}}>

            {/* línea horizontal que conecta hijos */}
            {node.children.length>1 && (
              <svg
                style={{position:"absolute",top:0,left:0,
                  width:"100%",height:"2px",overflow:"visible",pointerEvents:"none"}}>
                <defs>
                  <linearGradient id={`hg${node.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor={r.color} stopOpacity=".0"/>
                    <stop offset="30%"  stopColor={r.color} stopOpacity=".9"/>
                    <stop offset="70%"  stopColor={C.gold}  stopOpacity=".9"/>
                    <stop offset="100%" stopColor={C.gold}  stopOpacity=".0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="1" x2="100%" y2="1"
                  stroke={`url(#hg${node.id})`} strokeWidth="2"/>
              </svg>
            )}

            {node.children.map((child,i)=>(
              <div key={child.id} ref={el=>{childRefs.current[i]=el}}
                style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                {/* línea vertical hacia hijo */}
                <svg width="2" height="22" style={{display:"block"}}>
                  <line x1="1" y1="0" x2="1" y2="22"
                    stroke={RANK[child.nivel]?.color ?? C.cyan}
                    strokeWidth="2" strokeOpacity=".75"/>
                </svg>
                <TNode node={child} depth={depth+1} index={i}
                  filtro={filtro} onSel={onSel}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Componente principal ────────────────────────────────────── */
export function NetworkTree({ isDark }: { isDark:boolean }) {
  const [filtro, setFiltro]   = useState("Todos");
  const [selected, setSelected] = useState<N|null>(null);

  /* stats rápidas */
  const total  = 1 + ME.children.reduce((a,c)=>a+1+c.children.length,0);
  const ganado = ME.earn + ME.children.reduce((a,c)=>a+c.earn+c.children.reduce((b,cc)=>b+cc.earn,0),0);

  return (
    <div style={{position:"relative"}}>

      {/* — Stats strip — */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
        gap:10,marginBottom:20}}>
        {[
          ["Red total",  `${total} nodos`,               C.cyan],
          ["Ganancias",  `$${(ganado/1000).toFixed(1)}k`, C.green],
          ["Tu rango",   "PLATA",                         C.gold],
        ].map(([l,v,col])=>(
          <div key={l as string}
            style={{background:C.surf,border:`1px solid ${col as string}30`,
              borderRadius:14,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontSize:16,fontWeight:800,color:col as string}}>{v}</div>
            <div style={{fontSize:10,color:"#8b9fd4",marginTop:3,letterSpacing:.5}}>{l}</div>
          </div>
        ))}
      </div>

      {/* — Filtros — */}
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:24,
        scrollbarWidth:"none"}}>
        {FILTROS.map(f=>{
          const active = f===filtro;
          const col = f==="Todos"?C.cyan : (RANK[f]?.color??C.cyan);
          return (
            <button key={f} onClick={()=>setFiltro(f)}
              style={{flexShrink:0,padding:"7px 16px",borderRadius:20,
                fontFamily:"inherit",fontWeight:700,fontSize:12,cursor:"pointer",
                letterSpacing:.6,transition:"all .2s",
                border:`1.5px solid ${active?col:"rgba(255,255,255,.12)"}`,
                background: active?`${col}22`:"transparent",
                color:active?col:"#8b9fd4"}}>
              {f}
            </button>
          );
        })}
      </div>

      {/* — Árbol con scroll horizontal — */}
      <div style={{overflowX:"auto",overflowY:"visible",
        padding:"12px 16px 32px",
        background:"linear-gradient(160deg,rgba(0,200,255,.04),rgba(245,166,35,.03),transparent)",
        borderRadius:20,
        border:"1px solid rgba(0,200,255,.1)",
        scrollbarWidth:"none",
        WebkitOverflowScrolling:"touch"}}>
        <div style={{minWidth:"fit-content",display:"flex",
          justifyContent:"center",paddingTop:8}}>
          <TNode node={ME} filtro={filtro} onSel={setSelected}/>
        </div>
      </div>

      {/* — Leyenda — */}
      <div style={{display:"flex",gap:16,flexWrap:"wrap",
        marginTop:18,paddingLeft:4}}>
        {Object.entries(RANK).map(([k,v])=>(
          <div key={k} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:10,height:10,borderRadius:"50%",
              background:v.color,boxShadow:`0 0 6px ${v.glow}`}}/>
            <span style={{fontSize:11,color:"#8b9fd4",fontWeight:600}}>{v.label}</span>
          </div>
        ))}
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:C.green}}/>
          <span style={{fontSize:11,color:"#8b9fd4",fontWeight:600}}>Con ganancias</span>
        </div>
      </div>

      {/* — Modal — */}
      <AnimatePresence>
        {selected && (
          <NodeModal node={selected} onClose={()=>setSelected(null)}/>
        )}
      </AnimatePresence>
    </div>
  );
}
