const OA_STORE_KEY = 'oriente_alianza_ventas_v05'
const OA_SPLASH_KEY = 'oriente_alianza_splash_v05'

const OA_DEFAULTS = {
  product: {
    name: 'Pollo a la parrilla',
    description: '1/2 pollo a la parrilla + papas sancochadas + ensalada + cremas',
    price: 20,
    cost: 14,
    stock: 80,
    sold: 0,
    pickup: 'O-03',
    readyAt: '18:10',
    whatsapp: '',
    qrUrl: '',
    enabled: true
  },
  orders: [],
  currentOrderId: null
}

function oaLoad() {
  try {
    const saved = JSON.parse(localStorage.getItem(OA_STORE_KEY) || '{}')
    return {
      ...OA_DEFAULTS,
      ...saved,
      product: { ...OA_DEFAULTS.product, ...(saved.product || {}) },
      orders: Array.isArray(saved.orders) ? saved.orders : []
    }
  } catch {
    return structuredClone(OA_DEFAULTS)
  }
}

const oa = oaLoad()

function oaSave() {
  localStorage.setItem(OA_STORE_KEY, JSON.stringify(oa))
}

function oaMoney(value) {
  return `S/${Number(value || 0).toFixed(0)}`
}

function oaEscape(value = '') {
  return String(value).replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]))
}

function oaAvailable() {
  return Math.max(0, Number(oa.product.stock || 0) - Number(oa.product.sold || 0))
}

function oaToast(text) {
  document.querySelector('.oa-toast')?.remove()
  const el = document.createElement('div')
  el.className = 'oa-toast'
  el.innerHTML = `<b>✓</b><span>${oaEscape(text)}</span>`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 2600)
}

function oaCloseModal() {
  document.querySelector('.oa-modal-layer')?.remove()
}

function oaShowSplash() {
  if (sessionStorage.getItem(OA_SPLASH_KEY) === '1') return
  const splash = document.createElement('div')
  splash.className = 'oa-splash'
  splash.innerHTML = `
    <div class="oa-splash-lights"><i></i><i></i></div>
    <div class="oa-splash-crowd"></div>
    <div class="oa-splash-content">
      <img src="/logo-los-de-oriente.webp" alt="Los de Oriente">
      <small>LA BARRA DEL TETRACAMPEÓN</small>
      <h1>ORIENTE <span>ALIANZA</span></h1>
      <p>Modo tribuna · pedidos · organización</p>
      <div class="oa-loader"><i></i></div>
      <em>Cargando la previa blanquiazul...</em>
    </div>`
  document.body.appendChild(splash)
  sessionStorage.setItem(OA_SPLASH_KEY, '1')
  setTimeout(() => splash.classList.add('out'), 1250)
  setTimeout(() => splash.remove(), 1700)
}

function oaSaleCard() {
  const card = document.createElement('section')
  card.id = 'oa-sale-card'
  card.className = 'oa-sale-card'
  card.innerHTML = `
    <div class="oa-sale-cover">
      <img src="/pollada-oriente.webp" alt="Pollo a la parrilla en Oriente">
      <span class="oa-sale-price">${oaMoney(oa.product.price)}</span>
      <span class="oa-sale-kicker">ESTE SÁBADO · SOLO ORIENTE</span>
    </div>
    <div class="oa-sale-content">
      <div class="oa-sale-head">
        <div><small>VENTA EN TRIBUNA</small><h2>${oaEscape(oa.product.name)}</h2></div>
        <span>${oaAvailable()} disp.</span>
      </div>
      <p>${oaEscape(oa.product.description)}</p>
      <div class="oa-chips"><span>⌖ Solo Oriente</span><span>□ Stock limitado</span><span>♡ Tu apoyo suma</span></div>
      <div class="oa-cause"><b>Comida con propósito.</b><small>Lo recaudado ayuda a globos, toldos, ambiente de tribuna y apoyo a viajes para alentar los 90'.</small></div>
      <div class="oa-actions"><button class="oa-primary" id="oa-order-now">Pedir ahora</button><button class="oa-secondary" id="oa-view-flyer">Ver flyer</button></div>
    </div>`
  card.querySelector('#oa-order-now').onclick = () => oaOpenShop()
  card.querySelector('#oa-view-flyer').onclick = () => oaOpenFlyer()
  return card
}

