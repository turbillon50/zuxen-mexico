'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
const TABS=[
  {href:'/',label:'Inicio',d:'M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10'},
  {href:'/red',label:'Mi Red',d:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'},
  {href:'/productos',label:'Productos',d:'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0'},
  {href:'/perfil',label:'Perfil',d:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'},
];
export default function BottomNav(){
  const path=usePathname();
  return(
    <nav data-vulcano-bottomnav style={{position:'fixed',bottom:0,left:0,right:0,height:'var(--nav-h)',background:'rgba(6,11,31,0.88)',backdropFilter:'blur(18px)',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-around',alignItems:'center',zIndex:1000}}>
      {TABS.map(tab=>{
        const active=path===tab.href;
        return(
          <Link key={tab.href} href={tab.href} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,textDecoration:'none',color:active?'var(--cyan)':'var(--txt-2)',transition:'color .2s',padding:'4px 12px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animation:active?'float 2s ease-in-out infinite':undefined}}>
              {tab.d.split(' M').map((seg,i)=><path key={i} d={(i===0?'':' M')+seg}/>)}
            </svg>
            <span style={{fontSize:'0.65rem',fontWeight:active?700:400,letterSpacing:'0.04em'}}>{tab.label}</span>
            {active&&<span style={{width:4,height:4,borderRadius:'50%',background:'var(--cyan)',boxShadow:'0 0 8px var(--cyan)'}}/>}
          </Link>
        );
      })}
    </nav>
  );
}
