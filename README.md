# Sitio de marca

Para adaptar este sitio a otro cliente:

- Editá `src/brand.config.ts` para identidad y logo, SEO, colores y tipografías (incluido el enlace a la hoja de estilos), canales de contacto, showroom y textos de cada sección. El tema alimenta los tokens `brand-*` de Tailwind.
- Reemplazá los archivos de `public/assets/` y actualizá sus rutas y textos alternativos en la configuración. `public/assets/logo/logo.png` es el logo vigente del sitio; `logo.svg` es opcional. Los iconos de favicon deben medir 32 × 32 y 180 × 180 px; generá ambos desde el emblema del PNG con `npm run make:icons` y verificá que estén actualizados con `npm run check:icons`.
- Colocá el catálogo del cliente en `public/assets/products/`.
- Configurá `seo.socialImage` en `src/brand.config.ts` con una imagen social de 1200 × 630 px. Si el archivo no existe, el build advierte y usa el hero como respaldo.
- Definí `VITE_SITE_URL` con el origen público del sitio para canonical y Open Graph. En Netlify se detectan `DEPLOY_PRIME_URL` y `URL` automáticamente; en el navegador se usa el origen actual como último recurso.
- Revisá las dimensiones con `npm run check:images` (o `npm run check:images -- --strict` para fallar ante imágenes por debajo del mínimo); el informe está en `docs/IMAGENES.md`.

Validá los cambios con `npm run lint` y `npm run build`.

## Scripts de imágenes y logo

- `npm run check:images`: informa si las imágenes hero y retratos cumplen las dimensiones mínimas.
- `npm run check:images:strict`: valida las mismas dimensiones y termina con error si alguna no cumple.
- `npm run check:logo`: si existe `logo.svg`, valida fondo, colores, transparencia y peso; si no existe, informa que se usa `logo.png` y termina correctamente.
- `npm run make:logo-png`: cuando hay un SVG validado, genera `public/assets/logo/logo.png` desde él.
- `npm run images:optimize`: optimiza hero y retratos sin cambiar sus dimensiones; conserva originales cuando hace falta recomprimir.
- `npm run make:og`: genera la imagen Open Graph de 1200 × 630 px a partir del hero.