function oaInject() {
  const shell = document.querySelector('.app-shell')
  if (!shell) return

  const brand = document.querySelector('.brand')
  if (brand && !brand.querySelector('.oa-brand-logo')) {
    const old = brand.querySelector('.brand-mark')
    if (old) {
      const img = document.createElement('img')
      img.src = '/logo-los-de-oriente.webp'
      img.alt = 'Los de Oriente'
      img.className = 'oa-brand-logo'
      old.replaceWith(img)
    }
  }

  const home = document.querySelector('.home-page')
  if (home && oa.product.enabled && !document.getElementById('oa-sale-card')) {
    const hero = home.querySelector('.hero-card')
    hero?.insertAdjacentElement('afterend', oaSaleCard())
  }

  const actions = document.querySelector('.top-actions')
  if (actions && !document.getElementById('oa-sales-admin-btn')) {
    const btn = document.createElement('button')
    btn.id = 'oa-sales-admin-btn'
    btn.className = 'oa-sales-admin-btn'
    btn.title = 'Ventas de tribuna'
    btn.innerHTML = 'S/'
    btn.onclick = oaOpenSalesAdmin
    actions.insertBefore(btn, actions.lastElementChild)
  }

  const orderPage = document.querySelector('.orders-page')
  if (orderPage && !document.getElementById('oa-orders-summary')) {
    const summary = document.createElement('section')
    summary.id = 'oa-orders-summary'
    summary.className = 'oa-orders-summary'
    const active = oa.orders.find(o => o.id === oa.currentOrderId) || oa.orders[0]
    summary.innerHTML = active ? `
      <small>VENTA EN ORIENTE</small><h3>Pedido #${oaEscape(active.id)}</h3>
      <p>${oaEscape(active.product)} · ${active.qty} × ${oaMoney(active.unitPrice)}</p>
      <div><span class="oa-status ${active.status}">${oaStatus(active.status)}</span><b>${oaMoney(active.total)}</b></div>
      <button class="oa-secondary oa-full" id="oa-manage-order">Ver pago / contacto</button>` : `
      <small>VENTA EN ORIENTE</small><h3>Aún no tienes pedido de comida</h3><p>Separa tu pollo a la parrilla antes de llegar.</p><button class="oa-primary oa-full" id="oa-manage-order">Pedir ahora</button>`
    summary.querySelector('#oa-manage-order').onclick = () => active ? oaOpenPayment(active.id) : oaOpenShop()
    orderPage.prepend(summary)
  }
}

function oaStatus(status) {
  return ({ pending:'Pendiente de confirmación', confirmed:'Confirmado', ready:'Listo para recoger', delivered:'Entregado', cancelled:'Cancelado' })[status] || 'Pendiente'
}

function oaModal(content, extra = '') {
  oaCloseModal()
  const layer = document.createElement('div')
  layer.className = `oa-modal-layer ${extra}`
  layer.innerHTML = `<div class="oa-modal">${content}</div>`
  layer.addEventListener('click', e => { if (e.target === layer) oaCloseModal() })
  document.body.appendChild(layer)
  layer.querySelectorAll('[data-oa-close]').forEach(b => b.onclick = oaCloseModal)
  return layer
}

function oaOpenFlyer() {
  const layer = oaModal(`
    <button class="oa-x" data-oa-close>×</button>
    <small class="oa-eyebrow">VENTA EN ORIENTE</small>
    <h2>Pollo a la parrilla</h2>
    <img class="oa-flyer-full" src="/pollada-oriente.webp" alt="Flyer pollo a la parrilla">
    <button class="oa-primary oa-full" id="oa-flyer-order">Separar mi pedido</button>`)
  layer.querySelector('#oa-flyer-order').onclick = oaOpenShop
}

