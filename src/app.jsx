// MAIN APP
const { useState, useEffect, useMemo } = React;

const TABS = [
  {id:'setup', num:'I', label:'The Beginning'},
  {id:'planning', num:'II', label:'Planning'},
  {id:'guests', num:'III', label:'Guests'},
  {id:'vendors', num:'IV', label:'Vendors'},
  {id:'moodboard', num:'V', label:'Moodboard'},
];

function App(){
  const [tab, setTab] = useState('setup');

  // Setup state
  const [setup, setSetup] = useState({
    bride: 'Eloise Marigold',
    groom: 'Theodore Hayes',
    howMet: 'A summer party in Provence, 2022',
    engagementDate: '2025-12-21',
    weddingDate: '2026-10-03',
    ceremonyTime: '16:00',
    guestCount: 120,
    ceremonyVenue: 'Château de la Roseraie',
    receptionVenue: 'The Orangery, on the grounds',
    location: 'Aix-en-Provence, France',
    styles: ['Garden','Classic','Bohemian'],
    vibe: 'Candlelit and overflowing with garden roses. Long tables under olive trees, mismatched crystal, the kind of slow-dancing that lasts until the stars come out.',
    budget: '$85,000',
    spent: 57800,
  });
  const updateSetup = (patch) => setSetup({...setup, ...patch});

  // Checklist
  const [checklist, setChecklist] = useState([
    {id:1,category:'12 Months Out',title:'Set the wedding date & book the venue',done:true,due:'Done',tag:'Done',tagColor:'sage'},
    {id:2,category:'12 Months Out',title:'Decide on overall vision & color palette',done:true,due:'Done'},
    {id:3,category:'12 Months Out',title:'Draft guest list with families',done:true,due:'Done'},
    {id:4,category:'12 Months Out',title:'Book photographer & videographer',done:true,due:'Done',tag:'Priority',tagColor:'rose'},

    {id:5,category:'6 Months Out',title:'Order the wedding dress',done:true,due:'Done'},
    {id:6,category:'6 Months Out',title:'Send save-the-dates',done:false,due:'In 4 days',tag:'Due Soon',tagColor:'rose'},
    {id:7,category:'6 Months Out',title:'Book florist & finalize blooms',done:false,due:'Next week'},
    {id:8,category:'6 Months Out',title:'Reserve hotel block for guests',done:true,due:'Done'},
    {id:9,category:'6 Months Out',title:'Plan the rehearsal dinner',done:false,due:'In 3 weeks'},

    {id:10,category:'3 Months Out',title:'Final menu tasting',done:false,due:'July 14',tag:'Scheduled',tagColor:'gold'},
    {id:11,category:'3 Months Out',title:'Order wedding bands',done:false,due:'August'},
    {id:12,category:'3 Months Out',title:'Send invitations',done:false,due:'August 1'},
    {id:13,category:'3 Months Out',title:'Write the vows ♡',done:false,due:'September',tag:'No Rush',tagColor:''},

    {id:14,category:'1 Month Out',title:'Final dress fitting',done:false,due:'September 19'},
    {id:15,category:'1 Month Out',title:'Confirm timeline with all vendors',done:false,due:'2 weeks out'},
    {id:16,category:'1 Month Out',title:'Pack honeymoon bags',done:false,due:'Last week'},
  ]);

  // Timeline
  const [timeline] = useState([
    {time:'10:00 AM',event:'Bridal prep',note:'Champagne with the girls'},
    {time:'2:00 PM',event:'First look',note:'In the rose garden'},
    {time:'4:00 PM',event:'Ceremony begins',note:'Under the olive trees'},
    {time:'5:00 PM',event:'Cocktail hour',note:'Live strings, aperitivo'},
    {time:'6:30 PM',event:'Dinner is served',note:'Long tables, candlelight'},
    {time:'9:00 PM',event:'First dance'},
    {time:'11:30 PM',event:'Late-night bites'},
    {time:'1:00 AM',event:'Sparkler send-off'},
  ]);

  // Guests
  const [guests, setGuests] = useState([
    {id:1,name:'Camille Beaumont',side:'Bride',group:'Bridesmaid',rsvp:'yes',plusOne:true,dietary:'Vegetarian',table:'Head'},
    {id:2,name:'Maximilian Hayes',side:'Groom',group:'Best Man',rsvp:'yes',plusOne:true,dietary:'',table:'Head'},
    {id:3,name:'Isabelle Marigold',side:'Bride',group:'Mother',rsvp:'yes',plusOne:true,dietary:'Gluten-free',table:'1'},
    {id:4,name:'Frederick Hayes',side:'Groom',group:'Father',rsvp:'yes',plusOne:true,dietary:'',table:'1'},
    {id:5,name:'Juliet Pemberton',side:'Bride',group:'College friend',rsvp:'pending',plusOne:true,dietary:'',table:'4'},
    {id:6,name:'Oliver Sinclair',side:'Groom',group:'Childhood friend',rsvp:'yes',plusOne:false,dietary:'Pescatarian',table:'5'},
    {id:7,name:'Aunt Margaret',side:'Bride',group:'Family',rsvp:'yes',plusOne:false,dietary:'',table:'2'},
    {id:8,name:'Henry & Cordelia Ashe',side:'Groom',group:'Family friends',rsvp:'pending',plusOne:false,dietary:'',table:'6'},
    {id:9,name:'Sophia Tremblay',side:'Bride',group:'Work',rsvp:'no',plusOne:false,dietary:'',table:'—'},
    {id:10,name:'James Whitfield',side:'Groom',group:'Cousin',rsvp:'yes',plusOne:true,dietary:'',table:'3'},
    {id:11,name:'Eleanor Voss',side:'Bride',group:'Bridesmaid',rsvp:'yes',plusOne:false,dietary:'Vegan',table:'Head'},
    {id:12,name:'Nathaniel Cole',side:'Groom',group:'Groomsman',rsvp:'pending',plusOne:true,dietary:'',table:'Head'},
  ]);

  // Vendors
  const [vendors, setVendors] = useState([
    {id:1,name:'Château de la Roseraie',category:'Venue',contact:'events@laroseraie.fr',budget:32000,deposit:16000,rating:5,status:'Deposit Paid'},
    {id:2,name:'Maison Olive',category:'Catering',contact:'Chef Lucien',budget:18500,deposit:5000,rating:5,status:'Booked'},
    {id:3,name:'Étoile Photography',category:'Photography',contact:'Camille Étoile',budget:6800,deposit:2000,rating:5,status:'Booked'},
    {id:4,name:'Les Fleurs Sauvages',category:'Florist',contact:'Margaux · @lesfleurs',budget:5400,deposit:0,rating:4,status:'In Talks'},
    {id:5,name:'Velvet Strings Quartet',category:'Music & DJ',contact:'Bookings, Marseille',budget:3200,deposit:800,rating:4,status:'Booked'},
    {id:6,name:'Pâtisserie Amour',category:'Cake & Dessert',contact:'Tasting Saturday',budget:1600,deposit:0,rating:5,status:'In Talks'},
    {id:7,name:'Atelier Linnea',category:'Stationery',contact:'Hand-pressed invites',budget:2200,deposit:600,rating:5,status:'Deposit Paid'},
  ]);

  // Moodboard
  const [moodboard, setMoodboard] = useState([
    {id:1,label:'The dress, draped',colSpan:5,rowSpan:4,src:null},
    {id:2,label:'Bouquet — garden roses & olive',colSpan:4,rowSpan:3,src:null},
    {id:3,label:'Tablescape',colSpan:3,rowSpan:3,src:null},
    {id:4,label:'Reception lighting',colSpan:3,rowSpan:2,src:null},
    {id:5,label:'Hair & veil inspiration',colSpan:4,rowSpan:2,src:null},
    {id:6,label:'Stationery suite',colSpan:5,rowSpan:2,src:null},
    {id:7,label:'Cake — soft, simple, single tier',colSpan:4,rowSpan:3,src:null},
    {id:8,label:'Bridesmaid dresses',colSpan:4,rowSpan:3,src:null},
    {id:9,label:'Aisle florals',colSpan:4,rowSpan:3,src:null},
  ]);

  // Palette
  const [palette, setPalette] = useState([
    {name:'Dusty Rose',color:'#C99A93'},
    {name:'Blush',color:'#F2DDD6'},
    {name:'Champagne',color:'#E5CFA8'},
    {name:'Olive',color:'#A8B59B'},
    {name:'Cream',color:'#F8EFE3'},
    {name:'Soft Ink',color:'#3D2E2A'},
  ]);

  // Countdown to wedding date
  const daysToWedding = useMemo(()=>{
    const d = new Date(setup.weddingDate);
    const now = new Date('2026-05-14');
    return Math.max(0, Math.ceil((d - now)/(1000*60*60*24)));
  }, [setup.weddingDate]);

  const formatDate = (s) => {
    if(!s) return '';
    const d = new Date(s);
    return d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
  };

  return (
    <div className="app">
      {/* Top bar */}
      <div className="top-bar">
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-name">MAISON</div>
            <div className="brand-sub">your wedding, beautifully kept</div>
          </div>
        </div>
        <div className="top-actions">
          <span><span className="dot"></span>Autosaving</span>
          <span>Help</span>
          <span>Settings</span>
          <div style={{width:36,height:36,borderRadius:'50%',background:'var(--blush)',border:'1px solid var(--rose-soft)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--rose-deep)',fontFamily:'Cormorant Garamond',fontStyle:'italic'}}>E</div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        <div className="hero-row">
          <div className="hero-left">
            <div className="hero-eyebrow">— a love story in the making —</div>
            <div className="hero-names">
              {setup.bride.split(' ')[0]}
              <span className="hero-amp">&</span>
              {setup.groom.split(' ')[0]}
            </div>
            <div className="hero-meta">
              <div>
                <div className="label">The Date</div>
                <b>{formatDate(setup.weddingDate)}</b>
              </div>
              <div>
                <div className="label">The Place</div>
                <b>{setup.location}</b>
              </div>
              <div>
                <div className="label">Guests</div>
                <b>{setup.guestCount} loved ones</b>
              </div>
            </div>
          </div>
          <div className="countdown">
            <div className="countdown-num">{daysToWedding}</div>
            <div className="countdown-italic">days until forever</div>
            <div className="countdown-label">·  ·  ·</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map(t => (
          <div key={t.id} className={'tab '+(tab===t.id?'active':'')} onClick={()=>setTab(t.id)}>
            <span className="tab-num">{t.num}.</span>
            <span>{t.label}</span>
          </div>
        ))}
        <div style={{flex:1}}></div>
        <div style={{padding:'18px 0',display:'flex',alignItems:'center',gap:10,color:'var(--ink-3)'}}>
          <Icon.Heart size={12} filled={true}/>
          <span style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:14}}>{daysToWedding} days to go</span>
        </div>
      </div>

      {/* Content */}
      {tab==='setup' && <TabSetup state={setup} set={updateSetup}/>}
      {tab==='planning' && <TabPlanning checklist={checklist} setChecklist={setChecklist} timeline={timeline} setTimeline={()=>{}}/>}
      {tab==='guests' && <TabGuests guests={guests} setGuests={setGuests}/>}
      {tab==='vendors' && <TabVendors vendors={vendors} setVendors={setVendors}/>}
      {tab==='moodboard' && <TabMoodboard moodboard={moodboard} setMoodboard={setMoodboard} palette={palette} setPalette={setPalette}/>}

      {/* Footer */}
      <div style={{textAlign:'center',marginTop:64,paddingTop:32,borderTop:'1px solid var(--line)'}}>
        <div style={{color:'var(--gold)',fontFamily:'Italiana',serif:'true',letterSpacing:'0.4em',fontSize:11,marginBottom:8}}>♡  M A I S O N  ♡</div>
        <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:14}}>
          made with love · all your planning, in one beautiful place
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
