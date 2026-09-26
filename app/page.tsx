
const P=(({children,s,c,w,mt}:{children:any,s?:number,c?:string,w?:number,mt?:number})=>(
  <p style={{fontSize:s,color:c||'var(--txt-2)',fontWeight:w,marginTop:mt}}>{children}</p>
)) as any;

export default function Home(){
  const particles=Array.from({length:14},(_,i)=>i);
  return(
    <div>
      {/* HERO */}
      <section style={{position:'relative',minHeight:'92vh',background:'linear-gradient(160deg,#020818 0%,#0a0f2e 50%,#060b1f 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'2rem',overflow:'hidden'}}>
        {/* Rayos de fondo decorativos */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 30%, rgba(0,229,255,0.08) 0%, transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 80%, rgba(255,215,0,0.05) 0%, transparent 60%)',pointerEvents:'none'}}/>
        {/* Logo SVG */}
        <svg width="130" height="130" viewBox="0 0 110 110" style={{animation:'ray-glow 2.5s ease-in-out infinite',marginBottom:'1.5rem'}}>
          <defs><filter id="gf2"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <circle cx="55" cy="55" r="50" fill="rgba(0,14,61,0.85)" stroke="#00e5ff" strokeWidth="1.5"/>
          <circle cx="55" cy="55" r="44" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="1"/>
          <circle cx="55" cy="55" r="50" fill="none" stroke="#ffd700" strokeWidth="0.8" opacity="0.4"/>
          <path d="M62 12 L36 55 L52 55 L44 96 L78 50 L60 50 Z" fill="#ffd700" filter="url(#gf2)"/>
        </svg>
        <h1 style={{fontSize:'3.2rem',fontWeight:900,color:'var(--gold)',letterSpacing:'0.12em',lineHeight:1.1}}>ZUXEN</h1>
        <p style={{fontSize:'1rem',color:'var(--cyan)',letterSpacing:'0.12em',marginTop:6}}>MEXICO</p>
        <p style={{fontSize:'1.1rem',color:'var(--txt)',maxWidth:340,margin:'1.2rem auto 0',lineHeight:1.6}}>
          Bioactivadores que transforman tu vida y la de tus mascotas
        </p>
        <a href="/productos" style={{marginTop:'1.8rem',display:'inline-block',padding:'0.9rem 2.4rem',background:'linear-gradient(135deg,var(--gold-2),var(--gold))',color:'#060b1f',borderRadius:50,fontWeight:900,fontSize:'1rem',letterSpacing:'0.08em',textDecoration:'none',boxShadow:'0 0 24px rgba(255,215,0,0.4)'}}>
          VER PRODUCTOS
        </a>
        <a href="/red" style={{marginTop:'0.8rem',display:'inline-block',padding:'0.7rem 2rem',border:'1px solid var(--cyan)',color:'var(--cyan)',borderRadius:50,fontWeight:600,fontSize:'0.9rem',letterSpacing:'0.06em',textDecoration:'none'}}>
          PLAN DE COMPENSACIÓN
        </a>
        {/* Partículas */}
        {particles.map(i=>(
          <div key={i} style={{position:'absolute',width:3+Math.random()*5,height:3+Math.random()*5,borderRadius:'50%',background:i%3===0?'var(--gold)':i%3===1?'var(--cyan)':'rgba(255,255,255,0.6)',left:Math.random()*100+'%',top:Math.random()*100+'%',animation:`particle-drift ${4+Math.random()*5}s ${Math.random()*3}s infinite linear`,'--dx':(Math.random()-.5)*200+'px','--dy':-(80+Math.random()*150)+'px'} as React.CSSProperties}/>
        ))}
      </section>

      {/* STATS */}
      <section style={{display:'flex',gap:'1rem',padding:'2rem 1.2rem',overflowX:'auto'}}>
        {[['500+','Distribuidores activos'],['7','Niveles de ingreso'],['50%','Desc. distribuidor'],].map(([n,l])=>(
          <div key={l} style={{flex:'0 0 auto',minWidth:140,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.2rem',textAlign:'center'}}>
            <p style={{fontSize:'2rem',fontWeight:900,color:'var(--gold)'}}>{n}</p>
            <p style={{fontSize:'0.75rem',color:'var(--txt-2)',marginTop:4}}>{l}</p>
          </div>
        ))}
      </section>

      {/* COMO FUNCIONA */}
      <section style={{padding:'0 1.2rem 2rem'}}>
        <h2 style={{fontSize:'1.6rem',fontWeight:900,color:'var(--gold)',textAlign:'center',marginBottom:'1.5rem'}}>CÓMO FUNCIONA</h2>
        {[
          ['01','Pre-inscríbete $200 MXN','Obtén un bioactivador de mascota y accede a precio distribuidor'],
          ['02','Actívate mensualmente','$200 MXN/mes te permite cobrar de tu red y comprar con 50% de descuento'],
          ['03','Afilia 5 directos','Gana producto y dinero con la Matriz Empower Up de 5-25-125 afiliados'],
          ['04','Adquiere tu Concesión','Gana anualmente del 2% al 5% sobre utilidades de la empresa en tu región'],
        ].map(([n,t,d])=>(
          <div key={n} style={{display:'flex',gap:'1rem',alignItems:'flex-start',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1rem 1.2rem',marginBottom:'0.8rem'}}>
            <span style={{fontSize:'1.8rem',fontWeight:900,color:'var(--cyan)',lineHeight:1,minWidth:36}}>{n}</span>
            <div>
              <p style={{fontWeight:700,color:'var(--txt)'}}>{t}</p>
              <p style={{fontSize:'0.85rem',color:'var(--txt-2)',marginTop:4}}>{d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SISTEMA BINARIO */}
      <section style={{padding:'0 1.2rem 2rem'}}>
        <h2 style={{fontSize:'1.6rem',fontWeight:900,color:'var(--gold)',textAlign:'center',marginBottom:'1.2rem'}}>SISTEMA BINARIO</h2>
        <div style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.4rem'}}>
          <p style={{color:'var(--txt-2)',fontSize:'0.85rem',marginBottom:'1rem',lineHeight:1.5}}>Gana mensualmente de las compras de tu red. El % depende del crecimiento de tu Matriz Empower Up.</p>
          {[['5%','2 directos en Nivel 1'],['10%','25 registros en Nivel 2'],['20%','125 afiliados en Nivel 3']].map(([pct,desc])=>(
            <div key={pct} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.8rem 0',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:'2rem',fontWeight:900,color:'var(--cyan)'}}>{pct}</span>
              <span style={{fontSize:'0.85rem',color:'var(--txt-2)'}}>{desc}</span>
            </div>
          ))}
          <p style={{fontSize:'0.75rem',color:'var(--txt-2)',marginTop:'0.8rem',opacity:.7}}>Nota: B.A. 1 Núcleo no participa del binario — desarrolla la Matriz Empower Up.</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{margin:'0 1.2rem 2rem',background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,215,0,0.06))',border:'1px solid rgba(255,215,0,0.2)',borderRadius:'var(--radius)',padding:'2rem',textAlign:'center'}}>
        <p style={{fontSize:'1.1rem',fontWeight:700,color:'var(--gold)',lineHeight:1.5,marginBottom:'0.6rem'}}>
          ZUXEN te pone la herramienta
        </p>
        <p style={{fontSize:'0.9rem',color:'var(--txt-2)',lineHeight:1.6}}>
          Tú decides — Crea el vehículo para cumplir tus sueños
        </p>
        <a href="/red" style={{marginTop:'1.2rem',display:'inline-block',padding:'0.8rem 2rem',background:'linear-gradient(135deg,var(--gold-2),var(--gold))',color:'#060b1f',borderRadius:50,fontWeight:900,textDecoration:'none'}}>
          ÚNETE AHORA
        </a>
      </section>
    </div>
  );
}
