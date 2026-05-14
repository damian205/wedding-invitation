// GUEST MANAGEMENT TAB
const TabGuests = ({guests, setGuests}) => {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [newName, setNewName] = React.useState('');

  const filtered = guests.filter(g => {
    if(filter==='confirmed' && g.rsvp!=='yes') return false;
    if(filter==='declined' && g.rsvp!=='no') return false;
    if(filter==='pending' && g.rsvp!=='pending') return false;
    if(filter==='bride' && g.side!=='Bride') return false;
    if(filter==='groom' && g.side!=='Groom') return false;
    if(search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    total: guests.length,
    confirmed: guests.filter(g=>g.rsvp==='yes').length,
    declined: guests.filter(g=>g.rsvp==='no').length,
    pending: guests.filter(g=>g.rsvp==='pending').length,
  };

  const cycleRsvp = (id) => {
    const next = {'pending':'yes','yes':'no','no':'pending'};
    setGuests(guests.map(g => g.id===id ? {...g, rsvp:next[g.rsvp]} : g));
  };

  const addGuest = () => {
    if(!newName.trim()) return;
    setGuests([...guests, {id:Date.now(), name:newName, side:'Bride', group:'Friend', rsvp:'pending', plusOne:false, dietary:'', table:'—'}]);
    setNewName('');
  };

  return (
    <div>
      <div className="flex-between" style={{marginBottom:8}}>
        <div>
          <div className="eyebrow">Chapter Three</div>
          <h2 className="section-title">Our Cherished Guests</h2>
          <div className="section-sub">Everyone we love, in one place.</div>
        </div>
        <div className="flex-row" style={{gap:10}}>
          <button className="btn btn-ghost"><Icon.Mail size={12}/> Send Invites</button>
          <button className="btn btn-rose"><Icon.Plus size={12}/> Add Guest</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid-12" style={{marginTop:24}}>
        <div className="span-4">
          <div className="card">
            <div className="flex-between" style={{alignItems:'flex-start'}}>
              <div>
                <div className="stat-num" style={{color:'var(--rose-deep)'}}>{counts.total}</div>
                <div className="stat-label">Total Invited</div>
              </div>
              <Icon.Heart size={20} filled={true}/>
            </div>
          </div>
        </div>
        <div className="span-4">
          <div className="card card-sage">
            <div className="flex-between" style={{alignItems:'flex-start'}}>
              <div>
                <div className="stat-num" style={{color:'var(--sage-deep)'}}>{counts.confirmed}</div>
                <div className="stat-label">Will Attend</div>
              </div>
              <Icon.Champagne size={22}/>
            </div>
          </div>
        </div>
        <div className="span-4">
          <div className="card card-blush">
            <div className="flex-between" style={{alignItems:'flex-start'}}>
              <div>
                <div className="stat-num" style={{color:'var(--rose-deep)'}}>{counts.pending}</div>
                <div className="stat-label">Awaiting Reply</div>
              </div>
              <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:22,color:'var(--rose-deep)'}}>RSVP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + search */}
      <div className="card" style={{marginTop:24,padding:'18px 24px'}}>
        <div className="flex-between">
          <div className="flex-row" style={{gap:8,flexWrap:'wrap'}}>
            {[
              ['all','All Guests'],
              ['confirmed','Coming'],
              ['pending','Pending'],
              ['declined','Can\'t Make It'],
              ['bride','Bride\'s Side'],
              ['groom','Groom\'s Side'],
            ].map(([k,l])=>(
              <button key={k} className={'pill '+(filter===k?'active':'')} onClick={()=>setFilter(k)}>{l}</button>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,borderBottom:'1px solid var(--line)',padding:'4px 0',minWidth:240}}>
            <Icon.Search/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name..." style={{border:'none',background:'transparent',outline:'none',width:'100%',fontFamily:'Cormorant Garamond',fontSize:15}}/>
          </div>
        </div>
      </div>

      {/* Guest table */}
      <div className="card" style={{marginTop:24,padding:'8px 24px 16px'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Side</th>
              <th>Group</th>
              <th>+1</th>
              <th>Dietary</th>
              <th>Table</th>
              <th style={{textAlign:'right'}}>RSVP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g=>(
              <tr key={g.id}>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:34,height:34,borderRadius:'50%',background:g.side==='Bride'?'var(--blush)':'var(--sage-soft)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cormorant Garamond',fontStyle:'italic',color:g.side==='Bride'?'var(--rose-deep)':'var(--sage-deep)',fontSize:14}}>
                      {g.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                    </div>
                    {g.name}
                  </div>
                </td>
                <td><span className={'tag '+(g.side==='Bride'?'rose':'sage')}>{g.side}</span></td>
                <td style={{color:'var(--ink-2)',fontSize:14}}>{g.group}</td>
                <td>
                  <span style={{color:g.plusOne?'var(--rose-deep)':'var(--ink-3)',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:15}}>
                    {g.plusOne ? '+ Yes' : '—'}
                  </span>
                </td>
                <td style={{fontStyle:'italic',color:'var(--ink-2)',fontSize:14}}>{g.dietary||'—'}</td>
                <td style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-2)'}}>{g.table}</td>
                <td style={{textAlign:'right'}}>
                  <button onClick={()=>cycleRsvp(g.id)} className={'rsvp-badge '+(g.rsvp==='yes'?'rsvp-yes':g.rsvp==='no'?'rsvp-no':'rsvp-pending')} style={{cursor:'pointer',border:'none'}}>
                    {g.rsvp==='yes'?'Attending':g.rsvp==='no'?'Regrets':'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-row">
          <input value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addGuest()}} placeholder="Add a guest by name..."/>
          <button className="btn btn-rose" onClick={addGuest}><Icon.Plus size={12}/> Add</button>
        </div>
      </div>
    </div>
  );
};
window.TabGuests = TabGuests;
