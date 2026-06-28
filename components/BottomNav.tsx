"use client";
import { usePathname,useRouter } from "next/navigation";
const IC:Record<string,string>={
  home:"M3 11l9-8 9 8M5 10v10h14V10",
  shop:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18m-5 4a4 4 0 0 1-8 0",
  net:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m11 0l-2-2-2 2m0-4l2 2 2-2",
  chart:"M3 3v18h18M7 16l4-4 4 4 4-8",
  user:"M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 20c0-4 4-6 8-6s8 2 8 6",
};
const TABS=[
  {href:"/",icon:"home",label:"Inicio"},
  {href:"/productos",icon:"shop",label:"Productos"},
  {href:"/red",icon:"net",label:"Mi Red"},
  {href:"/admin",icon:"chart",label:"Admin"},
  {href:"/perfil",icon:"user",label:"Perfil"},
];
function Ico({name,filled}:{name:string;filled:boolean}){
  return(
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={IC[name]??IC.home} fill={filled?"currentColor":"none"}/>
    </svg>
  );
}
export function BottomNav(){
  const path=usePathname();
  const router=useRouter();
  return(
    <nav data-vulcano-bottomnav aria-label="Navegacion principal" style={{
      position:"fixed",left:0,right:0,bottom:0,zIndex:40,maxWidth:480,
      margin:"0 auto",height:"var(--nav-h)",display:"flex",
      alignItems:"center",justifyContent:"space-around",
      background:"var(--glass)",backdropFilter:"blur(16px) saturate(140%)",
      WebkitBackdropFilter:"blur(16px) saturate(140%)",
      borderTop:"1px solid var(--glass-stroke)",
      paddingBottom:"env(safe-area-inset-bottom)"}}>
      {TABS.map(tab=>{
        const active=path===tab.href||(tab.href!=="/"&&path.startsWith(tab.href));
        return(
          <button key={tab.href} onClick={()=>router.push(tab.href)}
            aria-current={active?"page":undefined}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              fontSize:10,color:active?"#fff":"var(--txt-2)",flex:1,border:0,
              background:"none",fontFamily:"inherit",cursor:"pointer",transition:".2s",
              filter:active?"drop-shadow(0 0 8px rgba(255,255,255,.5))":"none"}}>
            <Ico name={tab.icon} filled={active}/>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
