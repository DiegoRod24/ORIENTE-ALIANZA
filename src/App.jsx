import { useMemo, useState } from 'react'
import {
  Home, Radio, MapPinned, PackageCheck, ShieldCheck, Music2, PartyPopper,
  Navigation, QrCode, ChevronRight, Clock3, Users, BellRing, Megaphone,
  MapPin, CheckCircle2, CircleDot, Sparkles, Volume2, Eye, TicketCheck,
  Settings2, Flag, Info, X
} from 'lucide-react'

const songs = [
  { id: 1, title: 'Canto 01', learned: true },
  { id: 2, title: 'Canto 02', learned: true },
  { id: 3, title: 'Canto 03', learned: false },
  { id: 4, title: 'Canto 04', learned: true },
  { id: 5, title: 'Canto 05', learned: false },
]

const zones = [
  { code: 'O-01', name: 'Acceso Oriente', type: 'Acceso', tone: 'blue', note: 'Ingreso y orientación' },
  { code: 'O-03', name: 'Punto de entrega', type: 'Pedidos', tone: 'gold', note: 'Retiro de reservas' },
  { code: 'O-10', name: 'Oriente lateral', type: 'Público general', tone: 'green', note: 'Zona recomendada' },
  { code: 'O-12', name: 'Oriente central', type: 'Organización', tone: 'red', note: 'Banderas e instrumentos' },
  { code: 'O-14', name: 'Oriente lateral', type: 'Público general', tone: 'green', note: 'Zona recomendada' },
]

const partySteps = [
  { icon: PartyPopper, title: 'Papel picado', text: 'Tenlo listo y úsalo solo cuando se active la señal.' },
  { icon: Flag, title: 'Manto', text: 'Cuando llegue a tu sector, manos arriba y déjalo avanzar.' },
  { icon: Sparkles, title: 'Globos', text: 'Levántalos en el recibimiento. No los arrojes al campo.' },
]

function App() {
  const [tab, setTab] = useState('inicio')
  const [liveMode, setLiveMode] = useState('PREVIA')
  const [currentSong, setCurrentSong] = useState(4)
  const [notice, setNotice] = useState('Faltan 12 minutos. Ten tus globos preparados.')
  const [selectedZone, setSelectedZone] = useState(null)
  const [adminOpen, setAdminOpen] = useState(false)
  const [orderReady, setOrderReady] = useState(true)

  const liveLabel = useMemo(() => {
    if (liveMode === 'CANTO') return `CANTO ${String(currentSong).padStart(2, '0')}`
    if (liveMode === 'GLOBOS') return 'GLOBOS ARRIBA'
    if (liveMode === 'MANTO') return 'MANTO EN TU SECTOR'
    return 'PREVIA'
  }, [liveMode, currentSong])

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={() => setTab('inicio')}>
          <span className="brand-mark">OA</span>
          <span><b>ORIENTE</b><small>Modo tribuna</small></span>
        </button>
        <div className="top-actions">
          <span className="live-pill"><span className="pulse" /> PILOTO</span>
          <button className="icon-button" onClick={() => setAdminOpen(true)} aria-label="Abrir panel admin"><Settings2 size={19} /></button>
        </div>
      </header>

      <main>
        {tab === 'inicio' && <HomeScreen setTab={setTab} orderReady={orderReady} />}
        {tab === 'tribuna' && <LiveScreen liveMode={liveMode} liveLabel={liveLabel} currentSong={currentSong} notice={notice} />}
        {tab === 'mapa' && <MapScreen selectedZone={selectedZone} setSelectedZone={setSelectedZone} />}
        {tab === 'pedidos' && <OrdersScreen ready={orderReady} setReady={setOrderReady} />}
        {tab === 'repertorio' && <SongsScreen />}
      </main>

      <nav className="bottom-nav">
        <NavButton active={tab === 'inicio'} icon={Home} label="Inicio" onClick={() => setTab('inicio')} />
        <NavButton active={tab === 'tribuna'} icon={Radio} label="En vivo" onClick={() => setTab('tribuna')} />
        <NavButton active={tab === 'mapa'} icon={MapPinned} label="Oriente" onClick={() => setTab('mapa')} />
        <NavButton active={tab === 'pedidos'} icon={PackageCheck} label="Pedido" onClick={() => setTab('pedidos')} />
      </nav>

      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          liveMode={liveMode}
          setLiveMode={setLiveMode}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          notice={notice}
          setNotice={setNotice}
        />
      )}
    </div>
  )
}

