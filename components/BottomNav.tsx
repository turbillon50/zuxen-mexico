"use client";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const TABS=[
  {href:"/",label:"Inicio",badge:0,color:"#f0c040",
    icon:(a:boolean,c:string)=>(
      <svg width={22} height={22} viewBox="0 0 24 24" fill={a?c:"none"}
        stroke={a?c:"#6b82b8"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
  {href:"/productos",label:"Catalogo",badge:0,color:"#00e5ff",
    icon:(a:boolean,c:string)=>(
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#6b82b8"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="15" y="3" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="2" y="14" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="15" y="14" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
      </svg>
    )},
  {href:"/red",label:"Mi Red",badge:3,color:"#f0c040",
    icon:(a:boolean,c:string)=>(
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#6b82b8"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" fill={a?c+"30":"none"}/>
        <circle cx="5" cy="17" r="2" fill={a?c+"30":"none"}/>
        <circle cx="19" cy="17" r="2" fill={a?c+"30":"none"}/>
        <line x1="12" y1="7" x2="5" y2="15"/><line x1="12" y1="7" x2="19" y2="15"/>
      </svg>
    )},
  {href:"/admin",label:"Dashboard",badge:0,color:"#00e5ff",
    icon:(a:boolean,c:string)=>(
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#6b82b8"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={a?c+"18":"none"}/>
        <rect x="14" y="3" width="7" height="7" rx="1" fill={a?c+"18":"none"}/>
        <rect x="14" y="14" width="7" height="7" rx="1" fill={a?c+"18":"none"}/>
        <rect x="3" y="14" width="7" height="7" rx="1" fill={a?c+"18":"none"}/>
      </svg>
    )},
  {href:"/perfil",label:"Perfil",badge:0,color:"#cc44ff",
    icon:(a:boolean,c:string)=>(
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#6b82b8"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" fill={a?c+"18":"none"}/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
      </svg>
    )},
];

export function BottomNav(){
  const path=usePathname();
  const router=useRouter();
  const {theme,toggle}=useTheme();
  const isDark=theme==="dark";

  const handleNav=(href:string)=>{
    if(typeof navigator!=="undefined"&&"vibrate" in navigator) navigator.vibrate(8);
    router.push(href);
  };

  const navBg=isDark?"rgba(8,15,40,.92)":"rgba(238,241,255,.96)";
  const navBorder=isDark?"rgba(212,160,23,.12)":"rgba(10,21,100,.1)";

  return(
    <nav data-vulcano-bottomnav aria-label="Navegacion principal" style={{
      position:"fixed",left:0,right:0,bottom:0,zIndex:40,maxWidth:480,margin:"0 auto",
      height:"var(--nav-h)",display:"flex",alignItems:"center",
      background:navBg,backdropFilter:"blur(28px) saturate(200%)",
      WebkitBackdropFilter:"blur(28px) saturate(200%)",
      borderTop:"1px solid "+navBorder,
      paddingBottom:"env(safe-area-inset-bottom)"}}>
      {TABS.map(tab=>{
        const active=path===tab.href||(tab.href!=="/"&&path.startsWith(tab.href));
        const tc=isDark?"#6b82b8":"#8b9bc8";
        return(
          <motion.button key={tab.href}
            onClick={()=>handleNav(tab.href)}
            whileTap={{scale:.84,y:2}}
            transition={{type:"spring",stiffness:500,damping:25}}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              fontSize:10,color:active?tab.color:tc,
              flex:1,border:0,background:"none",fontFamily:"inherit",cursor:"pointer",
              letterSpacing:.5,fontWeight:active?700:500,position:"relative",
              filter:active?"drop-shadow(0 0 8px "+tab.color+"88)":"none",
              transition:"color .2s,filter .2s"}}>
            {tab.icon(active,tab.color)}
            <span>{tab.label}</span>
            {tab.badge>0&&(
              <div style={{position:"absolute",top:0,right:"calc(50% - 18px)",
                minWidth:16,height:16,background:"#ef4444",color:"#fff",
                borderRadius:8,fontSize:9,fontWeight:800,
                display:"flex",alignItems:"center",justifyContent:"center",
                padding:"0 4px",border:"1.5px solid "+navBg,
                boxShadow:"0 0 6px rgba(239,68,68,.5)"}}>
                {tab.badge}
              </div>
            )}
            <AnimatePresence>
              {active&&(
                <motion.div layoutId="nav-dot"
                  initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                  style={{position:"absolute",bottom:2,width:4,height:4,borderRadius:"50%",
                    background:tab.color,boxShadow:"0 0 8px "+tab.color}}
                  transition={{type:"spring",stiffness:400,damping:28}}/>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
      {/* Toggle dia/noche integrado en la nav */}
      <motion.button
        onClick={toggle}
        whileTap={{scale:.85,rotate:isDark?10:-10}}
        style={{width:36,height:36,borderRadius:"50%",border:0,
          background:isDark?"rgba(212,160,23,.12)":"rgba(10,21,100,.1)",
          display:"flex",alignItems:"center",justifyContent:"center",
          cursor:"pointer",flexShrink:0,marginRight:8,
          boxShadow:isDark?"0 0 10px rgba(212,160,23,.2)":"0 0 10px rgba(10,21,100,.1)"}}>
        <span style={{fontSize:16}}>{isDark?"☀️":"🌙"}</span>
      </motion.button>
    </nav>
  );
}
