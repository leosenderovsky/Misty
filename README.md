# Sitio de marca

Para adaptar este sitio a otro cliente:

- Editá `src/brand.config.ts` para identidad y logo, SEO, colores y tipografías (incluido el enlace a la hoja de estilos), canales de contacto, showroom y textos de cada sección. El tema alimenta los tokens `brand-*` de Tailwind.
- Reemplazá los archivos de `public/assets/` y actualizá sus rutas y textos alternativos en la configuración. Los iconos de favicon deben medir 32 × 32 y 180 × 180 px.
- Colocá el catálogo del cliente en `public/assets/products/`.
- Definí `VITE_SITE_URL` con el origen público del sitio para canonical y Open Graph; si falta, se usa el origen actual.

Validá los cambios con `npm run lint` y `npm run build`.
