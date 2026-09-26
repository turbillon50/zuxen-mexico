
const STAKING=[
  {nivel:'BRONCE',inv:'$600',total:'$11,600',color:'#cd7f32'},
  {nivel:'PLATA',inv:'$4,000',total:'$146,000',color:'#b0b8c8'},
  {nivel:'ORO',inv:'$8,000',total:'$304,000',color:'#ffd700'},
  {nivel:'RUBÍ',inv:'$16,000',total:'$600,000',color:'#e0115f'},
  {nivel:'ESMERALDA',inv:'$40,000',total:'$1,500,000',color:'#50c878'},
  {nivel:'DIAMANTE',inv:'$100,000',total:'$3,800,000',color:'#b9f2ff'},
  {nivel:'DOBLE DIAMANTE',inv:'$200,000',total:'$6,000,000',color:'#e8f4ff'},
];
const CONCESION=[
  {inv:'$2,500 MXN',pct:'2%',desc:'Gana 2% anual de utilidades + stock doble'},
  {inv:'$5,000 MXN',pct:'4%',desc:'Gana 4% anual de utilidades + stock doble'},
  {inv:'$10,000 MXN',pct:'5%',desc:'Gana 5% anual de utilidades + stock doble'},
];
export default function Red(){
  return(
    <div style={{padding:'1.5rem 1.2rem 2rem'}}>
      <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.8rem',fontWeight:900,color:'var(--gold)'}}>PLAN DE COMPENSACIÓN</h1>
        <p style={{fontSize:'0.85rem',color:'var(--cyan)',marginTop:4}}>ZUXEN MÉXICO</p>
      </div>

      {/* ACTIVACIÓN MENSUAL */}
      <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(255,215,0,0.06))',border:'1px solid rgba(0,229,255,0.25)',borderRadius:'var(--radius)',padding:'1.2rem',marginBottom:'2rem'}}>
        <p style={{fontWeight:700,color:'var(--cyan)',marginBottom:6}}>ACTIVACIÓN MENSUAL</p>
        <p style={{fontSize:'0.85rem',color:'var(--txt)',lineHeight:1.6}}>
          $200 MXN/mes te permite cobrar de tu red y comprar a precio distribuidor con hasta 50% de descuento.
          Al comprar un B.A. de 1 Núcleo y activarte obtienes acceso completo.
        </p>
      </div>

      {/* STAKING */}
      <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--gold)',marginBottom:'1rem'}}>STAKING DE APALANCAMIENTO</h2>
      {STAKING.map(s=>(
        <div key={s.nivel} style={{display:'flex',alignItems:'center',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'0.9rem 1.1rem',marginBottom:'0.6rem',gap:'1rem'}}>
          <div style={{width:10,height:10,borderRadius:'50%',background:s.color,boxShadow:`0 0 10px ${s.color}`,flexShrink:0}}/>
          <div style={{flex:1}}>
            <p style={{fontWeight:700,color:'var(--txt)',fontSize:'0.9rem'}}>{s.nivel}</p>
            <p style={{fontSize:'0.75rem',color:'var(--txt-2)'}}>Inversión: {s.inv} MXN</p>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{fontWeight:900,color:s.color,fontSize:'1rem'}}>{s.total}</p>
            <p style={{fontSize:'0.65rem',color:'var(--txt-2)'}}>MXN total</p>
          </div>
        </div>
      ))}
      <p style={{fontSize:'0.75rem',color:'var(--txt-2)',marginBottom:'2rem',marginTop:'0.5rem',lineHeight:1.5,opacity:.8}}>
        Cada vez que pasas de una matriz a otra vuelves a cobrar la anterior, siempre que tu cuenta esté activa.
      </p>

      {/* MATRIZ EMPOWER UP */}
      <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--gold)',marginBottom:'1rem'}}>MATRIZ EMPOWER UP</h2>
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.2rem',marginBottom:'2rem'}}>
        <p style={{fontSize:'0.85rem',color:'var(--txt-2)',lineHeight:1.6,marginBottom:'1rem'}}>
          Gana de tu red de afiliados. La matriz cerrada se activa con 4 directos en tu primer nivel.
        </p>
        {[{n:'Nivel 1',c:5,cols:'#00e5ff'},{n:'Nivel 2',c:25,cols:'#00b8cc'},{n:'Nivel 3',c:125,cols:'#009aaa'}].map(l=>(
          <div key={l.n} style={{display:'flex',justifyContent:'space-between',padding:'0.6rem 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{color:'var(--txt-2)',fontSize:'0.85rem'}}>{l.n}</span>
            <span style={{color:l.cols,fontWeight:700}}>{l.c} afiliados</span>
          </div>
        ))}
        <p style={{fontSize:'0.75rem',color:'var(--txt-2)',marginTop:'0.8rem',opacity:.8}}>
          Sistema binario: 5% (2 directos) → 10% (25 registros) → 20% (125 afiliados).
          Registro base $600 MXN. El excedente queda comisionable en binario.
        </p>
      </div>

      {/* CONCESIÓN REGIONAL */}
      <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--gold)',marginBottom:'1rem'}}>CONCESIÓN REGIONAL</h2>
      {CONCESION.map(c=>(
        <div key={c.inv} style={{background:'var(--surface)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:'var(--radius)',padding:'1rem 1.2rem',marginBottom:'0.6rem',display:'flex',alignItems:'center',gap:'1rem'}}>
          <span style={{fontSize:'2rem',fontWeight:900,color:'var(--gold)',lineHeight:1}}>{c.pct}</span>
          <div>
            <p style={{fontWeight:700,color:'var(--txt)',fontSize:'0.85rem'}}>{c.inv}</p>
            <p style={{fontSize:'0.78rem',color:'var(--txt-2)'}}>{c.desc}</p>
          </div>
        </div>
      ))}
      <p style={{fontSize:'0.75rem',color:'var(--txt-2)',marginTop:'0.5rem',lineHeight:1.5,opacity:.8}}>
        Gana sobre ventas al corte anual del precio distribuidor en tu polígono de influencia.
        Obtén stock a consignación por el doble de tu compra de concesión a precio distribuidor.
      </p>
    </div>
  );
}