function oaOpenShop() {
  let qty = 1
  const draw = () => {
    const total = Number(oa.product.price) * qty
    const layer = oaModal(`
      <button class="oa-x" data-oa-close>×</button>
      <div class="oa-steps"><span class="active">1<small>Selecciona</small></span><span>2<small>Paga</small></span><span>3<small>Confirma</small></span><span>4<small>Recoge</small></span></div>
      <img class="oa-product-image" src="/pollada-oriente.webp" alt="Pollo a la parrilla">
      <div class="oa-product-title"><div><small>ESTE SÁBADO · ORIENTE</small><h2>${oaEscape(oa.product.name)}</h2></div><b>${oaMoney(oa.product.price)}</b></div>
      <p class="oa-desc">${oaEscape(oa.product.description)}</p>
      <div class="oa-qty"><span><b>Cantidad</b><small>${oaAvailable()} disponibles</small></span><button id="oa-minus">−</button><b>${qty}</b><button id="oa-plus">+</button></div>
      <div class="oa-pickup"><span>⌖</span><div><b>Recojo en Oriente</b><small>Punto ${oaEscape(oa.product.pickup)} · disponible desde ${oaEscape(oa.product.readyAt)}</small></div></div>
      <div class="oa-purpose"><span>♡</span><p><b>Tu apoyo suma a la fiesta.</b> Lo recaudado ayuda a comprar globos, toldos y otros elementos para el ambiente en tribuna, además de apoyar viajes del hincha blanquiazul para alentar los 90 minutos.</p></div>
      <div class="oa-total"><span>Total</span><b>${oaMoney(total)}</b></div>
      <button class="oa-primary oa-full" id="oa-reserve">Separar y continuar al pago</button>`, 'oa-shop-modal')
    layer.querySelector('#oa-minus').onclick = () => { qty = Math.max(1, qty - 1); draw() }
    layer.querySelector('#oa-plus').onclick = () => { qty = Math.min(Math.max(1, oaAvailable()), qty + 1); draw() }
    layer.querySelector('#oa-reserve').onclick = () => {
      if (oaAvailable() < qty) return oaToast('No hay stock suficiente para esa cantidad.')
      const id = String(Date.now()).slice(-4)
      const order = { id, product:oa.product.name, qty, unitPrice:Number(oa.product.price), total, status:'pending', payment:'pending', createdAt:Date.now(), pickup:oa.product.pickup }
      oa.orders.unshift(order)
      oa.currentOrderId = id
      oaSave()
      oaOpenPayment(id)
    }
  }
  draw()
}

function oaOpenPayment(orderId) {
  const order = oa.orders.find(o => o.id === orderId)
  if (!order) return oaOpenShop()
  const phone = String(oa.product.whatsapp || '').replace(/\D/g, '')
  const message = encodeURIComponent(`Hola, deseo confirmar el pedido #${order.id} de ${order.qty} ${order.product}. Total ${oaMoney(order.total)}. Recojo en Oriente.`)
  const wa = phone ? `https://wa.me/51${phone.replace(/^51/,'')}?text=${message}` : ''
  const qr = oa.product.qrUrl ? `<img class="oa-qr-img" src="${oaEscape(oa.product.qrUrl)}" alt="QR de pago">` : `<div class="oa-qr-placeholder"><b>QR</b><small>Configúralo desde Ventas</small></div>`
  const layer = oaModal(`
    <button class="oa-x" data-oa-close>×</button>
    <div class="oa-steps"><span class="done">✓<small>Selecciona</small></span><span class="active">2<small>Paga</small></span><span>3<small>Confirma</small></span><span>4<small>Recoge</small></span></div>
    <small class="oa-eyebrow">PAGA O CONTÁCTANOS</small><h2>Pedido #${oaEscape(order.id)}</h2>
    <div class="oa-payment-box"><small>ESCANEA EL QR CONFIGURADO</small>${qr}<p>Realiza el pago y luego avisa a la organización para confirmar.</p></div>
    ${wa ? `<a class="oa-whatsapp" href="${wa}" target="_blank" rel="noopener">◉ Contactar pedido por WhatsApp</a>` : `<button class="oa-whatsapp disabled" disabled>Configura el número de WhatsApp en Ventas</button>`}
    <div class="oa-order-mini"><div><b>${oaEscape(order.product)}</b><small>${order.qty} × ${oaMoney(order.unitPrice)}</small></div><strong>${oaMoney(order.total)}</strong></div>
    <span class="oa-status ${order.status}">${oaStatus(order.status)}</span>
    <button class="oa-secondary oa-full" id="oa-report-payment">Ya pagué / ya contacté</button>
    <p class="oa-legal-note">El aplicativo no cobra dentro de la plataforma todavía: coordina el pago y la confirmación con la organización.</p>`)
  layer.querySelector('#oa-report-payment').onclick = () => {
    order.payment = 'reported'
    order.status = 'pending'
    oaSave()
    oaToast('Aviso guardado. Falta confirmación del encargado.')
    oaCloseModal()
  }
}

