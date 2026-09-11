import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

async function clearOldServiceWorkers(){
  if('serviceWorker' in navigator){
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map(r => r.unregister()))
  }
}

function showFatal(error){
  console.error(error)
  const root = document.getElementById('root')
  if(root){
    root.innerHTML = `<div style="min-height:100vh;background:#030a13;color:white;padding:24px;font-family:system-ui"><h1 style="margin-top:40px">ORIENTE ALIANZA</h1><p>No se pudo iniciar la aplicación.</p><p style="color:#9fb2c9;font-size:13px">Actualiza la página. Si continúa, revisaremos el error de despliegue.</p></div>`
  }
}

try{
  clearOldServiceWorkers().catch(()=>{})
  const root = document.getElementById('root')
  if(!root) throw new Error('No existe #root')
  createRoot(root).render(<React.StrictMode><App/></React.StrictMode>)
}catch(error){
  showFatal(error)
}
