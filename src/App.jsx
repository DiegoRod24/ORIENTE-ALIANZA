import { useMemo, useState } from 'react'

const songs = [1,2,3,4,5].map((id) => ({ id, title: `Canto ${String(id).padStart(2,'0')}` }))

function App(){
  const [tab,setTab]=useState('inicio')
  const [liveMode,setLiveMode]=useState('PREVIA')
  const [currentSong,setCurrentSong]=useState(4)
  const [notice,setNotice]=useState('Faltan 12 minutos. Ten tus globos preparados.')
  const [adminOpen,setAdminOpen]=useState(false)
  const [orderReady,setOrderReady]=useState(true)
  const liveLabel=useMemo(()=> liveMode==='CANTO' ? `CANTO ${String(currentSong).padStart(2,'0')}` : liveMode==='GLOBOS' ? 'GLOBOS ARRIBA' : liveMode==='MANTO' ? 'MANTO EN TU SECTOR' : 'PREVIA',[liveMode,currentSong])

  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar">
      <button className="brand" onClick={()=>setTab('inicio')}><span className="brand-mark">OA</span><span><b>ORIENTE</b><small>Modo tribuna</small></span></button>
      <div className="top-actions"><span className="live-pill"><span className="pulse"/> PILOTO</span><button className="icon-button" onClick={()=>setAdminOpen(true)}>⚙️</button></div>
    </header>

    <main>
      {tab==='inicio' && <Home setTab={setTab} orderReady={orderReady}/>} 
      {tab==='tribuna' && <Live liveMode={liveMode} liveLabel={liveLabel} currentSong={currentSong} notice={notice}/>} 
      {tab==='mapa' && <Map/>}
      {tab==='pedidos' && <Orders ready={orderReady} setReady={setOrderReady}/>} 
      {tab==='repertorio' && <Songs/>}
    </main>

    <nav className="bottom-nav">
      <Nav active={tab==='inicio'} label="Inicio" icon="⌂" onClick={()=>setTab('inicio')}/>
      <Nav active={tab==='tribuna'} label="En vivo" icon="◉" onClick={()=>setTab('tribuna')}/>
      <Nav active={tab==='mapa'} label="Oriente" icon="⌖" onClick={()=>setTab('mapa')}/>
      <Nav active={tab==='pedidos'} label="Pedido" icon="▣" onClick={()=>setTab('pedidos')}/>
    </nav>

    {adminOpen && <Admin onClose={()=>setAdminOpen(false)} liveMode={liveMode} setLiveMode={setLiveMode} currentSong={currentSong} setCurrentSong={setCurrentSong} notice={notice} setNotice={setNotice}/>} 
  </div>
}

function Home({setTab,orderReady}){
  return <div className="page">
    <section className="hero-card"><div className="hero-overlay"/><div className="hero-content">
      <div className="eyebrow">● PRÓXIMO PARTIDO · PILOTO ORIENTE</div>
      <div className="match-row"><div className="team"><span className="team-badge">A</span><strong>ALIANZA</strong></div><div className="versus"><small>MATUTE</small><b>VS</b><span>20:00</span></div><div className="team muted"><span className="team-badge rival">R</span><strong>RIVAL</strong></div></div>
      <div className="heat"><span>🔥</span><div><small>ORIENTE</small><strong>CALDERA</strong></div></div>
      <button className="primary big" onClick={()=>setTab('tribuna')}>📡 ENTRAR AL MODO TRIBUNA</button>
    </div></section>

    <section className="status-grid">
      <button className="mini-card" onClick={()=>setTab('repertorio')}><div className="mini-icon">🎶</div><div><small>REPERTORIO</small><b>3 de 5 listos</b></div><span>›</span></button>
      <button className="mini-card" onClick={()=>setTab('pedidos')}><div className="mini-icon">📦</div><div><small>MI PEDIDO</small><b>{orderReady?'Listo para retirar':'Preparando'}</b></div><span>›</span></button>
    </section>

    <section className="section-head"><div><small>PREPÁRATE</small><h2>La fiesta de hoy</h2></div><span className="tag">3 indicaciones</span></section>
    <div className="party-list">
      <article className="party-card"><span className="party-icon">🎊</span><div><h3>Papel picado</h3><p>Tenlo listo y úsalo solo cuando se active la señal.</p></div></article>
      <article className="party-card"><span className="party-icon">🏳️</span><div><h3>Manto</h3><p>Cuando llegue a tu sector, manos arriba y déjalo avanzar.</p></div></article>
      <article className="party-card"><span className="party-icon">🎈</span><div><h3>Globos</h3><p>Levántalos en el recibimiento. No los arrojes al campo.</p></div></article>
    </div>

    <button className="location-banner" onClick={()=>setTab('mapa')}><span className="location-icon">📍</span><span><small>¿PRIMERA VEZ EN ORIENTE?</small><b>Ubícate antes de entrar</b><em>Accesos, zonas, pedidos y orientación</em></span><span>›</span></button>
    <div className="culture-note"><span>🛡️</span><p><b>La tribuna se vive entre todos.</b> Sigue únicamente indicaciones autorizadas, cuida los pasillos y evita lanzar objetos al campo.</p></div>
  </div>
}

