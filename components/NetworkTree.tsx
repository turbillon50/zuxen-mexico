"use client";
import { useState, useRef, useEffect, useCallback } from "react";

type Rank="bronce"|"plata"|"oro"|"none";
interface Node{id:string;name:string;rank:Rank;sales:number;children:Node[];active:boolean}

const RANK_COLOR:Record<Rank,string>={bronce:"#ff6600",plata:"#00ffff",oro:"#ffd700",none:"#4060a0"};
const RANK_GLOW:Record<Rank,string>={bronce:"rgba(255,102,0,.7)",plata:"rgba(0,255,255,.7)",oro:"rgba(255,215,0,.8)",none:"rgba(64,96,160,.4)"};
const RANK_LABEL:Record<Rank,string>={bronce:"🥉",plata:"🥈",oro:"🥇",none:"·"};

const TREE:Node={
  id:"root",name:"Tú",rank:"plata",sales:4820,active:true,
  children:[
    {id:"a1",name:"Mateo H.",rank:"bronce",sales:1240,active:true,children:[
      {id:"a1a",name:"Luisa R.",rank:"none",sales:320,active:true,children:[
        {id:"a1a1",name:"Omar V.",rank:"none",sales:180,active:false,children:[]},
        {id:"a1a2",name:"Tania P.",rank:"none",sales:210,active:true,children:[]},
      ]},
      {id:"a1b",name:"Diego M.",rank:"none",sales:480,active:true,children:[
        {id:"a1b1",name:"Fer C.",rank:"none",sales:90,active:false,children:[]},
      ]},
      {id:"a1c",name:"Vane S.",rank:"none",sales:200,active:false,children:[]},
    ]},
    {id:"a2",name:"Sofia L.",rank:"oro",sales:8400,active:true,children:[
      {id:"a2a",name:"Carlos N.",rank:"bronce",sales:1100,active:true,children:[
        {id:"a2a1",name:"Ana G.",rank:"none",sales:400,active:true,children:[]},
        {id:"a2a2",name:"Pedro T.",rank:"none",sales:290,active:true,children:[]},
        {id:"a2a3",name:"Iris F.",rank:"none",sales:150,active:false,children:[]},
      ]},
      {id:"a2b",name:"Mariana O.",rank:"bronce",sales:900,active:true,children:[
        {id:"a2b1",name:"Rafa B.",rank:"none",sales:310,active:true,children:[]},
        {id:"a2b2",name:"Gaby V.",rank:"none",sales:180,active:false,children:[]},
      ]},
    ]},
    {id:"a3",name:"Camila R.",rank:"bronce",sales:1860,active:true,children:[
      {id:"a3a",name:"Beto C.",rank:"none",sales:440,active:true,children:[
        {id:"a3a1",name:"Nora A.",rank:"none",sales:120,active:true,children:[]},
      ]},
      {id:"a3b",name:"Eli M.",rank:"none",sales:280,active:false,children:[]},
    ]},
    {id:"a4",name:"Kevin P.",rank:"none",sales:640,active:true,children:[
      {id:"a4a",name:"Dana R.",rank:"none",sales:200,active:true,children:[]},
    ]},
    {id:"a5",name:"Valeria T.",rank:"none",sales:310,active:false,children:[]},
  ]
};

// Posiciones calculadas para el layout del árbol
interface NodePos{node:Node;x:number;y:number;depth:number;parentId:string|null}

function flattenTree(root:Node,x:number,y:number,depth:number,parentId:string|null,spacing:number,vgap:number,result:NodePos[]){
  result.push({node:root,x,y,depth,parentId});
  if(root.children.length===0) return;
  const total=(root.children.length-1)*spacing;
  const startX=x-total/2;
  root.children.forEach((child,i)=>{
    flattenTree(child,startX+i*spacing,y+vgap,depth+1,root.id,spacing/1.5,vgap,result);
  });
}

interface Props{isDark?:boolean}