function oaOpenSalesAdmin() {
  const revenue = Number(oa.product.sold) * Number(oa.product.price)
  const profit = Number(oa.product.sold) * Math.max(0, Number(oa.product.price) - Number(oa.product.cost))
  const pending = oa.orders.filter(o => o.status === 'pending').length
  const recent = oa.orders.slice(0, 8).map(o => `
    <article class="oa-admin-order"><div><b>#${oaEscape(o.id)} · ${oaEscape(o.product)}</b><small>${o.qty} ud. · ${oaMoney(o.total)}</small></div><span class="oa-status ${o.status}">${oaStatus(o.status)}</span><div class="oa-admin-order-actions"><button data-oa-confirm="${o.id}">Confirmar</button><button data-oa-ready="${o.id}">Listo</button><button data-oa-deliver="${o.id}">Entregar</button></div></article>`).join('')
  const layer = oaModal(`
    <button class="oa-x" data-oa-close>×</button>
    <small class="oa-eyebrow">CENTRO DE CONTROL</small><h2>Ventas de tribuna</h2>
    <div class="oa-kpis"><div><small>Vendidos</small><b>${oa.product.sold}</b></div><div><small>Ingresos</small><b>${oaMoney(revenue)}</b></div><div><small>Ganancia est.</small><b>${oaMoney(profit)}</b></div><div><small>Pendientes</small><b>${pending}</b></div></div>
    <div class="oa-admin-form"><label>Precio (S/)<input id="oa-price" type="number" min="0" value="${oa.product.price}"></label><label>Costo estimado (S/)<input id="oa-cost" type="number" min="0" value="${oa.product.cost}"></label><label>Stock total<input id="oa-stock" type="number" min="0" value="${oa.product.stock}"></label><label>Vendidos<input id="oa-sold" type="number" min="0" value="${oa.product.sold}"></label><label>WhatsApp<input id="oa-whatsapp" inputmode="numeric" placeholder="999999999" value="${oaEscape(oa.product.whatsapp)}"></label><label>Punto de entrega<input id="oa-pickup" value="${oaEscape(oa.product.pickup)}"></label><label class="wide">URL de imagen QR de pago<input id="oa-qr" placeholder="https://..." value="${oaEscape(oa.product.qrUrl)}"></label></div>
    <label class="oa-toggle-row"><span><b>Mostrar venta en Inicio</b><small>Ocúltala cuando termine la campaña.</small></span><input id="oa-enabled" type="checkbox" ${oa.product.enabled?'checked':''}></label>
    <button class="oa-primary oa-full" id="oa-save-sales">Guardar configuración</button>
    <div class="oa-admin-list"><h3>Pedidos recientes</h3>${recent || '<p>Aún no hay pedidos registrados en este dispositivo.</p>'}</div>
    <p class="oa-legal-note">Piloto local: estos datos se guardan en este dispositivo. La siguiente etapa será centralizarlos en Supabase para que varios encargados vean lo mismo.</p>`, 'oa-admin-modal')

  layer.querySelector('#oa-save-sales').onclick = () => {
    oa.product.price = Math.max(0, Number(layer.querySelector('#oa-price').value || 0))
    oa.product.cost = Math.max(0, Number(layer.querySelector('#oa-cost').value || 0))
    oa.product.stock = Math.max(0, Number(layer.querySelector('#oa-stock').value || 0))
    oa.product.sold = Math.max(0, Number(layer.querySelector('#oa-sold').value || 0))
    oa.product.whatsapp = layer.querySelector('#oa-whatsapp').value.replace(/\D/g,'').slice(-9)
    oa.product.pickup = layer.querySelector('#oa-pickup').value.trim().toUpperCase() || 'O-03'
    oa.product.qrUrl = layer.querySelector('#oa-qr').value.trim()
    oa.product.enabled = layer.querySelector('#oa-enabled').checked
    oaSave(); oaCloseModal(); oaToast('Venta actualizada.'); oaInject()
  }

  layer.querySelectorAll('[data-oa-confirm]').forEach(b => b.onclick = () => oaAdminSetStatus(b.dataset.oaConfirm, 'confirmed'))
  layer.querySelectorAll('[data-oa-ready]').forEach(b => b.onclick = () => oaAdminSetStatus(b.dataset.oaReady, 'ready'))
  layer.querySelectorAll('[data-oa-deliver]').forEach(b => b.onclick = () => oaAdminSetStatus(b.dataset.oaDeliver, 'delivered'))
}

function oaAdminSetStatus(id, status) {
  const order = oa.orders.find(o => o.id === id)
  if (!order) return
  const wasDelivered = order.status === 'delivered'
  order.status = status
  if (status === 'delivered' && !wasDelivered) oa.product.sold = Number(oa.product.sold || 0) + Number(order.qty || 0)
  oaSave(); oaOpenSalesAdmin(); oaToast(`Pedido #${id}: ${oaStatus(status)}.`)
}

const oaObserver = new MutationObserver(() => oaInject())
oaObserver.observe(document.documentElement, { childList:true, subtree:true })
window.addEventListener('load', () => { oaShowSplash(); setTimeout(oaInject, 50) })
setTimeout(() => { oaShowSplash(); oaInject() }, 120)
