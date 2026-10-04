# Sitio de marca

Para adaptar este sitio a otro cliente:

- Editá `src/brand.config.ts` para identidad y logo, SEO, colores y tipografías (incluido el enlace a la hoja de estilos), canales de contacto, showroom y textos de cada sección. El tema alimenta los tokens `brand-*` de Tailwind.
- Reemplazá los archivos de `public/assets/` y actualizá sus rutas y textos alternativos en la configuración. Los iconos de favicon deben medir 32 × 32 y 180 × 180 px; generá el Apple touch icon desde el emblema del logo con `npm run make:icons`.
- Colocá el catálogo del cliente en `public/assets/products/`.
- Configurá `seo.socialImage` en `src/brand.config.ts` con una imagen social de 1200 × 630 px. Si el archivo no existe, el build advierte y usa el hero como respaldo.
- Definí `VITE_SITE_URL` con el origen público del sitio para canonical y Open Graph. En Netlify se detectan `DEPLOY_PRIME_URL` y `URL` automáticamente; en el navegador se usa el origen actual como último recurso.
- Revisá las dimensiones con `npm run check:images` (o `npm run check:images -- --strict` para fallar ante imágenes por debajo del mínimo); el informe está en `docs/IMAGENES.md`.

Validá los cambios con `npm run lint` y `npm run build`.
