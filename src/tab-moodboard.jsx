// MOODBOARD & MEMORIES TAB
const TabMoodboard = ({moodboard, setMoodboard, palette, setPalette}) => {
  const fileInputRef = React.useRef();

  const handleUpload = (e, slotId) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMoodboard(moodboard.map(m => m.id===slotId ? {...m, src: ev.target.result} : m));
    };
    reader.readAsDataURL(file);
  };

  const addTile = () => {
    setMoodboard([...moodboard, {
      id: Date.now(),
      label: 'New inspiration',
      src: null,
      colSpan: 3, rowSpan: 2,
    }]);
  };

  const removeTile = (id) => {
    setMoodboard(moodboard.filter(m => m.id!==id));
  };

  const updatePaletteColor = (i, color) => {
    setPalette(palette.map((p,idx)=> idx===i ? {...p, color} : p));
  };

  return (
    <div>
      <div className="flex-between" style={{marginBottom:8}}>
        <div>
          <div className="eyebrow">Chapter Five</div>
          <h2 className="section-title">Memories & Moodboard</h2>
          <div className="section-sub">Visions, palettes, and the little things that inspire it all.</div>
        </div>
        <div className="flex-row" style={{gap:10}}>
          <button className="btn btn-ghost"><Icon.Sparkle size={12}/> Inspire Me</button>
          <button className="btn btn-rose" onClick={()=>fileInputRef.current.click()}><Icon.Upload size={12}/> Upload</button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
            const file = e.target.files[0]; if(!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
              setMoodboard([...moodboard, {id:Date.now(),label:file.name.replace(/\.[^.]+$/,''),src:ev.target.result,colSpan:3,rowSpan:3}]);
            };
            reader.readAsDataURL(file);
          }}/>
        </div>
      </div>

      <div className="grid-12" style={{marginTop:24}}>
        {/* Color palette */}
        <div className="span-12">
          <div className="card">
            <div className="flex-between" style={{marginBottom:18}}>
              <div>
                <div className="eyebrow" style={{marginBottom:6}}>The Palette</div>
                <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:15}}>Click any swatch to recolor</div>
              </div>
              <div className="flex-row" style={{gap:8}}>
                <button className="pill">Romantic Garden</button>
                <button className="pill active">Dusty Rose</button>
                <button className="pill">Italian Coast</button>
                <button className="pill">Modern Ivory</button>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:18}}>
              {palette.map((p,i)=>(
                <div key={i} style={{textAlign:'center'}}>
                  <label style={{cursor:'pointer',display:'block'}}>
                    <input type="color" value={p.color} onChange={e=>updatePaletteColor(i,e.target.value)} style={{display:'none'}}/>
                    <div className="swatch" style={{background:p.color}}></div>
                  </label>
                  <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:15,color:'var(--ink)',marginTop:10}}>{p.name}</div>
                  <div style={{fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--ink-3)',marginTop:4}}>{p.color}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moodboard tiles */}
        <div className="span-8">
          <div className="card">
            <div className="flex-between mb-24">
              <div>
                <div className="eyebrow" style={{marginBottom:6}}>Visual Inspiration</div>
                <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:15}}>Drop in dresses, florals, table settings, anything that sparks joy</div>
              </div>
              <button className="pill" onClick={addTile}><Icon.Plus size={10}/> Add slot</button>
            </div>

            <div className="moodboard">
              {moodboard.map(m => (
                <div key={m.id} className="mood-tile" style={{gridColumn:`span ${m.colSpan}`,gridRow:`span ${m.rowSpan}`,position:'relative'}}>
                  {m.src ? (
                    <>
                      <img src={m.src} alt={m.label}/>
                      <div className="mood-tile-label">{m.label}</div>
                      <button onClick={()=>removeTile(m.id)} style={{position:'absolute',top:8,right:8,width:24,height:24,borderRadius:'50%',background:'rgba(255,255,255,0.9)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--rose-deep)',border:'none',cursor:'pointer'}}><Icon.X/></button>
                    </>
                  ) : (
                    <label className="mood-placeholder" style={{cursor:'pointer',width:'100%',height:'100%'}}>
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleUpload(e, m.id)}/>
                      <Icon.Upload size={18}/>
                      <span>{m.label}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side: signature scent + first dance + extras */}
        <div className="span-4">
          <div className="card card-blush">
            <div className="eyebrow" style={{color:'var(--rose-deep)',marginBottom:14}}>Little Details</div>

            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:6}}>Signature Scent</div>
              <input defaultValue="Tuberose, jasmine & a little vanilla" style={{width:'100%',border:'none',borderBottom:'1px solid var(--rose-soft)',background:'transparent',padding:'8px 0',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:17,color:'var(--ink)',outline:'none'}}/>
            </div>

            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:6}}>First Dance Song</div>
              <input defaultValue="Something slow & swaying" style={{width:'100%',border:'none',borderBottom:'1px solid var(--rose-soft)',background:'transparent',padding:'8px 0',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:17,color:'var(--ink)',outline:'none'}}/>
            </div>

            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:6}}>Something Borrowed</div>
              <input defaultValue="Grandmother's pearl earrings" style={{width:'100%',border:'none',borderBottom:'1px solid var(--rose-soft)',background:'transparent',padding:'8px 0',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:17,color:'var(--ink)',outline:'none'}}/>
            </div>

            <div>
              <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:6}}>Something Blue</div>
              <input defaultValue="A ribbon in my bouquet" style={{width:'100%',border:'none',borderBottom:'1px solid var(--rose-soft)',background:'transparent',padding:'8px 0',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:17,color:'var(--ink)',outline:'none'}}/>
            </div>
          </div>

          <div className="card" style={{marginTop:24,padding:0,overflow:'hidden'}}>
            <div style={{padding:'24px 28px'}}>
              <div className="eyebrow" style={{marginBottom:10}}>The Playlist</div>
              <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',color:'var(--ink-3)',fontSize:14,marginBottom:14}}>Songs that feel like us</div>
              {[
                ['First Dance','Tap to add',true],
                ['Walk Down the Aisle','Tap to add',false],
                ['Father-Daughter Dance','Tap to add',false],
                ['Last Dance','Tap to add',false],
              ].map(([m,t],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:i<3?'1px dashed var(--line)':'none'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:'var(--cream-2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--gold)'}}><Icon.Music size={14}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--ink-3)'}}>{m}</div>
                    <div style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:15,color:'var(--ink-2)'}}>{t}</div>
                  </div>
                  <Icon.Plus size={11}/>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-sage" style={{marginTop:24}}>
            <div className="eyebrow" style={{color:'var(--sage-deep)',marginBottom:12}}>A Love Note</div>
            <textarea
              defaultValue="The first time we said it back to each other was on a balcony in late September. The whole sky was pink, and you looked at me like I was the sunset."
              style={{width:'100%',border:'none',background:'transparent',fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:17,lineHeight:1.5,color:'var(--ink)',outline:'none',minHeight:140}}/>
          </div>
        </div>
      </div>
    </div>
  );
};
window.TabMoodboard = TabMoodboard;