export function NetworkTree({isDark=true}:Props){
  const [selected,setSelected]=useState<string|null>(null);
  const [filter,setFilter]=useState<"all"|Rank>("all");
  const svgRef=useRef<SVGSVGElement>(null);
  const [dims,setDims]=useState({w:360,h:500});
  const [pan,setPan]=useState({x:0,y:0});
  const [scale,setScale]=useState(1);
  const dragging=useRef(false);
  const lastTouch=useRef({x:0,y:0});

  // Layout
  const positions:NodePos[]=[];
  flattenTree(TREE, dims.w/2, 60, 0, null, 110, 100, positions);

  const visible=filter==="all"?positions:positions.filter(p=>p.node.rank===filter||p.node.id==="root");
  const visibleIds=new Set(visible.map(p=>p.node.id));
  const selectedNode=positions.find(p=>p.node.id===selected)?.node||null;

  useEffect(()=>{
    const el=svgRef.current?.parentElement;
    if(!el) return;
    const ro=new ResizeObserver(([e])=>{
      setDims({w:e.contentRect.width,h:500});
    });
    ro.observe(el);
    return()=>ro.disconnect();
  },[]);

  // Touch pan
  const onTouchStart=(e:React.TouchEvent)=>{
    dragging.current=true;
    lastTouch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};
  };
  const onTouchMove=(e:React.TouchEvent)=>{
    if(!dragging.current) return;
    const dx=e.touches[0].clientX-lastTouch.current.x;
    const dy=e.touches[0].clientY-lastTouch.current.y;
    setPan(p=>({x:p.x+dx,y:p.y+dy}));
    lastTouch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};
  };
  const onTouchEnd=()=>{dragging.current=false};

  const stats={
    total:positions.length-1,
    activos:positions.filter(p=>p.node.id!=="root"&&p.node.active).length,
    oro:positions.filter(p=>p.node.rank==="oro").length,
    plata:positions.filter(p=>p.node.rank==="plata"&&p.node.id!=="root").length,
  };

  return(
    <div style={{background:"#000",minHeight:"100vh"}}>

      {/* HEADER */}
      <div style={{padding:"18px 18px 12px",borderBottom:"1px solid rgba(0,255,255,.1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{fontSize:9,color:"rgba(0,255,255,.5)",letterSpacing:3,textTransform:"uppercase",marginBottom:4,fontFamily:"monospace"}}>Red Zuxen</div>
            <div style={{fontSize:24,fontWeight:900,color:"#fff",letterSpacing:-1}}>
              Tu Red <span style={{color:"#ff00ff",textShadow:"0 0 12px rgba(255,0,255,.7)"}}>MLM</span>
            </div>
          </div>
          {/* Stats rápidos */}
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:20,fontWeight:900,color:"#ffd700",textShadow:"0 0 10px rgba(255,215,0,.6)"}}>{stats.total}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:1}}>personas</div>
          </div>
        </div>

        {/* KPIs en fila */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[
            {v:stats.activos,l:"Activos",c:"#39ff14"},
            {v:stats.oro,l:"Oro",c:"#ffd700"},
            {v:stats.plata,l:"Plata",c:"#00ffff"},
            {v:positions.filter(p=>p.node.rank==="bronce").length,l:"Bronce",c:"#ff6600"},
          ].map(({v,l,c})=>(
            <div key={l} style={{flex:1,background:"rgba(0,0,20,.8)",
              border:`1px solid ${c}33`,borderRadius:8,padding:"8px 0",textAlign:"center",
              boxShadow:`0 0 10px ${c}15`}}>
              <div style={{fontSize:16,fontWeight:900,color:c,textShadow:`0 0 8px ${c}88`}}>{v}</div>
              <div style={{fontSize:8,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
          {(["all","oro","plata","bronce","none"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{flexShrink:0,padding:"5px 12px",borderRadius:4,border:"none",cursor:"pointer",
                fontSize:9,fontWeight:800,letterSpacing:1,textTransform:"uppercase",
                background:filter===f
                  ?f==="all"?"linear-gradient(90deg,#ff00ff,#7b2fff)":RANK_COLOR[f as Rank]
                  :"rgba(0,0,20,.8)",
                color:filter===f?"#000":"rgba(255,255,255,.5)",
                boxShadow:filter===f?`0 0 12px ${f==="all"?"rgba(255,0,255,.5)":RANK_GLOW[f as Rank]}`:"none",
              }}>
              {f==="all"?"TODOS":f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ÁRBOL SVG */}
      <div style={{position:"relative",overflow:"hidden",background:"#000",cursor:"grab"}}>
        {/* Grid de fondo */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(0,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,.04) 1px,transparent 1px)",
          backgroundSize:"40px 40px"}}/>

        <svg ref={svgRef} width={dims.w} height={dims.h}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={()=>setSelected(null)}
          style={{display:"block",touchAction:"pan-y"}}>

          {/* Defs: gradientes y filtros */}
          <defs>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-soft">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {["bronce","plata","oro","none"].map(r=>(
              <radialGradient key={r} id={`ng-${r}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={RANK_COLOR[r as Rank]} stopOpacity="0.25"/>
                <stop offset="100%" stopColor={RANK_COLOR[r as Rank]} stopOpacity="0"/>
              </radialGradient>
            ))}
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.3"/>
            </linearGradient>
          </defs>

          <g transform={`translate(${pan.x},${pan.y}) scale(${scale})`}>

            {/* LÍNEAS con gradiente de energía */}
            {positions.filter(p=>p.parentId&&visibleIds.has(p.node.id)).map(p=>{
              const parent=positions.find(pp=>pp.node.id===p.parentId);
              if(!parent||!visibleIds.has(parent.node.id)) return null;
              const isHighlighted=selected===p.node.id||selected===parent.node.id;
              const c1=RANK_COLOR[parent.node.rank];
              const c2=RANK_COLOR[p.node.rank];
              const mid={x:(p.x+parent.x)/2,y:(p.y+parent.y)/2};
              return(
                <g key={`line-${p.node.id}`}>
                  {/* Línea base */}
                  <path
                    d={`M${parent.x},${parent.y} Q${mid.x},${mid.y+10} ${p.x},${p.y}`}
                    stroke={isHighlighted?"#ff00ff":`url(#line-grad)`}
                    strokeWidth={isHighlighted?2:1.5}
                    fill="none" opacity={isHighlighted?1:.5}
                    strokeDasharray={p.node.active?"none":"6 4"}/>
                  {/* Partícula viajando — solo ramas activas */}
                  {p.node.active&&(
                    <circle r={3} fill={c1} filter="url(#glow-soft)" opacity={.9}>
                      <animateMotion
                        dur={`${2+Math.random()*2}s`}
                        repeatCount="indefinite"
                        path={`M${parent.x},${parent.y} Q${mid.x},${mid.y+10} ${p.x},${p.y}`}/>
                    </circle>
                  )}
                </g>
              );
            })}

            {/* NODOS */}
            {visible.map(p=>{
              const {node,x,y}=p;
              const isRoot=node.id==="root";
              const isSelected=selected===node.id;
              const color=RANK_COLOR[node.rank];
              const r=isRoot?28:node.rank!=="none"?22:18;
              return(
                <g key={node.id} transform={`translate(${x},${y})`}
                  onClick={e=>{e.stopPropagation();setSelected(isSelected?null:node.id)}}
                  style={{cursor:"pointer"}}>

                  {/* Glow radial de fondo */}
                  <circle r={r*2.2} fill={`url(#ng-${node.rank})`} opacity={node.active?1:.4}/>

                  {/* Ring exterior pulsante — solo activos */}
                  {node.active&&(
                    <circle r={r+6} fill="none" stroke={color} strokeWidth={.8} opacity={.4}>
                      <animate attributeName="r" values={`${r+3};${r+10};${r+3}`} dur="2.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values=".5;0;.5" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                  )}

                  {/* Círculo seleccionado */}
                  {isSelected&&(
                    <circle r={r+9} fill="none" stroke="#ff00ff" strokeWidth={1.5}
                      opacity={.8} strokeDasharray="4 3">
                      <animateTransform attributeName="transform" type="rotate"
                        values="0;360" dur="4s" repeatCount="indefinite"/>
                    </circle>
                  )}

                  {/* Cuerpo del nodo */}
                  <circle r={r} fill={isRoot?"#000":node.active?"rgba(0,0,20,.9)":"rgba(0,0,10,.7)"}
                    stroke={color} strokeWidth={isRoot?2:isSelected?2.5:1.5}
                    filter={node.active?"url(#glow-soft)":"none"}
                    style={{
                      boxShadow:`0 0 20px ${color}`,
                    }}/>

                  {/* Relleno con color del rango */}
                  <circle r={r-4} fill={color} opacity={isRoot?.2:node.active?.15:.06}/>

                  {/* Ícono de rango o iniciales */}
                  {isRoot?(
                    <>
                      <circle r={8} fill="#ff00ff" opacity={.3}/>
                      <text textAnchor="middle" dominantBaseline="central"
                        fontSize={10} fill="#fff" fontWeight="900">TÚ</text>
                    </>
                  ):(
                    <>
                      <text textAnchor="middle" dominantBaseline="central"
                        fontSize={node.rank!=="none"?11:9} fill={node.active?color:"rgba(255,255,255,.3)"}
                        fontWeight="800" fontFamily="monospace"
                        filter={node.active?"url(#glow-soft)":"none"}>
                        {node.name.split(" ")[0].slice(0,4).toUpperCase()}
                      </text>
                      {node.rank!=="none"&&(
                        <text textAnchor="middle" y={r+10} fontSize={9} fill={color}>
                          {RANK_LABEL[node.rank]}
                        </text>
                      )}
                    </>
                  )}

                  {/* Label nombre */}
                  {!isRoot&&(
                    <text textAnchor="middle" y={r+22}
                      fontSize={8} fill={node.active?"rgba(255,255,255,.7)":"rgba(255,255,255,.25)"}
                      fontWeight="600" fontFamily="monospace">
                      {node.name.split(" ")[0]}
                    </text>
                  )}

                  {/* Indicador inactivo */}
                  {!node.active&&(
                    <circle r={5} cx={r-4} cy={-(r-4)} fill="#ff0040"
                      stroke="#000" strokeWidth={1}/>
                  )}
                </g>
              );
            })}
          </g>

          {/* Instrucción */}
          <text x={dims.w/2} y={dims.h-12} textAnchor="middle"
            fontSize={9} fill="rgba(255,255,255,.2)" fontFamily="monospace">
            toca un nodo · arrastra para mover
          </text>
        </svg>
      </div>

      {/* PANEL DETALLE — nodo seleccionado */}
      {selectedNode&&(
        <div style={{position:"sticky",bottom:0,left:0,right:0,zIndex:10,
          background:"rgba(0,0,12,.97)",
          borderTop:`1px solid ${RANK_COLOR[selectedNode.rank]}44`,
          padding:"16px 20px",
          boxShadow:`0 -4px 30px ${RANK_GLOW[selectedNode.rank]}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:11,color:RANK_COLOR[selectedNode.rank],
                fontWeight:900,letterSpacing:2,textTransform:"uppercase",
                textShadow:`0 0 10px ${RANK_GLOW[selectedNode.rank]}`,marginBottom:3}}>
                {RANK_LABEL[selectedNode.rank]} {selectedNode.rank.toUpperCase()}
              </div>
              <div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{selectedNode.name}</div>
            </div>
            <button onClick={()=>setSelected(null)}
              style={{background:"rgba(255,255,255,.08)",border:"none",
                color:"rgba(255,255,255,.5)",borderRadius:6,padding:"6px 10px",
                cursor:"pointer",fontSize:13}}>✕</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[
              {v:`$${selectedNode.sales.toLocaleString()}`,l:"Ventas",c:RANK_COLOR[selectedNode.rank]},
              {v:selectedNode.children.length.toString(),l:"Directos",c:"#00ffff"},
              {v:selectedNode.active?"●  ACTIVO":"○  INACTIVO",l:"Estado",c:selectedNode.active?"#39ff14":"#ff4040"},
            ].map(({v,l,c})=>(
              <div key={l} style={{background:"rgba(0,0,20,.8)",border:`1px solid ${c}22`,
                borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
                <div style={{fontSize:l==="Estado"?9:15,fontWeight:900,color:c,
                  textShadow:`0 0 8px ${c}66`}}>{v}</div>
                <div style={{fontSize:8,color:"rgba(255,255,255,.4)",marginTop:2,textTransform:"uppercase",letterSpacing:.5}}>{l}</div>
              </div>
            ))}
          </div>
          {selectedNode.children.length>0&&(
            <div style={{marginTop:10,display:"flex",gap:6,overflowX:"auto",padding:"2px 0"}}>
              {selectedNode.children.map(c=>(
                <div key={c.id} onClick={()=>setSelected(c.id)}
                  style={{flexShrink:0,background:"rgba(0,0,20,.8)",
                    border:`1px solid ${RANK_COLOR[c.rank]}44`,borderRadius:6,
                    padding:"6px 10px",cursor:"pointer"}}>
                  <div style={{fontSize:10,fontWeight:800,color:RANK_COLOR[c.rank]}}>{c.name.split(" ")[0]}</div>
                  <div style={{fontSize:8,color:"rgba(255,255,255,.3)"}}>{RANK_LABEL[c.rank]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
