// PLANNING & LOGISTICS TAB
const TabPlanning = ({checklist, setChecklist, timeline, setTimeline}) => {
  const toggleItem = (id) => {
    setChecklist(checklist.map(c => c.id===id ? {...c, done:!c.done} : c));
  };

  const categories = [...new Set(checklist.map(c=>c.category))];
  const completed = checklist.filter(c=>c.done).length;
  const total = checklist.length;

  return (
    <div>
      <div className="flex-between" style={{marginBottom:8}}>
        <div>
          <div className="eyebrow">Chapter Two</div>
          <h2 className="section-title">Planning & Logistics</h2>
          <div className="section-sub">Every little detail, lovingly arranged.</div>
        </div>
        <div className="flex-row" style={{gap:10}}>
          <button className="btn btn-ghost"><Icon.Calendar size={12}/> View Calendar</button>
          <button className="btn btn-rose"><Icon.Plus size={12}/> Add Task</button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="card" style={{marginTop:24,padding:'24px 32px'}}>
        <div className="stat-row">
          <div className="stat">
            <div className="stat-num">{completed}<span className="small"> / {total}</span></div>
            <div className="stat-label">Tasks Complete</div>
          </div>
          <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}></div>
          <div className="stat">
            <div className="stat-num">142</div>
            <div className="stat-label">Days to Go</div>
          </div>
          <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}></div>
          <div className="stat">
            <div className="stat-num">7</div>
            <div className="stat-label">Vendors Booked</div>
          </div>
          <div style={{width:1,alignSelf:'stretch',background:'var(--line)'}}></div>
          <div className="stat">
            <div className="stat-num">3</div>
            <div className="stat-label">Due This Week</div>
          </div>
          <div style={{flex:2}}>
            <div className="flex-between" style={{marginBottom:8}}>
              <span style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--ink-3)'}}>Overall Progress</span>
              <span style={{fontFamily:'Cormorant Garamond',fontSize:20,color:'var(--rose-deep)'}}>{Math.round(completed/total*100)}%</span>
            </div>
            <div className="progress" style={{height:6}}><div className="progress-fill" style={{width:`${completed/total*100}%`}}/></div>
          </div>
        </div>
      </div>

      {/* Two columns: Checklist + Timeline */}
      <div className="grid-12" style={{marginTop:24}}>
        <div className="span-8">
          <div className="card">
            <div className="flex-between mb-24">
              <div>
                <div className="eyebrow" style={{marginBottom:6}}>The Master Checklist</div>
                <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:15}}>Organized by what to tackle when</div>
              </div>
              <div className="flex-row" style={{gap:8}}>
                <button className="pill active">All</button>
                <button className="pill">Due Soon</button>
                <button className="pill">Open</button>
              </div>
            </div>

            {categories.map(cat => (
              <div key={cat} style={{marginBottom:24}}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:8}}>
                  <span className="italiana" style={{fontSize:11,color:'var(--gold)'}}>{cat}</span>
                  <div style={{flex:1,height:1,background:'var(--line)'}}></div>
                  <span style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:13,color:'var(--ink-3)'}}>
                    {checklist.filter(c=>c.category===cat && c.done).length} of {checklist.filter(c=>c.category===cat).length}
                  </span>
                </div>
                {checklist.filter(c=>c.category===cat).map(item => (
                  <div key={item.id} className="check-item">
                    <div className={'check-box '+(item.done?'checked':'')} onClick={()=>toggleItem(item.id)}></div>
                    <div className={'check-label '+(item.done?'done':'')}>{item.title}</div>
                    {item.tag && <span className={'tag '+(item.tagColor||'')}>{item.tag}</span>}
                    <div className="check-meta">{item.due}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="span-4">
          <div className="card">
            <div className="eyebrow" style={{marginBottom:6}}>Wedding Day Timeline</div>
            <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:14,marginBottom:18}}>A day in our love</div>
            <div style={{position:'relative',paddingLeft:18}}>
              <div style={{position:'absolute',left:5,top:8,bottom:8,width:1,background:'var(--gold-soft)'}}></div>
              {timeline.map((t,i) => (
                <div key={i} style={{position:'relative',paddingBottom:18}}>
                  <div style={{position:'absolute',left:-18,top:6,width:11,height:11,borderRadius:'50%',background:'var(--ivory)',border:'1px solid var(--gold)'}}></div>
                  <div style={{fontFamily:'Cormorant Garamond',fontSize:13,letterSpacing:'0.1em',color:'var(--rose-deep)',marginBottom:2}}>{t.time}</div>
                  <div style={{fontFamily:'Cormorant Garamond',fontSize:17,color:'var(--ink)'}}>{t.event}</div>
                  {t.note && <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:13,color:'var(--ink-3)',marginTop:2}}>{t.note}</div>}
                </div>
              ))}
            </div>
            <button className="pill" style={{marginTop:10,width:'100%',justifyContent:'center'}}><Icon.Plus size={11}/> Add moment</button>
          </div>

          <div className="card card-sage" style={{marginTop:24}}>
            <div className="eyebrow" style={{color:'var(--sage-deep)',marginBottom:10}}>Reminders</div>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {[
                {t:'Send save-the-dates',d:'in 4 days',icon:'mail'},
                {t:'Book florist tasting',d:'next Tuesday',icon:'flower'},
                {t:'Final dress fitting',d:'2 weeks out',icon:'dress'},
              ].map((r,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{width:34,height:34,borderRadius:'50%',background:'var(--ivory)',border:'1px solid var(--sage-soft)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--sage-deep)'}}>
                    {r.icon==='mail'? <Icon.Mail/> : r.icon==='flower'? <Icon.Flower size={14}/> : <Icon.Dress size={14}/>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Cormorant Garamond',fontSize:15,color:'var(--ink)'}}>{r.t}</div>
                    <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:12,color:'var(--sage-deep)'}}>{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
window.TabPlanning = TabPlanning;