function Live({liveMode,liveLabel,currentSong,notice}){
  return <div className="page live-page"><div className="live-status"><span className="pulse"/> TRIBUNA CONECTADA <b>· DEMO</b></div>
    <section className={`command-card mode-${liveMode.toLowerCase()}`}><small>AHORA EN ORIENTE</small><h1>{liveLabel}</h1>{liveMode==='CANTO'?<><div className="song-number">#{currentSong}</div><p className="demo-lyrics">Aquí aparecerá la letra autorizada del canto seleccionado.</p><div className="command-tip">🔊 Sigue a la tribuna, no al celular.</div></>:<><div style={{fontSize:56}}>📣</div><p>{notice}</p><div className="command-tip">📳 Recibirás una vibración breve al cambiar la indicación.</div></>}</section>
    <section className="what-now"><div className="section-head"><div><small>CONTEXTO</small><h2>¿Qué está pasando?</h2></div><span>👀</span></div><p>{notice}</p></section>
    <div className="phone-down"><span>💙</span><div><b>Ya sabes qué hacer.</b><small>Ahora mira la cancha y alienta.</small></div></div>
  </div>
}

function Map(){
  return <div className="page"><div className="section-head map-title"><div><small>MAPA PILOTO</small><h2>Oriente</h2></div><button className="ghost">📷 ¿Dónde estoy?</button></div>
    <div className="stadium-map"><div className="pitch"><span>CANCHA</span><i/></div><button className="zone z1 green">O-10</button><button className="zone z2 red">O-12</button><button className="zone z3 green">O-14</button><button className="zone z4 gold">📦 O-03</button><div className="oriente-label">TRIBUNA ORIENTE</div></div>
    <div className="legend"><span><i className="green"/>Público general</span><span><i className="red"/>Organización</span><span><i className="gold"/>Pedidos</span></div>
    <div className="party-card"><span className="party-icon">🧭</span><div><h3>Editor de zonas</h3><p>La siguiente versión permitirá que el administrador dibuje sectores, puntos de retiro y áreas de organización desde su celular.</p></div></div>
  </div>
}

function Orders({ready,setReady}){
  return <div className="page"><div className="section-head"><div><small>RESERVA DEMO</small><h2>Mi pedido</h2></div><span>🎫</span></div>
    <section className="order-card"><div className="order-status">✅ {ready?'LISTO PARA RETIRAR':'PREPARANDO PEDIDO'}</div><div className="order-number">#0184</div><h3>Pack recibimiento × 2</h3><p>Contenido demostrativo sujeto a lo que autorice la organización.</p><div className="pickup">📍 <div><small>PUNTO DE ENTREGA</small><b>Oriente · O-03</b><span>Disponible desde 18:10</span></div></div><div className="qr-demo"><span style={{fontSize:48}}>▦</span><span>QR DE RETIRO</span><small>El encargado lo escaneará al entregar</small></div></section>
    <button className="ghost full" onClick={()=>setReady(!ready)}>Simular cambio de estado</button>
  </div>
}

function Songs(){
  return <div className="page"><div className="section-head"><div><small>SEMANA DE PARTIDO</small><h2>Repertorio</h2></div><span className="tag">60%</span></div><div className="progress"><i style={{width:'60%'}}/></div><p className="lead">Repasa antes de llegar. Durante el partido solo verás el canto que esté activo.</p><div className="song-list">{songs.map((s,i)=><article key={s.id}><span>{String(s.id).padStart(2,'0')}</span><div><b>{s.title}</b><small>{i<3?'Aprendido':'Pendiente'}</small></div><span>{i<3?'✅':'🎵'}</span></article>)}</div></div>
}

function Admin({onClose,liveMode,setLiveMode,currentSong,setCurrentSong,notice,setNotice}){
  const modes=['PREVIA','GLOBOS','MANTO','CANTO']
  return <div className="admin-backdrop"><aside className="admin-panel"><div className="admin-head"><div><small>CENTRO DE CONTROL</small><h2>Oriente en vivo</h2></div><button onClick={onClose}>✕</button></div><div className="admin-warning">ℹ️ Demo local. Luego estas órdenes viajarán en tiempo real.</div><label>Estado de tribuna</label><div className="admin-modes">{modes.map(m=><button className={liveMode===m?'active':''} key={m} onClick={()=>setLiveMode(m)}>{m}</button>)}</div><label>Canto activo</label><div className="song-buttons">{songs.map(s=><button className={currentSong===s.id?'active':''} onClick={()=>{setCurrentSong(s.id);setLiveMode('CANTO')}} key={s.id}>{s.id}</button>)}</div><label>Mensaje activo</label><textarea value={notice} onChange={e=>setNotice(e.target.value)}/><button className="primary full" onClick={onClose}>📡 PUBLICAR ESTADO</button></aside></div>
}

function Nav({active,label,icon,onClick}){ return <button onClick={onClick} className={active?'active':''}><span style={{fontSize:20}}>{icon}</span><span>{label}</span></button> }

export default App
