# Misty

Landing de marca para indumentaria femenina, con showroom y venta mayorista y minorista; no ofrece catálogo ni carrito.
Prototipo white-label para duplicar y adaptar en clientes reales.

Stack: React, TypeScript, Vite y Tailwind CSS.

## Cómo empezar

El proyecto no declara una versión de Node en `package.json`.

```bash
npm install
npm run dev
```

Vite levanta el servidor en el puerto 3000. Para compilar y probar localmente el resultado:

```bash
npm run build
npm run preview
```

## Mapa del proyecto

```text
src/
├── App.tsx
├── main.tsx
├── brand.config.ts
└── components/
    ├── Header.tsx
    ├── Hero.tsx
    ├── QuickWholesaleStrip.tsx
    ├── AboutManifesto.tsx
    ├── ProcessSection.tsx
    ├── ContactLocation.tsx
    ├── Footer.tsx
    ├── WhatsAppFloatingButton.tsx
    └── PrototypeBanner.tsx
public/assets/
├── hero/
├── logo/
├── misc/
└── products/   (vacía; solo tiene .gitkeep)
scripts/
└── scripts de imágenes, logo e iconos
docs/
└── IMAGENES.md
```

## Adaptar la marca

Editá `src/brand.config.ts` en este orden:

1. **identity** — nombre, rubro, logo y rutas de favicon e ícono Apple.
2. **seo** — sufijo del título, descripción y la imagen social.
3. **typography** — familias tipográficas y URL de la hoja de estilos.
4. **theme** — colores de marca y superficies.
5. **contact** — WhatsApp, Instagram, email, showroom, dirección y horarios.
6. **navigation** — enlaces y textos de los botones de navegación.
7. **marquee** — mensajes de la franja móvil.
8. **hero** — textos, imagen, CTAs y sellos de confianza.
9. **quickWholesaleBar** — título, bajada y botón de la franja mayorista/minorista.
10. **essenceSection** — presentación, fotos, textos y pilares de marca.
11. **processSection** — título y pasos del proceso de compra.
12. **contactSection** — textos y tarjetas de WhatsApp, Instagram, showroom y mapa.
13. **wholesaleCallout** — contenido del llamado a la compra mayorista.
14. **footer** — descripción, datos, textos legales, créditos y leyenda demo.

Los tokens de `brandConfig.theme` se inyectan como variables CSS desde `src/main.tsx`; los componentes usan esos tokens y no llevan colores hexadecimales de marca.

No hay un interruptor para ocultar mayorista. Si el cliente no lo usa, sacá QuickWholesaleStrip de `src/App.tsx` y el bloque del llamado mayorista de `src/components/ContactLocation.tsx`; revisá también los textos y CTAs mayoristas que quieras conservar o quitar.

## Imágenes y logo

Usá estas rutas para las imágenes actuales; reemplazalas y actualizá sus datos y textos alternativos en `src/brand.config.ts`.

| Archivo | Uso | Medida mínima o regla |
|---|---|---|
| `public/assets/hero/hero-1.jpg` | Fondo principal del hero; también es fuente de la imagen Open Graph. | 1280 px de ancho mínimo. |
| `public/assets/misc/sobre-marca-1.jpg` | Primer retrato; fallback del hero y de la segunda foto. | 800 px de ancho mínimo. |
| `public/assets/misc/sobre-marca-2.jpg` | Segundo retrato de la sección de esencia. | 800 px de ancho mínimo. |
| `public/assets/misc/og-image.jpg` | Imagen para compartir en redes. | 1200 × 630 px; `make:og` limita el archivo a 200 KB. |
| `public/assets/logo/logo.png` | Logo vigente; fuente del emblema para generar los iconos. | `make:icons` requiere al menos 190 × 100 px. |
| `public/assets/logo/favicon-32.png` | Favicon del sitio. | 32 × 32 px. |
| `public/assets/logo/apple-touch-icon.png` | Ícono para dispositivos Apple. | 180 × 180 px y opaco. |

El SVG del logo es opcional: hoy no existe public/assets/logo/logo.svg y el sitio usa el PNG.