function HomeScreen({ setTab, orderReady }) {
  return (
    <div className="page">
      <section className="hero-card">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow"><CircleDot size={14} /> PRÓXIMO PARTIDO · PILOTO ORIENTE</div>
          <div className="match-row">
            <div className="team"><span className="team-badge">A</span><strong>ALIANZA</strong></div>
            <div className="versus"><small>MATUTE</small><b>VS</b><span>20:00</span></div>
            <div className="team muted"><span className="team-badge rival">R</span><strong>RIVAL</strong></div>
          </div>
          <div className="heat"><span>🔥</span><div><small>ORIENTE</small><strong>CALDERA</strong></div></div>
          <button className="primary big" onClick={() => setTab('tribuna')}><Radio size={20} /> ENTRAR AL MODO TRIBUNA</button>
        </div>
      </section>

      <section className="status-grid">
        <button className="mini-card" onClick={() => setTab('repertorio')}>
          <div className="mini-icon"><Music2 /></div><div><small>REPERTORIO</small><b>3 de 5 listos</b></div><ChevronRight />
        </button>
        <button className="mini-card" onClick={() => setTab('pedidos')}>
          <div className="mini-icon"><PackageCheck /></div><div><small>MI PEDIDO</small><b>{orderReady ? 'Listo para retirar' : 'Preparando'}</b></div><ChevronRight />
        </button>
      </section>

      <section className="section-head"><div><small>PREPÁRATE</small><h2>La fiesta de hoy</h2></div><span className="tag">3 indicaciones</span></section>
      <div className="party-list">
        {partySteps.map(({ icon: Icon, title, text }) => (
          <article className="party-card" key={title}><span className="party-icon"><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>
        ))}
      </div>

      <button className="location-banner" onClick={() => setTab('mapa')}>
        <span className="location-icon"><Navigation /></span>
        <span><small>¿PRIMERA VEZ EN ORIENTE?</small><b>Ubícate antes de entrar</b><em>Accesos, zonas, pedidos y orientación</em></span>
        <ChevronRight />
      </button>

      <div className="culture-note"><ShieldCheck /><p><b>La tribuna se vive entre todos.</b> Sigue únicamente indicaciones autorizadas, cuida los pasillos y evita lanzar objetos al campo.</p></div>
    </div>
  )
}

function LiveScreen({ liveMode, liveLabel, currentSong, notice }) {
  return (
    <div className="page live-page">
      <div className="live-status"><span className="pulse" /> TRIBUNA CONECTADA <b>· DEMO</b></div>
      <section className={`command-card mode-${liveMode.toLowerCase()}`}>
        <small>AHORA EN ORIENTE</small>
        <h1>{liveLabel}</h1>
        {liveMode === 'CANTO' ? (
          <><div className="song-number">#{currentSong}</div><p className="demo-lyrics">Aquí aparecerá la letra autorizada del canto seleccionado por la organización.</p><div className="command-tip"><Volume2 /> Sigue a la tribuna, no al celular.</div></>
        ) : (
          <><Megaphone size={54} strokeWidth={1.4} /><p>{notice}</p><div className="command-tip"><BellRing /> Recibirás una vibración breve al cambiar la indicación.</div></>
        )}
      </section>
      <section className="what-now"><div className="section-head"><div><small>CONTEXTO</small><h2>¿Qué está pasando?</h2></div><Eye /></div><p>{notice}</p></section>
      <div className="phone-down"><span>💙</span><div><b>Ya sabes qué hacer.</b><small>Ahora mira la cancha y alienta.</small></div></div>
    </div>
  )
}

function MapScreen({ selectedZone, setSelectedZone }) {
  return (
    <div className="page">
      <div className="section-head map-title"><div><small>MAPA PILOTO</small><h2>Oriente</h2></div><button className="ghost"><QrCode size={18}/> ¿Dónde estoy?</button></div>
      <div className="stadium-map">
        <div className="pitch"><span>CANCHA</span><i /></div>
        <button className="zone z1 green" onClick={() => setSelectedZone(zones[2])}>O-10</button>
        <button className="zone z2 red" onClick={() => setSelectedZone(zones[3])}>O-12</button>
        <button className="zone z3 green" onClick={() => setSelectedZone(zones[4])}>O-14</button>
        <button className="zone z4 gold" onClick={() => setSelectedZone(zones[1])}><PackageCheck size={15}/> O-03</button>
        <div className="oriente-label">TRIBUNA ORIENTE</div>
      </div>
      <div className="legend"><span><i className="green"/>Público general</span><span><i className="red"/>Organización</span><span><i className="gold"/>Pedidos</span></div>
      <div className="zone-list">
        {zones.slice(1).map(z => <button key={z.code} className="zone-row" onClick={() => setSelectedZone(z)}><span className={`zone-dot ${z.tone}`} /> <div><b>{z.code} · {z.name}</b><small>{z.note}</small></div><ChevronRight /></button>)}
      </div>
      {selectedZone && <div className="zone-detail"><button onClick={() => setSelectedZone(null)}><X /></button><span className={`zone-dot ${selectedZone.tone}`} /><small>{selectedZone.code}</small><h3>{selectedZone.name}</h3><b>{selectedZone.type}</b><p>{selectedZone.note}. En la versión siguiente el administrador podrá dibujar y publicar estas zonas desde el celular.</p><button className="primary"><Navigation size={18}/> Llévame</button></div>}
    </div>
  )
}

