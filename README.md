# ORIENTE-ALIANZA

PWA piloto, mobile-first, para mejorar la experiencia de Tribuna Oriente: preparación antes del partido, señal de tribuna, orientación por zonas, repertorio, pedidos, ventas y organización.

## V0.5

- Inicio móvil con partido, horarios y ruta previa.
- Identidad visual renovada con logo de Los de Oriente y pantalla de carga.
- Modo Tribuna con señales PREVIA / GLOBOS / MANTO / CANTO / MENSAJE.
- Repertorio con progreso guardado en el dispositivo.
- Mapa esquemático interactivo de Oriente y localizador por código/cámara.
- Venta destacada en Inicio: Pollo a la parrilla S/20, solo en Oriente.
- Flujo de pedido: seleccionar cantidad → pago/contacto → confirmación → recojo.
- QR de pago configurable y contacto por WhatsApp configurable.
- Seguimiento de pedidos y estados: pendiente, confirmado, listo y entregado.
- Panel rápido de Ventas con stock, vendidos, ingresos y ganancia estimada.
- Mensaje de propósito: apoyo a globos, toldos, ambiente de tribuna y viajes del hincha blanquiazul.
- Panel administrador existente para partido, señal, pedidos y zonas.
- Editor básico de polígonos para publicar zonas.
- Feedback postpartido guardado localmente.
- PWA instalable + service worker renovado.

### Nota del piloto de ventas

Por ahora los pedidos y las métricas nuevas se guardan en el dispositivo. El QR y el número de WhatsApp se configuran desde el botón `S/` del encabezado. La siguiente etapa será centralizar pedidos, stock, pagos reportados y control de encargados en Supabase.

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
