# Auditoría de imágenes

Ejecutá `npm run check:images` para detectar imágenes de hero menores a 1600 px de ancho y retratos `sobre-marca-*` menores a 800 px. `npm run check:images -- --strict` informa los mismos hallazgos y termina con error si existe alguno.

## Resultado de la auditoría

Lista de archivos a reemplazar según la auditoría ejecutada:

- `public/assets/hero/hero-1.jpg` — 1376 × 768 px; hero por debajo de 1600 px.
- `public/assets/logo/logo.png` — 512 × 130 px; conviene reemplazarlo por el original vectorial o una fuente de mayor resolución. El logo no forma parte de los umbrales automatizados del script.

Los retratos actuales (`sobre-marca-1.jpg` y `sobre-marca-2.jpg`) miden 896 × 1200 px y superan el mínimo de 800 px.

La imagen social configurada (`public/assets/misc/og-image.jpg`) todavía no existe. El build advierte esta situación y usa `hero-1.jpg` como respaldo; agregá una imagen final de 1200 × 630 px para sustituirlo.
