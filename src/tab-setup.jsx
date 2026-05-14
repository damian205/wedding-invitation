// SETUP TAB - The Beginning
const TabSetup = ({state, set}) => {
  const styles = ['Garden','Beach','Rustic','Classic','Modern','Bohemian','Vintage','Ballroom'];
  return (
    <div>
      <div className="flex-between" style={{marginBottom:8}}>
        <div>
          <div className="eyebrow">Chapter One</div>
          <h2 className="section-title">Our Love Story Begins</h2>
          <div className="section-sub">Tell us about the two of you & the day you'll say "I do."</div>
        </div>
        <div className="flex-row" style={{gap:14}}>
          <span style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:14}}>Autosaved · just now</span>
          <button className="btn btn-rose"><Icon.Sparkle size={12}/> Save Changes</button>
        </div>
      </div>

      <div className="grid-12" style={{marginTop:24}}>
        {/* Left column - Couple + Date */}
        <div className="span-8">
          <div className="card">
            <div className="eyebrow" style={{marginBottom:18}}>The Couple</div>
            <div className="field-row">
              <div className="field">
                <label>Bride's Full Name</label>
                <input value={state.bride} onChange={e=>set({bride:e.target.value})} placeholder="Her beautiful name"/>
              </div>
              <div className="field">
                <label>Groom's Full Name</label>
                <input value={state.groom} onChange={e=>set({groom:e.target.value})} placeholder="His handsome name"/>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>How You Met</label>
                <input value={state.howMet} onChange={e=>set({howMet:e.target.value})} placeholder="A summer night in Rome..."/>
              </div>
              <div className="field">
                <label>Engagement Date</label>
                <input type="date" value={state.engagementDate} onChange={e=>set({engagementDate:e.target.value})}/>
              </div>
            </div>

            <div className="divider-fancy"><span>· · ·</span></div>

            <div className="eyebrow" style={{marginBottom:18}}>The Day</div>
            <div className="field-row-3">
              <div className="field">
                <label>Wedding Date</label>
                <input type="date" value={state.weddingDate} onChange={e=>set({weddingDate:e.target.value})}/>
              </div>
              <div className="field">
                <label>Ceremony Time</label>
                <input type="time" value={state.ceremonyTime} onChange={e=>set({ceremonyTime:e.target.value})}/>
              </div>
              <div className="field">
                <label>Estimated Guests</label>
                <input type="number" value={state.guestCount} onChange={e=>set({guestCount:e.target.value})}/>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Ceremony Venue</label>
                <input value={state.ceremonyVenue} onChange={e=>set({ceremonyVenue:e.target.value})} placeholder="Château de la Roseraie"/>
              </div>
              <div className="field">
                <label>Reception Venue</label>
                <input value={state.receptionVenue} onChange={e=>set({receptionVenue:e.target.value})} placeholder="Same as ceremony, or..."/>
              </div>
            </div>
            <div className="field">
              <label>Location / City</label>
              <input value={state.location} onChange={e=>set({location:e.target.value})} placeholder="Provence, France"/>
            </div>
          </div>

          <div className="card" style={{marginTop:24}}>
            <div className="flex-between mb-24">
              <div>
                <div className="eyebrow" style={{marginBottom:8}}>Wedding Style</div>
                <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:15}}>What does your dream day feel like?</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {styles.map(s => (
                <button key={s} className={'pill '+(state.styles.includes(s)?'active':'')} onClick={()=>{
                  const next = state.styles.includes(s) ? state.styles.filter(x=>x!==s) : [...state.styles, s];
                  set({styles: next});
                }}>{s}</button>
              ))}
            </div>
            <div className="field" style={{marginTop:24}}>
              <label>A Few Words to Describe the Vibe</label>
              <textarea value={state.vibe} onChange={e=>set({vibe:e.target.value})} placeholder="Candlelit, intimate, full of dahlias and slow dancing..."/>
            </div>
          </div>
        </div>

        {/* Right column - Budget */}
        <div className="span-4">
          <div className="card card-blush">
            <div className="eyebrow" style={{color:'var(--rose-deep)'}}>Investment</div>
            <h3 className="serif" style={{fontSize:28,margin:'4px 0 18px',fontWeight:400}}>Your Budget</h3>

            <div className="field">
              <label>Total Budget</label>
              <input style={{fontSize:24,color:'var(--rose-deep)'}} value={state.budget} onChange={e=>set({budget:e.target.value})} placeholder="$0"/>
            </div>

            <div style={{marginTop:24}}>
              <div className="flex-between" style={{marginBottom:6}}>
                <span style={{fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--ink-3)'}}>Allocated</span>
                <span style={{fontFamily:'Cormorant Garamond',fontSize:18,color:'var(--ink)'}}>68%</span>
              </div>
              <div className="progress"><div className="progress-fill" style={{width:'68%'}}/></div>
              <div className="flex-between" style={{marginTop:14,fontSize:13,color:'var(--ink-2)'}}>
                <span style={{fontFamily:'Cormorant Garamond',fontStyle:'italic'}}>Spent</span>
                <span>${state.spent.toLocaleString()}</span>
              </div>
              <div className="flex-between" style={{marginTop:6,fontSize:13,color:'var(--ink-2)'}}>
                <span style={{fontFamily:'Cormorant Garamond',fontStyle:'italic'}}>Remaining</span>
                <span style={{color:'var(--sage-deep)'}}>${(Number(state.budget.replace(/\D/g,''))-state.spent).toLocaleString()}</span>
              </div>
            </div>

            <div className="divider-fancy"><span>♡</span></div>

            <div style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:14}}>Quick Breakdown</div>
            {[
              ['Venue & Catering','45%','var(--rose)'],
              ['Photography & Video','12%','var(--gold)'],
              ['Florals','10%','var(--sage)'],
              ['Attire','8%','var(--rose-deep)'],
              ['Music','7%','var(--gold-soft)'],
              ['Stationery & Misc','18%','var(--sage-deep)'],
            ].map(([cat,pct,color])=>(
              <div key={cat} style={{marginBottom:10}}>
                <div className="flex-between" style={{marginBottom:4}}>
                  <span style={{fontFamily:'Cormorant Garamond',fontSize:14}}>{cat}</span>
                  <span style={{fontSize:11,color:'var(--ink-3)'}}>{pct}</span>
                </div>
                <div className="progress" style={{height:3}}><div style={{width:pct,height:'100%',background:color}}/></div>
              </div>
            ))}
          </div>

          <div className="card card-sage" style={{marginTop:24}}>
            <div className="eyebrow" style={{color:'var(--sage-deep)'}}>Their Story</div>
            <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:22,lineHeight:1.4,color:'var(--ink)',marginTop:12}}>
              "I knew the moment I met you. I just didn't know how soon I'd marry you."
            </div>
            <div style={{fontSize:11,letterSpacing:'0.2em',color:'var(--sage-deep)',marginTop:14,textTransform:'uppercase'}}>— Add Your Vow Words</div>
          </div>
        </div>
      </div>
    </div>
  );
};
window.TabSetup = TabSetup;