function OrdersScreen({ ready, setReady }) {
  return (
    <div className="page">
      <div className="section-head"><div><small>RESERVA DEMO</small><h2>Mi pedido</h2></div><TicketCheck /></div>
      <section className="order-card">
        <div className="order-status"><CheckCircle2 /> {ready ? 'LISTO PARA RETIRAR' : 'PREPARANDO PEDIDO'}</div>
        <div className="order-number">#0184</div>
        <h3>Pack recibimiento × 2</h3>
        <p>Contenido demostrativo: elementos autorizados para el recibimiento que defina la organización.</p>
        <div className="pickup"><MapPin /><div><small>PUNTO DE ENTREGA</small><b>Oriente · O-03</b><span>Disponible desde 18:10</span></div></div>
        <div className="qr-demo"><QrCode /><span>QR DE RETIRO</span><small>El encargado lo escaneará al entregar</small></div>
      </section>
      <div className="timeline"><div className="done"><i/><span><b>Reserva confirmada</b><small>17:20</small></span></div><div className={ready ? 'done' : ''}><i/><span><b>Pedido preparado</b><small>{ready ? '18:02' : 'Pendiente'}</small></span></div><div><i/><span><b>Entregado en tribuna</b><small>Pendiente</small></span></div></div>
      <button className="ghost full" onClick={() => setReady(!ready)}>Simular cambio de estado</button>
    </div>
  )
}

function SongsScreen() {
  return <div className="page"><div className="section-head"><div><small>SEMANA DE PARTIDO</small><h2>Repertorio</h2></div><span className="tag">60%</span></div><div className="progress"><i style={{width:'60%'}}/></div><p className="lead">Repasa antes de llegar. Durante el partido solo verás el canto que esté activo.</p><div className="song-list">{songs.map(s => <article key={s.id}><span>{String(s.id).padStart(2,'0')}</span><div><b>{s.title}</b><small>{s.learned ? 'Aprendido' : 'Pendiente'}</small></div>{s.learned ? <CheckCircle2 className="ok"/> : <Music2/>}</article>)}</div></div>
}

function AdminPanel({ onClose, liveMode, setLiveMode, currentSong, setCurrentSong, notice, setNotice }) {
  const modes = ['PREVIA','GLOBOS','MANTO','CANTO']
  return <div className="admin-backdrop"><aside className="admin-panel"><div className="admin-head"><div><small>CENTRO DE CONTROL</small><h2>Oriente en vivo</h2></div><button onClick={onClose}><X/></button></div><div className="admin-warning"><Info/> Demo local: en la siguiente etapa estas órdenes viajarán por Supabase Realtime.</div><label>Estado de tribuna</label><div className="admin-modes">{modes.map(m => <button className={liveMode===m?'active':''} key={m} onClick={() => setLiveMode(m)}>{m}</button>)}</div><label>Canto activo</label><div className="song-buttons">{songs.map(s => <button className={currentSong===s.id?'active':''} onClick={() => {setCurrentSong(s.id);setLiveMode('CANTO')}} key={s.id}>{s.id}</button>)}</div><label>Mensaje activo</label><textarea value={notice} onChange={e=>setNotice(e.target.value)} /><button className="primary full" onClick={onClose}><Radio/> PUBLICAR ESTADO</button><div className="admin-stats"><div><Users/><b>—</b><small>conectados</small></div><div><Clock3/><b>LIVE</b><small>estado</small></div><div><MapPin/><b>ORI</b><small>piloto</small></div></div></aside></div>
}

function NavButton({ active, icon: Icon, label, onClick }) { return <button onClick={onClick} className={active?'active':''}><Icon/><span>{label}</span></button> }

export default App
