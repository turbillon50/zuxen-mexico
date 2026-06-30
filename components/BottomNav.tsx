"use client";
import { usePathname,useRouter } from "next/navigation";
import { motion } from "framer-motion";
const TABS=[
  {href:"/",label:"Inicio",icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill={a?"#00c8ff":"none"}
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  {href:"/productos",label:"Catálogo",icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.2)":"none"}/>
      <rect x="15" y="3" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.2)":"none"}/>
      <rect x="2" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.2)":"none"}/>
      <rect x="15" y="14" width="7" height="7" rx="1" fill={a?"rgba(0,200,255,.2)":"none"}/>
    </svg>
  )},
  {href:"/red",label:"Mi Red",icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#f5a623":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" fill={a?"rgba(245,166,35,.3)":"none"}/>
      <circle cx="5" cy="17" r="2" fill={a?"rgba(245,166,35,.3)":"none"}/>
      <circle cx="19" cy="17" r="2" fill={a?"rgba(245,166,35,.3)":"none"}/>
      <line x1="12" y1="7" x2="5" y2="15"/><line x1="12" y1="7" x2="19" y2="15"/>
    </svg>
  )},
  {href:"/admin",label:"Dashboard",icon:(a:boolean)=>(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke={a?"#00c8ff":"#6b7fa3"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h7v7H3z" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <path d="M14 3h7v7h-7z" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <path d="M14 14h7v7h-7z" fill={a?"rgba(0,200,255,.15)":"none"}/>
      <path d="M3 14h7v7H3z" fill={a?"rgba(0,200,255,.15)":"none"}/>
    </svg>
  )},
  {href:"/perfil",label:"Perfil",icon:(a:boolean)=>(
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
  return(
    <nav data-vulcano-bottomnav aria-label="Navegacion principal" style={{
      position:"fixed",left:0,right:0,bottom:0,zIndex:40,maxWidth:480,margin:"0 auto",
      height:"var(--nav-h)",display:"flex",alignItems:"center",justifyContent:"space-around",
      background:"rgba(6,8,15,.8)",backdropFilter:"blur(24px) saturate(180%)",
      WebkitBackdropFilter:"blur(24px) saturate(180%)",
      borderTop:"1px solid rgba(0,200,255,.1)",
      paddingBottom:"env(safe-area-inset-bottom)"}}>
      {TABS.map(tab=>{
        const active=path===tab.href||(tab.href!=="/"&&path.startsWith(tab.href));
        const isMiRed=tab.href==="/red";
        return(
          <motion.button key={tab.href}
            onClick={()=>router.push(tab.href)}
            whileTap={{scale:.87}}
            transition={{type:"spring",stiffness:400,damping:20}}
            aria-current={active?"page":undefined}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
              fontSize:10,color:active?(isMiRed?"#f5a623":"#00c8ff"):"#6b7fa3",
              flex:1,border:0,background:"none",fontFamily:"inherit",cursor:"pointer",
              letterSpacing:.5,fontWeight:active?700:500,
              filter:active?(isMiRed?"drop-shadow(0 0 8px rgba(245,166,35,.6))":"drop-shadow(0 0 8px rgba(0,200,255,.6))"):"none",
              transition:"color .2s,filter .2s"}}>
            {tab.icon(active)}
            <span style={{transition:"color .2s"}}>{tab.label}</span>
            {active&&(
              <motion.div layoutId="nav-indicator"
                style={{position:"absolute",bottom:6,width:4,height:4,borderRadius:"50%",
                  background:isMiRed?"#f5a623":"#00c8ff",
                  boxShadow:isMiRed?"0 0 6px #f5a623":"0 0 6px #00c8ff"}}
                transition={{type:"spring",stiffness:380,damping:30}}/>
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
