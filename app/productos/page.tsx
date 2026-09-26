
interface Prod{name:string;pub:number;dist:number;note?:string;}
const CATS:[string,Prod[]][]=[
  ['BIOACTIVADORES PERSONAS',[
    {name:'B.A. 1 Núcleo',pub:600,dist:400},
    {name:'B.A. 2 Núcleos',pub:1000,dist:500},
    {name:'B.A. 4 Núcleos',pub:2000,dist:1000},
    {name:'B.A. 1P',pub:6000,dist:3000},
    {name:'B.A. 2P',pub:10000,dist:5000},
  ]],
  ['BIOACTIVADORES PETS',[
    {name:'Gatito (chico)',pub:300,dist:200,note:'Medio y 2-4 núcleos también disponibles'},
    {name:'Perrito (chico)',pub:500,dist:300},
  ]],
  ['MEDBED — CAMAS DE ENERGÍA',[
    {name:'Cama Pets',pub:2000,dist:1000},
    {name:'Cama Basic',pub:25000,dist:12500},
    {name:'Cama Master',pub:50000,dist:25000},
  ]],
];
function disc(pub:number,dist:number){return Math.round((pub-dist)/pub*100);}
export default function Productos(){
  return(
    <div style={{padding:'1.5rem 1.2rem 2rem'}}>
      <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.8rem',fontWeight:900,color:'var(--gold)'}}>CATÁLOGO</h1>
        <p style={{fontSize:'0.85rem',color:'var(--cyan)',marginTop:4}}>PRECIOS OFICIALES ZUXEN MÉXICO</p>
      </div>
      {CATS.map(([cat,items])=>(
        <div key={cat} style={{marginBottom:'2rem'}}>
          <h2 style={{fontSize:'0.8rem',fontWeight:700,color:'var(--cyan)',letterSpacing:'0.12em',marginBottom:'1rem',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>{cat}</h2>
          {items.map(p=>(
            <div key={p.name} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.2rem',marginBottom:'0.8rem',position:'relative'}}>
              <div style={{position:'absolute',top:12,right:12,background:'linear-gradient(135deg,var(--gold-2),var(--gold))',color:'#060b1f',borderRadius:20,padding:'2px 10px',fontSize:'0.72rem',fontWeight:900}}>
                -{disc(p.pub,p.dist)}%
              </div>
              <p style={{fontWeight:700,color:'var(--txt)',fontSize:'1rem',paddingRight:60}}>{p.name}</p>
              {p.note&&<p style={{fontSize:'0.72rem',color:'var(--txt-2)',marginTop:3}}>{p.note}</p>}
              <div style={{display:'flex',gap:'1.5rem',marginTop:'0.8rem'}}>
                <div>
                  <p style={{fontSize:'0.68rem',color:'var(--txt-2)'}}>PRECIO PÚBLICO</p>
                  <p style={{fontSize:'1.4rem',fontWeight:900,color:'var(--txt)'}}>\${p.pub.toLocaleString()}</p>
                  <p style={{fontSize:'0.68rem',color:'var(--txt-2)'}}>MXN</p>
                </div>
                <div style={{width:1,background:'var(--border)'}}/>
                <div>
                  <p style={{fontSize:'0.68rem',color:'var(--cyan)'}}>PRECIO DISTRIBUIDOR</p>
                  <p style={{fontSize:'1.4rem',fontWeight:900,color:'var(--cyan)'}}>\${p.dist.toLocaleString()}</p>
                  <p style={{fontSize:'0.68rem',color:'var(--cyan)'}}>MXN</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* Binario note */}
      <div style={{background:'rgba(0,229,255,0.06)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:'var(--radius)',padding:'1rem',fontSize:'0.8rem',color:'var(--txt-2)',lineHeight:1.6}}>
        Comisión binario 5%-10%-15% sobre compras adicionales de tu red.
        Activación mensual: $200 MXN para cobrar de tu red.
      </div>
    </div>
  );
}
