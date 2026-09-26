
export default function Perfil(){
  const dist={nombre:'Alejandro Martínez',nivel:'BRONCE',codigo:'ZX-78432',activo:true,ganancias:[
    {mes:'Jun 2026',monto:1240},{mes:'May 2026',monto:980},{mes:'Abr 2026',monto:560},
  ]};
  return(
    <div style={{padding:'1.5rem 1.2rem 2rem'}}>
      {/* Header */}
      <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--gold))',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',fontWeight:900,color:'#060b1f'}}>
          {dist.nombre[0]}
        </div>
        <h1 style={{fontSize:'1.4rem',fontWeight:900,color:'var(--txt)',marginTop:'0.8rem'}}>{dist.nombre}</h1>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(205,127,50,0.15)',border:'1px solid rgba(205,127,50,0.4)',borderRadius:20,padding:'4px 14px',marginTop:8}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:'#cd7f32',boxShadow:'0 0 8px #cd7f32'}}/>
          <span style={{fontSize:'0.8rem',fontWeight:700,color:'#cd7f32'}}>{dist.nivel}</span>
        </div>
      </div>

      {/* Estado activación */}
      <div style={{background:dist.activo?'rgba(0,229,255,0.08)':'rgba(255,100,100,0.08)',border:`1px solid ${dist.activo?'rgba(0,229,255,0.25)':'rgba(255,100,100,0.25)'}`,borderRadius:'var(--radius)',padding:'1rem',marginBottom:'1.2rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'0.85rem',color:'var(--txt)'}}>Estado de activación</span>
        <span style={{fontWeight:700,color:dist.activo?'var(--cyan)':'#ff6464',fontSize:'0.85rem'}}>{dist.activo?'ACTIVO':'INACTIVO'}</span>
      </div>

      {/* Código de referido */}
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1rem',marginBottom:'1.2rem'}}>
        <p style={{fontSize:'0.72rem',color:'var(--txt-2)',marginBottom:4}}>MI CÓDIGO DE DISTRIBUIDOR</p>
        <p style={{fontSize:'1.4rem',fontWeight:900,color:'var(--gold)',letterSpacing:'0.1em'}}>{dist.codigo}</p>
        <p style={{fontSize:'0.72rem',color:'var(--txt-2)',marginTop:4}}>Comparte este código para crecer tu red</p>
      </div>

      {/* Historial de ganancias */}
      <h2 style={{fontSize:'1rem',fontWeight:700,color:'var(--gold)',marginBottom:'0.8rem'}}>HISTORIAL DE GANANCIAS</h2>
      {dist.ganancias.map(g=>(
        <div key={g.mes} style={{display:'flex',justifyContent:'space-between',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'0.8rem 1rem',marginBottom:'0.5rem'}}>
          <span style={{color:'var(--txt-2)',fontSize:'0.85rem'}}>{g.mes}</span>
          <span style={{fontWeight:700,color:'var(--cyan)'}}>${g.monto.toLocaleString()} MXN</span>
        </div>
      ))}

      {/* Botón compartir */}
      <button style={{width:'100%',marginTop:'1.5rem',padding:'0.9rem',background:'linear-gradient(135deg,var(--gold-2),var(--gold))',color:'#060b1f',borderRadius:50,fontWeight:900,fontSize:'1rem',border:'none',cursor:'pointer'}}>
        COMPARTIR MI RED
      </button>
      <button style={{width:'100%',marginTop:'0.8rem',padding:'0.8rem',background:'transparent',color:'var(--cyan)',borderRadius:50,fontWeight:600,fontSize:'0.9rem',border:'1px solid var(--cyan)',cursor:'pointer'}}>
        CERRAR SESIÓN
      </button>
    </div>
  );
}
