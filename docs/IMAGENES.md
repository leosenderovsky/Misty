# Imágenes

## Auditoría

- `npm run check:images` informa las imágenes hero de menos de 1280 px y los retratos `sobre-marca-*` de menos de 800 px.
- `npm run check:images:strict` aplica las mismas reglas y termina con error si encuentra alguna. El generador de imágenes entrega hasta aproximadamente 1376 px; elevar el mínimo del hero exige reescalar.
- `npm run check:logo` valida transparencia, ausencia de una placa de fondo, los dos tonos teal de marca y un máximo de 30 KB para el SVG.

## Logo vectorial

El SVG actual está apartado en `docs/pendiente/logo.svg.invalido`; el sitio continúa usando `public/assets/logo/logo.png`. El dueño debe vectorizar el `logo.png` con Vectorizer.ai o con «Calco de imagen» de Illustrator en modo color y con 2 a 3 colores. El resultado debe tener fondo transparente y guardarse como `public/assets/logo/logo.svg`.

Después de reemplazarlo, ejecutar `npm run check:logo`. Cuando pase esa validación, `npm run make:logo-png` genera `public/assets/logo/logo.png` a 1600 × 406 px con fondo transparente. El generador valida primero el SVG y actualiza únicamente ese PNG.

## Optimización y redes sociales

- `npm run images:optimize` conserva los originales en `.image-originals/` (ignorados por Git) y comprime hero y retratos con mozjpeg sin cambiar sus dimensiones. Las siguientes ejecuciones parten de esos originales y producen el mismo resultado.
- `npm run make:og` crea `public/assets/misc/og-image.jpg`, recortando el centro del hero a 1200 × 630 px y limitando el archivo a 200 KB.
