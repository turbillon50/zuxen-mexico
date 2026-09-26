
export default function Admin(){
  const stats=[
    {l:'Ventas este mes',v:'$8,200',u:'MXN',c:'var(--gold)'},
    {l:'Afiliados directos',v:'6',u:'activos',c:'var(--cyan)'},
    {l:'Red total',v:'38',u:'registros',c:'var(--txt)'},
    {l:'Nivel actual',v:'BRONCE',u:'',c:'#cd7f32'},
  ];
  const afiliados=[
    {n:'María López',nivel:'PRE-ACTIV',activo:true,fecha:'Jun 12'},
    {n:'Carlos Ruiz',nivel:'BRONCE',activo:true,fecha:'May 28'},
    {n:'Sofía Torres',nivel:'PRE-ACTIV',activo:false,fecha:'Abr 15'},
    {n:'Luis Mendoza',nivel:'BRONCE',activo:true,fecha:'Jun 01'},
    {n:'Ana García',nivel:'PRE-ACTIV',activo:true,fecha:'Jun 18'},
    {n:'Jorge Pérez',nivel:'BRONCE',activo:true,fecha:'May 10'},
  ];
  return(
    <div style={{padding:'1.5rem 1.2rem 2rem'}}>
      <div style={{marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:'1.6rem',fontWeight:900,color:'var(--gold)'}}>PANEL DE CONTROL</h1>
        <p style={{fontSize:'0.8rem',color:'var(--cyan)',marginTop:2}}>JULIO 2026</p>
      </div>
      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.8rem',marginBottom:'2rem'}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1rem'}}>
            <p style={{fontSize:'0.68rem',color:'var(--txt-2)',marginBottom:4}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:900,color:s.c,lineHeight:1}}>{s.v}</p>
            {s.u&&<p style={{fontSize:'0.68rem',color:'var(--txt-2)',marginTop:2}}>{s.u}</p>}
          </div>
        ))}
      </div>
      {/* Activación */}
      <div style={{background:'rgba(0,229,255,0.07)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:'var(--radius)',padding:'1rem',marginBottom:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <p style={{fontSize:'0.78rem',color:'var(--txt-2)'}}>PRÓXIMA ACTIVACIÓN</p>
          <p style={{fontWeight:700,color:'var(--txt)',marginTop:2}}>01 de Agosto 2026</p>
        </div>
        <span style={{background:'var(--cyan)',color:'#060b1f',borderRadius:20,padding:'4px 14px',fontSize:'0.78rem',fontWeight:900}}>$200 MXN</span>
      </div>
      {/* Afiliados directos */}
      <h2 style={{fontSize:'1rem',fontWeight:700,color:'var(--gold)',marginBottom:'0.8rem'}}>MIS AFILIADOS DIRECTOS (N1)</h2>
      {afiliados.map(a=>(
        <div key={a.n} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'0.75rem 1rem',marginBottom:'0.5rem'}}>
          <div>
            <p style={{fontWeight:600,color:'var(--txt)',fontSize:'0.9rem'}}>{a.n}</p>
            <p style={{fontSize:'0.7rem',color:'var(--txt-2)',marginTop:2}}>{a.nivel} · {a.fecha}</p>
          </div>
          <span style={{width:8,height:8,borderRadius:'50%',background:a.activo?'var(--cyan)':'var(--border)',boxShadow:a.activo?'0 0 8px var(--cyan)':undefined}}/>
        </div>
      ))}
    </div>
  );
}
