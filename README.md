# ORIENTE-ALIANZA

PWA piloto, mobile-first, para mejorar la experiencia de Tribuna Oriente: partido, escuela de tribuna, modo en vivo, orientación, fiesta, pedidos, ventas y organización.

## V0.6

- Identidad visual más íntima de Oriente: encabezado, splash y mensajes blanquiazules.
- Corrección del logo y la imagen del pollo para evitar recursos rotos en Cloudflare.
- Inicio con partido, horarios, Matute y acceso principal al Modo Tribuna.
- **Escuela de Tribuna** antes de la venta: acceso directo a repertorio, Modo Tribuna y Fiesta de hoy.
- Progreso de repertorio leído desde el avance guardado en el dispositivo.
- Modo Tribuna con señales PREVIA / GLOBOS / MANTO / CANTO / MENSAJE.
- Repertorio con progreso y espacio preparado para contenido propio/autorizado.
- Mapa esquemático interactivo de Oriente y localizador por código/cámara.
- Actividad destacada: Pollo a la parrilla S/20, solo en Oriente, sin convertir la app en una tienda.
- Flujo de pedido: seleccionar cantidad → pago/contacto → confirmación → recojo.
- QR de pago configurable y contacto por WhatsApp configurable.
- Seguimiento de pedidos: pendiente, confirmado, listo y entregado.
- Panel rápido de Ventas con stock, vendidos, ingresos y ganancia estimada.
- Mensaje de propósito: apoyo a globos, toldos, ambiente de tribuna y viajes del hincha blanquiazul.
- Panel administrador para partido, señal, pedidos y zonas.
- Editor básico de polígonos para publicar zonas.
- Feedback postpartido guardado localmente.
- PWA instalable + service worker `v6` para forzar la actualización de recursos.

### Orden conceptual de la experiencia

`PARTIDO → MODO TRIBUNA → ESCUELA / REPERTORIO → FIESTA → ORIENTE / MAPA → ACTIVIDADES Y PEDIDOS → COMUNIDAD`

La venta de comida es una actividad puntual dentro del ecosistema de Oriente. El centro del producto sigue siendo preparar al hincha, coordinar la tribuna y mejorar la experiencia antes, durante y después del partido.

### Nota del piloto

Por ahora pedidos, configuración de ventas y métricas se guardan en el dispositivo. El QR y el WhatsApp se configuran desde el botón `S/`. La siguiente etapa será centralizar pedidos, stock, pagos reportados, encargados y señales en vivo mediante Supabase.

## Desarrollo

```bash
npm install
npm run dev
```

## Cloudflare Pages

```text
Build command: npm run build
Build output directory: dist
```

> Proyecto piloto no oficial. Antes de usar marcas, escudos, letras completas, cobros o instrucciones reales dentro del estadio, validar permisos, derechos, seguridad y reglas aplicables.
