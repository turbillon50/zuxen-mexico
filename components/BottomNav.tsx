"use client";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// Tabs: Inicio | Catalogo | [RED - CENTRO] | Dashboard | Perfil
const TABS=[
  {href:"/",label:"Inicio",badge:0,color:"#ffd700",
    icon:(a:boolean,c:string)=>(
      <svg width={20} height={20} viewBox="0 0 24 24" fill={a?c:"none"}
        stroke={a?c:"#4060a0"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
  {href:"/productos",label:"Catalogo",badge:0,color:"#00ffff",
    icon:(a:boolean,c:string)=>(
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#4060a0"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="15" y="3" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="2" y="14" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
        <rect x="15" y="14" width="7" height="7" rx="1" fill={a?c+"22":"none"}/>
      </svg>
    )},
  // CENTRO — Mi Red (índice 2)
  {href:"/red",label:"Mi Red",badge:3,color:"#ff00ff",center:true,
    icon:(a:boolean,c:string)=>(
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2.5" fill="rgba(255,255,255,.25)"/>
        <circle cx="4"  cy="18" r="2.5" fill="rgba(255,255,255,.15)"/>
        <circle cx="20" cy="18" r="2.5" fill="rgba(255,255,255,.15)"/>
        <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,.4)"/>
        <line x1="12" y1="6.5" x2="12" y2="10.5"/>
        <line x1="10.5" y1="13" x2="5.5" y2="16"/>
        <line x1="13.5" y1="13" x2="18.5" y2="16"/>
      </svg>
    )},
  {href:"/admin",label:"Stats",badge:0,color:"#00ffff",
    icon:(a:boolean,c:string)=>(
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#4060a0"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none"/>
      </svg>
    )},
  {href:"/perfil",label:"Perfil",badge:0,color:"#cc44ff",
    icon:(a:boolean,c:string)=>(
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
        stroke={a?c:"#4060a0"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" fill={a?c+"18":"none"}/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
      </svg>
    )},
] as const;

export function BottomNav(){
  const path=usePathname();
  const router=useRouter();
  const {theme,toggle}=useTheme();
  const isDark=theme==="dark";

  return(
    <nav data-vulcano-bottomnav style={{
      position:"fixed",bottom:0,left:0,right:0,zIndex:50,
      maxWidth:480,margin:"0 auto",
      background:isDark?"rgba(0,0,8,.95)":"rgba(240,244,255,.97)",
      backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
      borderTop:isDark?"1px solid rgba(0,255,255,.1)":"1px solid rgba(0,100,255,.1)",
      boxShadow:isDark?"0 -4px 30px rgba(0,0,0,.8)":"0 -4px 20px rgba(0,0,40,.08)",
      paddingBottom:"env(safe-area-inset-bottom)",
    }}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-around",
        padding:"6px 8px 8px",position:"relative"}}>

        {TABS.map((tab,i)=>{
          const active=path===tab.href;
          const isCenter="center" in tab && tab.center;
          if(isCenter){
            return(
              <div key={tab.href} style={{display:"flex",flexDirection:"column",
                alignItems:"center",position:"relative",flex:1}}>
                {/* Botón central elevado */}
                <motion.button
                  whileTap={{scale:.88}}
                  onClick={()=>{
                    if(typeof navigator!=="undefined"&&"vibrate" in navigator) navigator.vibrate(10);
                    router.push(tab.href);
                  }}
                  style={{
                    width:58,height:58,borderRadius:16,border:"none",cursor:"pointer",
                    marginTop:-24,position:"relative",
                    background:active
                      ?"linear-gradient(135deg,#ff00ff,#7b2fff)"
                      :"linear-gradient(135deg,rgba(255,0,255,.8),rgba(123,47,255,.9))",
                    boxShadow:active
                      ?"0 0 0 2px rgba(255,0,255,.4), 0 0 24px rgba(255,0,255,.7), 0 0 48px rgba(123,47,255,.4)"
                      :"0 0 0 1px rgba(255,0,255,.2), 0 0 14px rgba(255,0,255,.4)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    transition:"box-shadow .2s",
                  }}>
                  {tab.icon(active,tab.color)}
                  {/* Pulso animado */}
                  {active&&(
                    <motion.div
                      animate={{scale:[1,1.6],opacity:[.5,0]}}
                      transition={{repeat:Infinity,duration:1.4}}
                      style={{position:"absolute",inset:0,borderRadius:16,
                        border:"2px solid rgba(255,0,255,.6)",pointerEvents:"none"}}/>
                  )}
                  {/* Badge */}
                  {tab.badge>0&&(
                    <span style={{position:"absolute",top:-4,right:-4,
                      background:"#ff0040",color:"#fff",borderRadius:3,
                      fontSize:8,fontWeight:900,padding:"1px 4px",
                      border:"1px solid #000",boxShadow:"0 0 8px #ff0040",minWidth:14,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {tab.badge}
                    </span>
                  )}
                </motion.button>
                <span style={{
                  fontSize:9,marginTop:4,fontWeight:active?900:600,letterSpacing:.5,
                  color:active?"#ff00ff":"#4060a0",
                  textShadow:active?"0 0 8px rgba(255,0,255,.7)":"none",
                  textTransform:"uppercase",
                }}>
                  {tab.label}
                </span>
              </div>
            );
          }
          return(
            <motion.button key={tab.href} whileTap={{scale:.88}}
              onClick={()=>{
                if(typeof navigator!=="undefined"&&"vibrate" in navigator) navigator.vibrate(8);
                router.push(tab.href);
              }}
              style={{display:"flex",flexDirection:"column",alignItems:"center",
                gap:3,padding:"6px 8px",background:"none",border:"none",
                cursor:"pointer",flex:1,position:"relative"}}>

              <div style={{position:"relative"}}>
                {tab.icon(active,tab.color)}
                {tab.badge>0&&!active&&(
                  <span style={{position:"absolute",top:-3,right:-3,
                    background:"#ff0040",width:6,height:6,borderRadius:"50%",
                    boxShadow:"0 0 6px #ff0040",border:"1px solid #000"}}/>
                )}
              </div>

              <span style={{fontSize:9,fontWeight:active?800:600,letterSpacing:.5,
                color:active?tab.color:"#4060a0",
                textShadow:active?`0 0 8px ${tab.color}66`:"none",
                textTransform:"uppercase",whiteSpace:"nowrap"}}>
                {tab.label}
              </span>

              {/* Punto activo */}
              {active&&(
                <motion.div layoutId="navDot"
                  style={{position:"absolute",bottom:-6,width:4,height:4,
                    borderRadius:"50%",background:tab.color,
                    boxShadow:`0 0 8px ${tab.color}`}}/>
              )}

              {/* Toggle tema en Inicio */}
              {tab.href==="/"&&active&&(
                <motion.button
                  whileTap={{scale:.85}}
                  onClick={(e)=>{e.stopPropagation();toggle();}}
                  style={{position:"absolute",top:-32,right:-8,
                    width:28,height:28,borderRadius:"50%",border:"none",
                    background:isDark?"rgba(255,255,255,.07)":"rgba(0,0,0,.05)",
                    color:isDark?"#ffd700":"#5060a0",fontSize:13,cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {isDark?"☀️":"🌙"}
                </motion.button>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
