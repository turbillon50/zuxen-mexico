'use client';
export default function Splash(){
  const particles=Array.from({length:18},(_,i)=>i);
  return(
    <div style={{position:'fixed',inset:0,background:'var(--navy)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:9999,overflow:'hidden'}}>
      {[120,200,280].map((s,i)=>(
        <div key={i} style={{position:'absolute',width:s,height:s,borderRadius:'50%',border:`1px solid rgba(0,229,255,${0.35-i*0.1})`,animation:`spin-ring ${5+i*2}s linear infinite`}}/>
      ))}
      <svg width="110" height="110" viewBox="0 0 110 110" style={{animation:'ray-glow 2s ease-in-out infinite',position:'relative',zIndex:2}}>
        <defs><filter id="gf"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <circle cx="55" cy="55" r="50" fill="rgba(0,14,61,0.9)" stroke="#00e5ff" strokeWidth="1.5"/>
        <circle cx="55" cy="55" r="50" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.3"/>
        <path d="M62 12 L36 55 L52 55 L44 96 L78 50 L60 50 Z" fill="#ffd700" filter="url(#gf)"/>
      </svg>
      <h1 style={{marginTop:'1.2rem',fontSize:'2.8rem',fontWeight:900,color:'var(--gold)',letterSpacing:'0.2em',position:'relative',zIndex:2}}>ZUXEN</h1>
      <p style={{marginTop:'0.4rem',fontSize:'0.9rem',color:'var(--cyan)',letterSpacing:'0.15em',position:'relative',zIndex:2}}>ENERGÍA QUE TRANSFORMA</p>
      {particles.map(i=>(
        <div key={i} style={{position:'absolute',width:4+Math.random()*5,height:4+Math.random()*5,borderRadius:'50%',background:i%2===0?'var(--cyan)':'var(--gold)',left:Math.random()*100+'%',top:Math.random()*100+'%',animation:`particle-drift ${3+Math.random()*4}s ${Math.random()*2}s infinite linear`,'--dx':(Math.random()-.5)*160+'px','--dy':-(60+Math.random()*120)+'px'} as React.CSSProperties}/>
      ))}
    </div>
  );
}
