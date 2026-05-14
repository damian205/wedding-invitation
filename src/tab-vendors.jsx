// VENDORS TAB
const TabVendors = ({vendors, setVendors}) => {
  const totalBudget = vendors.reduce((s,v)=>s+v.budget,0);
  const totalSpent = vendors.reduce((s,v)=>s+(v.deposit||0),0);

  const statusColor = {
    'Booked': {bg:'#E6EBDB',c:'var(--sage-deep)'},
    'In Talks': {bg:'#EAD9B5',c:'#8A6E3F'},
    'Researching': {bg:'var(--cream-2)',c:'var(--ink-3)'},
    'Deposit Paid': {bg:'#F3DDD7',c:'var(--rose-deep)'},
  };

  return (
    <div>
      <div className="flex-between" style={{marginBottom:8}}>
        <div>
          <div className="eyebrow">Chapter Four</div>
          <h2 className="section-title">The Dream Team</h2>
          <div className="section-sub">Every artisan helping bring the day to life.</div>
        </div>
        <div className="flex-row" style={{gap:10}}>
          <button className="btn btn-ghost"><Icon.Search size={12}/> Find Vendors</button>
          <button className="btn btn-rose"><Icon.Plus size={12}/> Add Vendor</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid-12" style={{marginTop:24}}>
        <div className="span-8">
          <div className="card">
            <div className="stat-row">
              <div className="stat">
                <div className="stat-num">{vendors.filter(v=>v.status==='Booked'||v.status==='Deposit Paid').length}<span className="small"> / {vendors.length}</span></div>
                <div className="stat-label">Vendors Secured</div>
              </div>
              <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}></div>
              <div className="stat">
                <div className="stat-num">${totalBudget.toLocaleString()}</div>
                <div className="stat-label">Total Estimated</div>
              </div>
              <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}></div>
              <div className="stat">
                <div className="stat-num" style={{color:'var(--rose-deep)'}}>${totalSpent.toLocaleString()}</div>
                <div className="stat-label">Deposits Paid</div>
              </div>
            </div>
          </div>
        </div>
        <div className="span-4">
          <div className="card card-blush" style={{height:'100%'}}>
            <div className="eyebrow" style={{color:'var(--rose-deep)'}}>Next Step</div>
            <div style={{fontFamily:'Cormorant Garamond',fontSize:22,lineHeight:1.3,color:'var(--ink)',marginTop:8}}>
              Tasting with <i>Maison Olive</i> — <br/>this Saturday, 2pm
            </div>
            <button className="pill" style={{marginTop:14}}>Add to calendar →</button>
          </div>
        </div>
      </div>

      <div className="grid-12" style={{marginTop:24}}>
        <div className="span-8">
          <div className="card">
            <div className="eyebrow" style={{marginBottom:18}}>Booked & In Progress</div>
            {vendors.map(v=>{
              const sc = statusColor[v.status] || statusColor['Researching'];
              const IconCmp = {
                'Venue':Icon.Pin,'Catering':Icon.Cake,'Photography':Icon.Camera,
                'Florist':Icon.Flower,'Music & DJ':Icon.Music,'Cake & Dessert':Icon.Cake,
                'Officiant':Icon.Heart,'Hair & Makeup':Icon.Sparkle,'Stationery':Icon.Mail,'Attire':Icon.Dress
              }[v.category] || Icon.Sparkle;
              return (
                <div key={v.id} className="vendor">
                  <div className="vendor-icon"><IconCmp size={18}/></div>
                  <div>
                    <div className="vendor-name">{v.name}</div>
                    <div className="vendor-cat">{v.category} {v.contact && '· '+v.contact}</div>
                    <div className="star-rating" style={{marginTop:6}}>
                      {[1,2,3,4,5].map(i=><Icon.Star key={i} filled={i<=v.rating}/>)}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="vendor-price">${v.budget.toLocaleString()}</div>
                    <div style={{display:'inline-block',marginTop:6,padding:'4px 12px',borderRadius:999,fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',background:sc.bg,color:sc.c}}>{v.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="span-4">
          <div className="card">
            <div className="eyebrow" style={{marginBottom:14}}>Still to Book</div>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {['Videographer','Hair & Makeup Trial','Rentals & Linens','Transportation','Wedding Cake'].map(item=>(
                <div key={item} style={{display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'var(--cream-2)',border:'1px dashed var(--gold-soft)'}}></div>
                  <div style={{flex:1,fontFamily:'Cormorant Garamond',fontSize:16,color:'var(--ink)'}}>{item}</div>
                  <Icon.Plus size={12}/>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{marginTop:24,background:'linear-gradient(180deg,#F8EFE3,#F2E5D2)',border:'1px solid var(--gold-soft)'}}>
            <div className="italiana" style={{fontSize:11,color:'var(--gold)',letterSpacing:'0.32em',textTransform:'uppercase'}}>Inspiration</div>
            <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:18,lineHeight:1.4,color:'var(--ink)',marginTop:10}}>
              "The flowers should look like they were picked from the garden that morning."
            </div>
            <div style={{fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--ink-3)',marginTop:12}}>Your note to the florist</div>
          </div>
        </div>
      </div>
    </div>
  );
};
window.TabVendors = TabVendors;
