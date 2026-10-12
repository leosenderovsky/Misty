# Diccionario de Campos Editables

Este documento lista todos los campos editables del archivo `src/data/brand.json` definidos en `src/data/brand.schema.json`.

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | Versión del esquema | Versión del formato de este archivo. No lo cambies a mano. | `number` |  |  |
| `site` | Identificador del sitio | Nombre interno del prototipo o del cliente (minúsculas, sin espacios). | `text` |  |  |
| `demo.showPrototypeBanner` | Mostrar aviso de prototipo | Si está activo, el sitio muestra la franja que aclara que es un prototipo. En un cliente real se quita el banner. | `boolean` |  |  |
| `identity.name` | Nombre de la marca | Nombre que se muestra en el logo, el título de la página y los avisos. | `text` |  | Misty |
| `identity.niche` | Rubro | Frase corta que describe el negocio (por ejemplo, venta mayorista y minorista). | `text` |  | Venta Mayorista y Minorista |
| `identity.iconCrop.left` | Izquierda | Desplazamiento izquierdo del recorte (fracción de 0 a 1). | `number` |  |  |
| `identity.iconCrop.top` | Arriba | Desplazamiento superior del recorte (fracción de 0 a 1). | `number` |  |  |
| `identity.iconCrop.width` | Ancho | Ancho del recorte (fracción de 0 a 1). | `number` |  |  |
| `identity.iconCrop.height` | Alto | Alto del recorte (fracción de 0 a 1). | `number` |  |  |
| `logo.src` | Archivo del logo | Ruta pública del logo en PNG con fondo transparente. | `image` | path: public/assets/logo/logo.png, minWidth: 190px, ratio: libre, maxKB: 120KB | /assets/logo/logo.png |
| `logo.favicon32` | Favicon | Ícono de 32 × 32 píxeles que aparece en la pestaña del navegador. | `image` | path: public/assets/logo/favicon-32.png, minWidth: 32px, ratio: 1:1, maxKB: 20KB |  |
| `logo.appleTouchIcon` | Ícono Apple | Ícono de 180 × 180 píxeles, opaco, para dispositivos Apple. | `image` | path: public/assets/logo/apple-touch-icon.png, minWidth: 180px, ratio: 1:1, maxKB: 40KB |  |
| `logo.alt` | Texto alternativo del logo | Descripción breve del logo para accesibilidad. Suele ser el nombre de la marca. | `text` |  | Misty |
| `seo.titleSuffix` | Sufijo del título | Texto que acompaña al nombre de la marca en la pestaña del navegador y en redes. | `text` |  | Indumentaria Femenina & Showroom |
| `seo.description` | Descripción | Resumen que aparece en buscadores y al compartir el enlace. | `textarea` |  | Prendas modernas diseñadas para acompañar tu rutina con telas de excelente textura, confección minuciosa y la calidez de un trato persona a persona. Showroom Flores y envíos a todo el país. |
| `seo.socialImage` | Imagen para redes | Imagen de 1200 × 630 píxeles que se muestra al compartir el sitio. | `image` | path: public/assets/misc/og-image.jpg, minWidth: 1200px, ratio: 1200:630, maxKB: 200KB | /assets/misc/og-image.jpg |
| `typography.headingFont` | Fuente de títulos | Familia tipográfica para títulos (por ejemplo, Playfair Display, serif). | `text` |  |  |
| `typography.bodyFont` | Fuente de texto | Familia tipográfica para párrafos y botones. | `text` |  |  |
| `typography.stylesheetUrl` | Hoja de fuentes | URL de Google Fonts u otra hoja que carga las tipografías. | `url` |  |  |
| `theme.primary` | Color principal | Color de botones principales y acentos fuertes. | `color` |  |  |
| `theme.primaryHover` | Principal al pasar el cursor | Variante más oscura del color principal para el estado hover. | `color` |  |  |
| `theme.secondary` | Color secundario | Color de botones y detalles secundarios. | `color` |  |  |
| `theme.secondaryDark` | Secundario oscuro | Variante oscura del color secundario. | `color` |  |  |
| `theme.secondaryContainer` | Contenedor secundario | Fondo suave para chips, íconos y destacados. | `color` |  |  |
| `theme.secondaryFixed` | Acento fijo | Acento claro para badges y selecciones. | `color` |  |  |
| `theme.surface` | Fondo de página | Color de fondo principal del sitio. | `color` |  |  |
| `theme.surfaceDim` | Fondo atenuado | Fondo un poco más oscuro, por ejemplo detrás del hero. | `color` |  |  |
| `theme.surfaceContainerLow` | Contenedor bajo | Fondo de bloques como el pie de página. | `color` |  |  |
| `theme.surfaceContainer` | Contenedor | Fondo de tarjetas y franjas intermedias. | `color` |  |  |
| `theme.surfaceContainerHigh` | Contenedor alto | Fondo un punto más marcado que el contenedor. | `color` |  |  |
| `theme.surfaceContainerHighest` | Contenedor máximo | Fondo más marcado; también se usa en bordes suaves. | `color` |  |  |
| `theme.surfaceBright` | Fondo claro | Superficie blanca o muy clara para tarjetas. | `color` |  |  |
| `theme.onSurface` | Texto sobre fondo | Color del texto principal. | `color` |  |  |
| `theme.onSurfaceVariant` | Texto secundario | Color de párrafos y textos de apoyo. | `color` |  |  |
| `theme.outline` | Borde | Color de bordes visibles. | `color` |  |  |
| `theme.outlineVariant` | Borde suave | Color de separadores y bordes discretos. | `color` |  |  |
| `contact.whatsapp.number` | Número de WhatsApp | Número internacional solo con dígitos, sin + ni espacios. Ejemplo: 5491140008800. | `whatsapp` |  | 5491140008800 |
| `contact.whatsapp.display` | Número para mostrar | Número con formato legible, como se ve en la página. | `text` |  | +54 9 11 4000-8800 |
| `contact.whatsapp.messages.default` | Mensaje general | Mensaje al tocar el botón principal o el flotante de WhatsApp. | `textarea` |  | ¡Hola Misty! Quisiera consultar por sus prendas y conocer el catálogo. |
| `contact.whatsapp.messages.wholesale` | Mensaje mayorista | Mensaje al pedir lista de precios o catálogo mayorista. | `textarea` |  | ¡Hola Misty! Me interesa solicitar la lista de precios mayorista y el catálogo en PDF. |
| `contact.whatsapp.messages.retail` | Mensaje minorista | Mensaje opcional para consultas de venta por unidad. | `textarea` |  |  |
| `contact.instagram.handle` | Usuario de Instagram | Nombre de usuario con @, como se muestra en el sitio. | `text` |  | @misty.indumentaria |
| `contact.instagram.url` | Enlace de Instagram | URL completa del perfil. | `url` |  | https://instagram.com/misty.indumentaria |
| `contact.email` | Correo electrónico | Dirección de correo que se muestra en el pie. | `text` |  | ventas@misty.com.ar |
| `contact.address.full` | Dirección completa | Calle, número y local, como se muestra en el sitio. | `text` |  | Av. Avellaneda 2840, Local 12 |
| `contact.address.mapsUrl` | Enlace de Google Maps | URL para abrir la ubicación. Si falta, el sitio arma una búsqueda con la dirección y la ciudad. | `url` |  | https://maps.google.com/?q=Av.%20Avellaneda%202840%2C%20Local%2012%2C%20Flores%2C%20Buenos%20Aires |
| `contact.address.city` | Ciudad | Ciudad y provincia para completar la búsqueda en el mapa. | `text` |  | Flores, Buenos Aires |
| `contact.address.transitInfo` | Cómo llegar | Texto opcional sobre colectivos, subte o estacionamiento. | `textarea` |  |  |
| `contact.hours.lines` | Líneas de horario | Cada ítem es una línea, por ejemplo de lunes a viernes y sábados. | `hours-list` |  | ["Lun a Vie: 08:00 a 17:00 hs","Sábados: 08:30 a 13:30 hs"] |
| `contact.hours.closedWeekdays` | Días cerrado | Números de 0 (domingo) a 6 (sábado) en los que no hay atención. | `list` |  |  |
| `navigation.links[].label` | Texto del enlace | Etiqueta visible en el menú. | `text` |  | Nosotros |
| `navigation.links[].href` | Destino | Ancla o URL del enlace (por ejemplo #contacto). | `text` |  |  |
| `navigation.ctaButtonText` | Botón de contacto (escritorio) | Texto del botón de WhatsApp en pantallas grandes. | `text` |  | Escribinos por WhatsApp |
| `navigation.ctaButtonTextMobile` | Botón de contacto (celular) | Texto corto del mismo botón en el celular. | `text` |  | WhatsApp |
| `marquee.items` | Frases | Lista de mensajes de la franja. | `list` |  | ["Envíos a todo el país por expreso y correo"] |
| `hero.eyebrowBadge` | Etiqueta superior | Texto chico encima del título de la portada. | `text` |  | Nueva Temporada · Mayorista & Minorista |
| `hero.headline` | Título de portada | Título principal de la primera pantalla. | `textarea` |  | Moda versátil que acompaña tu ritmo de vida |
| `hero.subheadline` | Bajada de portada | Párrafo de apoyo debajo del título. | `textarea` |  | Prendas contemporáneas con excelente relación precio–calidad. Diseñadas para renovar tu guardarropa y potenciar tu negocio o estilo diario. |
| `hero.backgroundImage.src` | Archivo de portada | Foto horizontal de al menos 1280 px de ancho. | `image` | path: public/assets/hero/hero-1.jpg, minWidth: 1280px, ratio: 1376:768, maxKB: 250KB | /assets/hero/hero-1.jpg |
| `hero.backgroundImage.fallback` | Imagen de respaldo | Foto alternativa si no carga la de portada. | `image` |  |  |
| `hero.backgroundImage.alt` | Texto alternativo | Descripción de la foto de portada. | `text` |  | Editorial lookbook de campaña con modelos en showroom contemporáneo |
| `hero.backgroundImage.width` | Ancho en píxeles | Ancho real del archivo, para que la página reserve el espacio. | `number` |  |  |
| `hero.backgroundImage.height` | Alto en píxeles | Alto real del archivo. | `number` |  |  |
| `hero.primaryCta.label` | Botón principal | Texto del botón de WhatsApp en la portada. | `text` |  | Escribinos por WhatsApp |
| `hero.secondaryCta.label` | Botón secundario | Texto del segundo botón de la portada. | `text` |  | Conocé la marca |
| `hero.secondaryCta.targetSectionId` | Sección de destino | Id de la sección a la que baja el botón (sin #). | `text` |  |  |
| `hero.trustBadges[].id` | Identificador | Id interno del sello (minúsculas y guiones). | `text` |  |  |
| `hero.trustBadges[].iconType` | Ícono | Dibujo del sello: atención, envío o tilde. | `icon` |  |  |
| `hero.trustBadges[].label` | Texto del sello | Frase corta junto al ícono. | `text` |  | Atención personalizada |
| `quickWholesaleBar.title` | Título de la franja | Título de la barra mayorista y minorista. | `text` |  | Venta por mayor y por menor sin intermediarios |
| `quickWholesaleBar.subtitle` | Bajada de la franja | Texto de apoyo de la barra. | `textarea` |  | Llevá curvas completas para tu comercio o tus prendas favoritas por unidad. |
| `quickWholesaleBar.buttonText` | Botón de la franja | Texto del botón que abre WhatsApp mayorista. | `text` |  | Pedir Lista Mayorista (PDF) |
| `essenceSection.eyebrow` | Etiqueta de la sección | Texto chico encima del título. | `text` |  | Nuestra Esencia |
| `essenceSection.title` | Título de la sección | Título de la presentación de la marca. | `text` |  | Diseño actual para todos los días |
| `essenceSection.description` | Descripción | Párrafo que presenta a la marca. | `textarea` |  | Creemos en una moda simple, auténtica y pensada para acompañar tu día a día. Creamos prendas actuales, cómodas y bien confeccionadas, con una buena relación entre calidad y precio, para que renovar tu guardarropa sea fácil y accesible. |
| `essenceSection.look1.src` | Archivo de la foto | Retrato vertical de al menos 800 px de ancho. | `image` | path: public/assets/misc/sobre-marca-1.jpg, minWidth: 800px, ratio: 896:1200, maxKB: 180KB | /assets/misc/sobre-marca-1.jpg |
| `essenceSection.look1.fallback` | Imagen de respaldo | Foto alternativa si no carga la principal. | `image` |  |  |
| `essenceSection.look1.alt` | Texto alternativo | Descripción de la foto. | `text` |  | Modelo luciendo blazer terracota elegante y top neutro |
| `essenceSection.look1.width` | Ancho en píxeles | Ancho real del archivo. | `number` |  |  |
| `essenceSection.look1.height` | Alto en píxeles | Alto real del archivo. | `number` |  |  |
| `essenceSection.look1.badgeCategory` | Etiqueta sobre la foto | Texto chico superpuesto (categoría del look). | `text` |  | Look 01 · Sastrería Relajada |
| `essenceSection.look1.badgeTitle` | Título sobre la foto | Texto superpuesto más destacado. | `text` |  | Lino & Gabardina Premium |
| `essenceSection.look2.src` | Archivo de la foto | Retrato vertical de al menos 800 px de ancho. | `image` | path: public/assets/misc/sobre-marca-1.jpg, minWidth: 800px, ratio: 896:1200, maxKB: 180KB | /assets/misc/sobre-marca-1.jpg |
| `essenceSection.look2.fallback` | Imagen de respaldo | Foto alternativa si no carga la principal. | `image` |  |  |
| `essenceSection.look2.alt` | Texto alternativo | Descripción de la foto. | `text` |  | Modelo luciendo blazer terracota elegante y top neutro |
| `essenceSection.look2.width` | Ancho en píxeles | Ancho real del archivo. | `number` |  |  |
| `essenceSection.look2.height` | Alto en píxeles | Alto real del archivo. | `number` |  |  |
| `essenceSection.look2.badgeCategory` | Etiqueta sobre la foto | Texto chico superpuesto (categoría del look). | `text` |  | Look 01 · Sastrería Relajada |
| `essenceSection.look2.badgeTitle` | Título sobre la foto | Texto superpuesto más destacado. | `text` |  | Lino & Gabardina Premium |
| `essenceSection.pillars[].id` | Identificador | Id interno del pilar. | `text` |  |  |
| `essenceSection.pillars[].title` | Título del pilar | Título corto. | `text` |  | Tendencias reales |
| `essenceSection.pillars[].description` | Texto del pilar | Explicación del pilar. | `textarea` |  | Siluetas modernas concebidas para la mujer real. Una fusión equilibrada entre elegancia casual, versatilidad diurna y comodidad total. |
| `essenceSection.pillars[].iconType` | Ícono | Dibujo del pilar. | `icon` |  |  |
| `processSection.eyebrowBadge` | Etiqueta | Texto chico encima del título. | `text` |  | Experiencia Ágil |
| `processSection.title` | Título | Título de la sección de pasos. | `text` |  | Comprar en Misty es simple y directo |
| `processSection.subtitle` | Bajada | Párrafo de apoyo. | `textarea` |  | Sin registros eternos ni procesos engorrosos. Coordinamos todo persona a persona. |
| `processSection.steps[].number` | Número | Número visible del paso (01, 02, 03). | `text` |  |  |
| `processSection.steps[].title` | Título del paso | Nombre del paso. | `text` |  | Elegí tus prendas |
| `processSection.steps[].description` | Texto del paso | Explicación del paso. | `textarea` |  | Mirá nuestro lookbook y solicitá el catálogo digital con stock actualizado al instante en WhatsApp. |
| `processSection.steps[].iconType` | Ícono | Dibujo del paso. | `icon` |  |  |
| `contactSection.eyebrowBadge` | Etiqueta | Texto chico encima del título de contacto. | `text` |  | Canales de Atención |
| `contactSection.title` | Título | Título de la sección de contacto. | `text` |  | Estamos cerca tuyo |
| `contactSection.subtitle` | Bajada | Párrafo de apoyo de la sección de contacto. | `textarea` |  | Contactanos a través del medio que más cómodo te resulte. Estamos a un mensaje de distancia para resolver dudas, pasar presupuestos y tomar pedidos. |
| `contactSection.whatsappCard.badge` | Etiqueta de la tarjeta | Texto chico de la tarjeta de WhatsApp. | `text` |  | Canal Principal |
| `contactSection.whatsappCard.title` | Título de la tarjeta | Título de la tarjeta de WhatsApp. | `text` |  | WhatsApp Directo |
| `contactSection.whatsappCard.description` | Texto de la tarjeta | Descripción de la tarjeta de WhatsApp. | `textarea` |  | Atención inmediata para listas de precios, consultas mayoristas y pedidos minoristas. |
| `contactSection.whatsappCard.buttonText` | Botón de la tarjeta | Texto del botón de WhatsApp. | `text` |  | Chatear con asesoras |
| `contactSection.instagramCard.title` | Título de Instagram | Título de la tarjeta de Instagram. | `text` |  | Instagram Oficial |
| `contactSection.instagramCard.badge` | Etiqueta de Instagram | Texto chico de la tarjeta de Instagram. | `text` |  | Comunidad Activa |
| `contactSection.instagramCard.description` | Texto de Instagram | Descripción de la cuenta. | `textarea` |  | Mirá las prendas en movimiento, looks cotidianos, reviews de clientas y novedades semanales. |
| `contactSection.instagramCard.buttonText` | Botón de Instagram | Texto del botón que abre Instagram. | `text` |  | Ver comunidad & novedades |
| `contactSection.showroomCard.title` | Título de la tarjeta de showroom | Título corto de la tarjeta de local. | `text` |  | Showroom Comercial |
| `contactSection.showroomCard.hoursLabel` | Rótulo de horarios | Texto que precede a las líneas de horario. | `text` |  | Horarios de Atención: |
| `contactSection.showroomCard.badge` | Etiqueta de showroom | Texto chico de la tarjeta de showroom. | `text` |  | Punto de Venta |
| `contactSection.showroomCard.buttonText` | Botón de cómo llegar | Texto del botón de la tarjeta de showroom. | `text` |  | Cómo llegar |
| `contactSection.mapCallout.eyebrow` | Etiqueta del mapa | Texto chico encima del título del mapa. | `text` |  | Ubicación Estratégica |
| `contactSection.mapCallout.description` | Texto del mapa | Cómo llegar o ventajas de la ubicación. | `textarea` |  | Fácil acceso en colectivos y subte Línea A. Estacionamiento comercial disponible en la zona. |
| `contactSection.mapCallout.buttonText` | Botón del mapa | Texto del botón que abre Google Maps. | `text` |  | Abrir en Google Maps |
| `contactSection.showroomTitle` | Título del showroom en el mapa | Título largo que se muestra junto a la ilustración del mapa. Es distinto del título corto de la tarjeta. | `text` |  | Showroom en el corazón textil de Flores |
| `wholesaleCallout.badge` | Etiqueta | Texto chico del bloque mayorista. | `text` |  | Canal Exclusivo para Emprendedoras |
| `wholesaleCallout.title` | Título | Título del llamado a comercios. | `text` |  | ¿Tenés local o vendés online? |
| `wholesaleCallout.description` | Descripción | Texto del llamado mayorista. | `textarea` |  | Consultá hoy mismo por WhatsApp para recibir la lista de precios mayorista actualizada, condiciones de compra mínima por bulto y el catálogo en PDF para empezar a vender de inmediato. |
| `wholesaleCallout.buttonText` | Botón | Texto del botón de catálogo mayorista. | `text` |  | Solicitar Catálogo Mayorista |
| `footer.brandDescription` | Descripción de la marca | Párrafo corto junto al logo en el pie. | `textarea` |  | Indumentaria femenina con identidad contemporánea, disponible para pedidos por menor y curvas mayoristas. |
| `footer.trustBadge` | Sello del pie | Frase de confianza debajo de la descripción. | `text` |  | Canal Mayorista & Minorista |
| `footer.showroomTitle` | Título de showroom | Título de la columna de dirección y horarios. | `text` |  | Atención & Showroom |
| `footer.channelsTitle` | Título de canales | Título de la columna de Instagram, WhatsApp y correo. | `text` |  | Contacto Directo |
| `footer.legalTitle` | Título legal | Título de la columna legal. | `text` |  | Información Legal |
| `footer.legalNotice` | Aviso legal | Texto legal o de prototipo. | `textarea` |  | Este sitio web corresponde a una demostración institucional con fines conceptuales y de portfolio. Toda marca y productos referenciados forman parte de un prototipo de diseño. |
| `footer.copyrightText` | Copyright | Línea de derechos reservados. | `text` |  | © 2026 Misty Indumentaria. Todos los derechos reservados. |
| `footer.demonstrationDisclaimer` | Leyenda de demostración | Texto base de prototipo. El sitio lo completa con el nombre del servicio. | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |
| `footer.variantTag` | Etiqueta de variante | Crédito o nombre de la variante de diseño. | `text` |  | Variante A · Editorial Lookbook · Diseño y Desarrollo de Arquitectura Web Frontend |
