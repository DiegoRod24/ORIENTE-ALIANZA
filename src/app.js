const state = {
  tab: 'inicio',
  liveMode: 'PREVIA',
  currentSong: 4,
  notice: 'Faltan 12 minutos. Ten tus globos preparados.',
  adminOpen: false,
  orderReady: true,
}

const songs = [1,2,3,4,5].map(id => ({ id, title: `Canto ${String(id).padStart(2,'0')}` }))

function escapeHtml(value='') {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))
}

function liveLabel(){
  if(state.liveMode==='CANTO') return `CANTO ${String(state.currentSong).padStart(2,'0')}`
  if(state.liveMode==='GLOBOS') return 'GLOBOS ARRIBA'
  if(state.liveMode==='MANTO') return 'MANTO EN TU SECTOR'
  return 'PREVIA'
}

function home(){
  return `
  <div class="page">
    <section class="hero-card"><div class="hero-overlay"></div><div class="hero-content">
      <div class="eyebrow">● PRÓXIMO PARTIDO · PILOTO ORIENTE</div>
      <div class="match-row"><div class="team"><span class="team-badge">A</span><strong>ALIANZA</strong></div><div class="versus"><small>MATUTE</small><b>VS</b><span>20:00</span></div><div class="team muted"><span class="team-badge rival">R</span><strong>RIVAL</strong></div></div>
      <div class="heat"><span>🔥</span><div><small>ORIENTE</small><strong>CALDERA</strong></div></div>
      <button class="primary big" data-tab="tribuna">📡 ENTRAR AL MODO TRIBUNA</button>
    </div></section>
    <section class="status-grid">
      <button class="mini-card" data-tab="repertorio"><div class="mini-icon">🎶</div><div><small>REPERTORIO</small><b>3 de 5 listos</b></div><span>›</span></button>
      <button class="mini-card" data-tab="pedidos"><div class="mini-icon">📦</div><div><small>MI PEDIDO</small><b>${state.orderReady?'Listo para retirar':'Preparando'}</b></div><span>›</span></button>
    </section>
    <section class="section-head"><div><small>PREPÁRATE</small><h2>La fiesta de hoy</h2></div><span class="tag">3 indicaciones</span></section>
    <div class="party-list">
      <article class="party-card"><span class="party-icon">🎊</span><div><h3>Papel picado</h3><p>Tenlo listo y úsalo solo cuando se active la señal.</p></div></article>
      <article class="party-card"><span class="party-icon">🏳️</span><div><h3>Manto</h3><p>Cuando llegue a tu sector, manos arriba y déjalo avanzar.</p></div></article>
      <article class="party-card"><span class="party-icon">🎈</span><div><h3>Globos</h3><p>Levántalos en el recibimiento. No los arrojes al campo.</p></div></article>
    </div>
    <button class="location-banner" data-tab="mapa"><span class="location-icon">📍</span><span><small>¿PRIMERA VEZ EN ORIENTE?</small><b>Ubícate antes de entrar</b><em>Accesos, zonas, pedidos y orientación</em></span><span>›</span></button>
    <div class="culture-note"><span>🛡️</span><p><b>La tribuna se vive entre todos.</b> Sigue únicamente indicaciones autorizadas, cuida los pasillos y evita lanzar objetos al campo.</p></div>
  </div>`
}

