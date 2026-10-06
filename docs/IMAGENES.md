# Imágenes

## Auditoría

- `npm run check:images` informa las imágenes hero de menos de 1280 px y los retratos `sobre-marca-*` de menos de 800 px.
- `npm run check:images:strict` aplica las mismas reglas y termina con error si encuentra alguna. El generador de imágenes entrega hasta aproximadamente 1376 px; elevar el mínimo del hero exige reescalar.
- `npm run check:icons` compara favicon-32.png y apple-touch-icon.png con la generación actual, y comprueba que el Apple touch icon mida 180 × 180 px y sea opaco.
- `npm run check:logo` solo valida transparencia, ausencia de una placa de fondo, los dos tonos teal de marca y un máximo de 30 KB cuando existe `logo.svg`; sin SVG informa que se usa `logo.png` (opcional) y termina correctamente.

## Logo vectorial

`public/assets/logo/logo.png` es el logo vigente del sitio. `logo.svg` es opcional: mientras no exista, el sitio continúa usando el PNG y `npm run check:logo` termina correctamente con un mensaje informativo. El SVG anterior está apartado en `docs/pendiente/logo.svg.invalido`; si se decide vectorizar el logo actual, el resultado debe tener fondo transparente y guardarse como `public/assets/logo/logo.svg`.

Solo cuando exista `logo.svg`, ejecutar `npm run check:logo` para validarlo. Si pasa, `npm run make:logo-png` genera `public/assets/logo/logo.png` a 1600 × 406 px con fondo transparente y mantiene su comportamiento actual: valida primero el SVG y actualiza únicamente ese PNG.

## Iconos

`npm run make:icons` genera `favicon-32.png` y `apple-touch-icon.png` desde el emblema de `logo.png`. `npm run check:icons` verifica que ambos coincidan con la generación actual y que `apple-touch-icon.png` mida 180 × 180 px y sea opaco. Si están desactualizados, ejecutá `npm run make:icons`.

## Optimización y redes sociales

- `npm run images:optimize` conserva en `.image-originals/` (ignorado por Git) las imágenes que superan el peso objetivo y las comprime con mozjpeg sin cambiar sus dimensiones. Si falta el original y la imagen actual ya cumple el objetivo, informa que ya está optimizada y no la copia ni la modifica; si lo supera, guarda primero esa imagen como original y luego la comprime. Cuando existe el original, las ejecuciones vuelven a generarse desde él.
- `npm run make:og` crea `public/assets/misc/og-image.jpg`, recortando el centro del hero a 1200 × 630 px y limitando el archivo a 200 KB.
