"use client";
import { usePathname,useRouter } from "next/navigation";
import { motion,AnimatePresence } from "framer-motion";
const TABS=[
  {href:"/",label:"Inicio",badge:0,icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill={a?"#00c8ff":"none"}
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  {href:"/productos",label:"Catálogo",badge:0,icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.18)":"none"}/>
      <rect x="15" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.18)":"none"}/>
      <rect x="2" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.18)":"none"}/>
      <rect x="15" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.18)":"none"}/>
    </svg>
  )},
  {href:"/red",label:"Mi Red",badge:3,icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#f5a623":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" fill={a?"rgba(245,166,35,.25)":"none"}/>
      <circle cx="5" cy="17" r="2" fill={a?"rgba(245,166,35,.25)":"none"}/>
      <circle cx="19" cy="17" r="2" fill={a?"rgba(245,166,35,.25)":"none"}/>
      <line x1="12" y1="7" x2="5" y2="15"/>
      <line x1="12" y1="7" x2="19" y2="15"/>
    </svg>
  )},
  {href:"/admin",label:"Dashboard",badge:0,icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <rect x="14" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <rect x="14" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <rect x="3" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.15)":"none"}/>
    </svg>
  )},
  {href:"/perfil",label:"Perfil",badge:0,icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
    </svg>
  )},
];
export function BottomNav(){
  const path=usePathname();
  const router=useRouter();
  const handleNav=(href:string)=>{
    if(typeof navigator!=="undefined"&&"vibrate" in navigator) navigator.vibrate(8);
    router.push(href);
  };
  return(
    <nav data-vulcano-bottomnav aria-label="Navegacion principal" style={{
      position:"fixed",left:0,right:0,bottom:0,zIndex:40,maxWidth:480,margin:"0 auto",
      height:"var(--nav-h)",display:"flex",alignItems:"center",justifyContent:"space-around",
      background:"rgba(6,8,15,.88)",backdropFilter:"blur(28px) saturate(200%)",
      WebkitBackdropFilter:"blur(28px) saturate(200%)",
      borderTop:"1px solid rgba(0,200,255,.1)",
      paddingBottom:"env(safe-area-inset-bottom)"}}>
      {TABS.map(tab=>{
        const active=path===tab.href||(tab.href!=="/"&&path.startsWith(tab.href));
        const isRed=tab.href==="/red";
        const activeColor=isRed?"#f5a623":"#00c8ff";
        return(
          <motion.button key={tab.href}
            onClick={()=>handleNav(tab.href)}
            whileTap={{scale:.84,y:2}}
            transition={{type:"spring",stiffness:500,damping:25}}
            aria-current={active?"page":undefined}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              fontSize:10,color:active?activeColor:"#6b7fa3",
              flex:1,border:0,background:"none",fontFamily:"inherit",cursor:"pointer",
              letterSpacing:.5,fontWeight:active?700:500,position:"relative",
              filter:active?`drop-shadow(0 0 10px ${activeColor}99)`:"none",
              transition:"color .2s,filter .2s"}}>
            {tab.icon(active)}
            <motion.span animate={{color:active?activeColor:"#6b7fa3"}} transition={{duration:.2}}>
              {tab.label}
            </motion.span>
            {tab.badge>0&&(
              <div className="badge" style={{top:-2,right:"calc(50% - 18px)"}}>
                {tab.badge}
              </div>
            )}
            <AnimatePresence>
              {active&&(
                <motion.div layoutId="nav-dot"
                  initial={{scale:0,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  exit={{scale:0,opacity:0}}
                  style={{position:"absolute",bottom:2,width:4,height:4,borderRadius:"50%",
                    background:activeColor,boxShadow:`0 0 8px ${activeColor}`}}
                  transition={{type:"spring",stiffness:400,damping:28}}/>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </nav>
  );
}