| Comando | Qué hace |
|---|---|
| `npm run check:images` | Informa si el hero o los retratos quedan por debajo del ancho mínimo. |
| `npm run check:images:strict` | Aplica las mismas reglas y falla si alguna imagen no llega al mínimo. |
| `npm run images:optimize` | Comprime hero y retratos sin cambiar sus dimensiones; conserva el original cuando necesita recomprimir. |
| `npm run make:og` | Recorta el centro del hero y genera la imagen social de 1200 × 630 px. |
| `npm run make:icons` | Genera favicon e ícono Apple a partir del emblema de `logo.png`. |
| `npm run check:icons` | Comprueba que los iconos estén actualizados y valida el ícono Apple. |
| `npm run check:logo` | Valida el SVG si existe; si no, informa que se usa el PNG y termina correctamente. |
| `npm run make:logo-png` | Con un SVG presente y válido, genera `logo.png` a 1600 × 406 px. |

`make:logo-png` requiere que primero exista un SVG que pase `check:logo`. Más detalles en `docs/IMAGENES.md`.

## Variables de entorno

Las variables de esta tabla están declaradas en `.env.example`.

| Variable | Dónde se usa | ¿Obligatoria? | Para qué |
|---|---|---|---|
| `VITE_SITE_URL` | `vite.config.ts` y `src/main.tsx` | No | Origen público para canonical y metadatos sociales. |
| `VITE_DEMO_BRAND_NAME` | `src/demoBanner.config.ts` | No | Nombre que muestra el banner de demo; vacío deja el texto genérico. |
| `VITE_DEMO_BRAND_URL` | `src/demoBanner.config.ts` | No | Enlace del nombre en el banner; se acepta solo HTTP o HTTPS válido. |

Para metadatos de build, Vite prioriza `VITE_SITE_URL`. Si no está definida,
usa `URL` en producción de Netlify y `DEPLOY_PRIME_URL` en deploy previews o
branch deploys; si no hay URL disponible, usa una cadena vacía. En el navegador,
si esa URL queda vacía, `src/main.tsx` usa el origen actual de la página.

## Modo demo

`src/components/PrototypeBanner.tsx` muestra que la marca es un prototipo. `src/demoBanner.config.ts` lee el nombre y el enlace; si no hay nombre, muestra el aviso genérico. El pie arma su leyenda con `getDemoLegend()`, también definido en ese archivo.

Al entregar a un cliente real, borrá `src/components/PrototypeBanner.tsx` y `src/demoBanner.config.ts`; quitá de `src/App.tsx` el import y el render marcados DEMO ONLY. Sacá también la leyenda del pie: el uso de `getDemoLegend()` en `src/brand.config.ts` y su render en `src/components/Footer.tsx`.

## Despliegue en Netlify

- Comando de build: `npm run build`.
- Carpeta de publicación: `dist`.
- `VITE_SITE_URL` es opcional; en producción Netlify se usa `URL`, y en deploy previews o branch deploys se prioriza `DEPLOY_PRIME_URL`.
- `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL` son opcionales y solo configuran el banner de demo.
- Si cambiás variables `VITE_*`, volvé a desplegar para que se reflejen en el build.
- `public/_headers` configura cabeceras de seguridad básicas para el sitio.

## Verificar un deploy

Cada build publica `build-info.json` en la raíz de `dist`, con el commit, rama,
contexto, URL pública y su fuente, fecha de build e indicadores booleanos de las
variables de demo. No contiene los valores de esas variables. El `<head>` de
`index.html` también incluye el meta `build-commit` con los primeros siete
caracteres del commit publicado.

Para comparar el deploy con el commit actual de `main` y comprobar que la imagen
Open Graph y la URL canonical responden correctamente:

```bash
npm run verify:deploy -- https://<sitio>.netlify.app
```

## Antes de entregar

- [ ] Actualizá identidad, SEO, tipografías, tema, contacto, textos y enlaces en `src/brand.config.ts`.
- [ ] Reemplazá las imágenes y actualizá las rutas y textos alternativos.
- [ ] Regenerá iconos con `npm run make:icons` y comprobá con `npm run check:icons`.
- [ ] Revisá imágenes con `npm run check:images:strict`.
- [ ] Si hay SVG, validalo con `npm run check:logo`; después podés generar el PNG con `npm run make:logo-png`.
- [ ] Quitá el modo demo y las secciones mayoristas que el cliente no necesite.
- [ ] Ejecutá `npm run lint` y `npm run build`.