function live(){
  const isSong = state.liveMode==='CANTO'
  return `<div class="page live-page"><div class="live-status"><span class="pulse"></span> TRIBUNA CONECTADA <b>· DEMO</b></div>
    <section class="command-card mode-${state.liveMode.toLowerCase()}"><small>AHORA EN ORIENTE</small><h1>${liveLabel()}</h1>
      ${isSong ? `<div class="song-number">#${state.currentSong}</div><p class="demo-lyrics">Aquí aparecerá la letra autorizada del canto seleccionado.</p><div class="command-tip">🔊 Sigue a la tribuna, no al celular.</div>` : `<div style="font-size:56px">📣</div><p>${escapeHtml(state.notice)}</p><div class="command-tip">📳 Recibirás una vibración breve al cambiar la indicación.</div>`}
    </section>
    <section class="what-now"><div class="section-head"><div><small>CONTEXTO</small><h2>¿Qué está pasando?</h2></div><span>👀</span></div><p>${escapeHtml(state.notice)}</p></section>
    <div class="phone-down"><span>💙</span><div><b>Ya sabes qué hacer.</b><small>Ahora mira la cancha y alienta.</small></div></div>
  </div>`
}

function map(){
  return `<div class="page"><div class="section-head map-title"><div><small>MAPA PILOTO</small><h2>Oriente</h2></div><button class="ghost" id="where-btn">📷 ¿Dónde estoy?</button></div>
    <div class="stadium-map"><div class="pitch"><span>CANCHA</span><i></i></div><button class="zone z1 green">O-10</button><button class="zone z2 red">O-12</button><button class="zone z3 green">O-14</button><button class="zone z4 gold">📦 O-03</button><div class="oriente-label">TRIBUNA ORIENTE</div></div>
    <div class="legend"><span><i class="green"></i>Público general</span><span><i class="red"></i>Organización</span><span><i class="gold"></i>Pedidos</span></div>
    <div class="party-card"><span class="party-icon">🧭</span><div><h3>Editor de zonas</h3><p>La siguiente versión permitirá que el administrador dibuje sectores, puntos de retiro y áreas de organización desde su celular.</p></div></div>
  </div>`
}

function orders(){
  return `<div class="page"><div class="section-head"><div><small>RESERVA DEMO</small><h2>Mi pedido</h2></div><span>🎫</span></div>
    <section class="order-card"><div class="order-status">✅ ${state.orderReady?'LISTO PARA RETIRAR':'PREPARANDO PEDIDO'}</div><div class="order-number">#0184</div><h3>Pack recibimiento × 2</h3><p>Contenido demostrativo sujeto a lo que autorice la organización.</p><div class="pickup">📍 <div><small>PUNTO DE ENTREGA</small><b>Oriente · O-03</b><span>Disponible desde 18:10</span></div></div><div class="qr-demo"><span style="font-size:48px">▦</span><span>QR DE RETIRO</span><small>El encargado lo escaneará al entregar</small></div></section>
    <button class="ghost full" id="toggle-order">Simular cambio de estado</button>
  </div>`
}

function repertorio(){
  return `<div class="page"><div class="section-head"><div><small>SEMANA DE PARTIDO</small><h2>Repertorio</h2></div><span class="tag">60%</span></div><div class="progress"><i style="width:60%"></i></div><p class="lead">Repasa antes de llegar. Durante el partido solo verás el canto que esté activo.</p><div class="song-list">${songs.map((s,i)=>`<article><span>${String(s.id).padStart(2,'0')}</span><div><b>${s.title}</b><small>${i<3?'Aprendido':'Pendiente'}</small></div><span>${i<3?'✅':'🎵'}</span></article>`).join('')}</div></div>`
}

function admin(){
  if(!state.adminOpen) return ''
  return `<div class="admin-backdrop"><aside class="admin-panel"><div class="admin-head"><div><small>CENTRO DE CONTROL</small><h2>Oriente en vivo</h2></div><button id="close-admin">✕</button></div><div class="admin-warning">ℹ️ Demo local. Luego estas órdenes viajarán en tiempo real.</div><label>Estado de tribuna</label><div class="admin-modes">${['PREVIA','GLOBOS','MANTO','CANTO'].map(m=>`<button data-mode="${m}" class="${state.liveMode===m?'active':''}">${m}</button>`).join('')}</div><label>Canto activo</label><div class="song-buttons">${songs.map(s=>`<button data-song="${s.id}" class="${state.currentSong===s.id?'active':''}">${s.id}</button>`).join('')}</div><label>Mensaje activo</label><textarea id="notice-input">${escapeHtml(state.notice)}</textarea><button class="primary full" id="publish-state">📡 PUBLICAR ESTADO</button></aside></div>`
}

function nav(){
  const items=[['inicio','⌂','Inicio'],['tribuna','◉','En vivo'],['mapa','⌖','Oriente'],['pedidos','▣','Pedido']]
  return `<nav class="bottom-nav">${items.map(([id,icon,label])=>`<button data-tab="${id}" class="${state.tab===id?'active':''}"><span style="font-size:20px">${icon}</span><span>${label}</span></button>`).join('')}</nav>`
}

function render(){
  const root=document.getElementById('root')
  const page = state.tab==='inicio' ? home() : state.tab==='tribuna' ? live() : state.tab==='mapa' ? map() : state.tab==='pedidos' ? orders() : repertorio()
  root.innerHTML=`<div class="app-shell"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div><header class="topbar"><button class="brand" data-tab="inicio"><span class="brand-mark">OA</span><span><b>ORIENTE</b><small>Modo tribuna</small></span></button><div class="top-actions"><span class="live-pill"><span class="pulse"></span> PILOTO</span><button class="icon-button" id="open-admin">⚙️</button></div></header><main>${page}</main>${nav()}${admin()}</div>`
  bind()
}

function bind(){
  document.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{state.tab=btn.dataset.tab;render();window.scrollTo(0,0)}))
  document.getElementById('open-admin')?.addEventListener('click',()=>{state.adminOpen=true;render()})
  document.getElementById('close-admin')?.addEventListener('click',()=>{state.adminOpen=false;render()})
  document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{state.liveMode=btn.dataset.mode;render()}))
  document.querySelectorAll('[data-song]').forEach(btn=>btn.addEventListener('click',()=>{state.currentSong=Number(btn.dataset.song);state.liveMode='CANTO';render()}))
  document.getElementById('notice-input')?.addEventListener('input',e=>{state.notice=e.target.value})
  document.getElementById('publish-state')?.addEventListener('click',()=>{state.adminOpen=false;state.tab='tribuna';render()})
  document.getElementById('toggle-order')?.addEventListener('click',()=>{state.orderReady=!state.orderReady;render()})
  document.getElementById('where-btn')?.addEventListener('click',()=>alert('Siguiente etapa: escaneo QR / cámara para ubicar tu sector de Oriente.'))
}

window.addEventListener('error', event => {
  const root=document.getElementById('root')
  if(root) root.innerHTML=`<div style="min-height:100vh;background:#030a13;color:white;padding:32px;font-family:system-ui"><h1>ORIENTE ALIANZA</h1><p>No se pudo iniciar la aplicación.</p><pre style="white-space:pre-wrap;color:#ffb4b4">${escapeHtml(event.message||'Error desconocido')}</pre></div>`
})

render()
