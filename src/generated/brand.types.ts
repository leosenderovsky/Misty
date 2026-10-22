/* Types generated from src/data/brand.schema.json. Do not edit by hand. */

/**
 * Versión del formato de este archivo. No lo cambies a mano.
 */
export type VersionDelEsquema = number;
/**
 * Nombre interno del prototipo o del cliente (minúsculas, sin espacios). Identifica el modelo de sitio (no se reemplaza por datos de un cliente).
 */
export type IdentificadorDelSitio = string;
/**
 * Si está activo, el sitio muestra la franja que aclara que es un prototipo. En un cliente real se quita el banner.
 */
export type MostrarAvisoDePrototipo = boolean;
/**
 * Nombre que se muestra en el logo, el título de la página y los avisos.
 */
export type NombreDeLaMarca = string;
/**
 * Frase corta que describe el negocio (por ejemplo, venta mayorista y minorista).
 */
export type Rubro = string;
/**
 * Ruta pública del logo en PNG con fondo transparente.
 */
export type ArchivoDelLogo = string;
/**
 * Ícono de 32 × 32 píxeles que aparece en la pestaña del navegador.
 */
export type Favicon = string;
/**
 * Ícono de 180 × 180 píxeles, opaco, para dispositivos Apple.
 */
export type IconoApple = string;
/**
 * Descripción breve del logo para accesibilidad. Suele ser el nombre de la marca.
 */
export type TextoAlternativoDelLogo = string;
export type Izquierda = number;
export type Arriba = number;
export type Ancho = number;
export type Alto = number;
/**
 * Texto que acompaña al nombre de la marca en la pestaña del navegador y en redes.
 */
export type SufijoDelTitulo = string;
/**
 * Resumen que aparece en buscadores y al compartir el enlace.
 */
export type Descripcion = string;
/**
 * Imagen de 1200 × 630 píxeles que se muestra al compartir el sitio.
 */
export type ImagenParaRedes = string;
/**
 * Familia tipográfica para títulos (por ejemplo, Playfair Display, serif).
 */
export type FuenteDeTitulos = string;
/**
 * Familia tipográfica para párrafos y botones.
 */
export type FuenteDeTexto = string;
/**
 * URL de Google Fonts u otra hoja que carga las tipografías.
 */
export type HojaDeFuentes = string;
/**
 * Color de botones principales y acentos fuertes.
 */
export type ColorPrincipal = string;
/**
 * Variante más oscura del color principal para el estado hover.
 */
export type PrincipalAlPasarElCursor = string;
/**
 * Color de botones y detalles secundarios.
 */
export type ColorSecundario = string;
/**
 * Variante oscura del color secundario.
 */
export type SecundarioOscuro = string;
/**
 * Fondo suave para chips, íconos y destacados.
 */
export type ContenedorSecundario = string;
/**
 * Acento claro para badges y selecciones.
 */
export type AcentoFijo = string;
/**
 * Color de fondo principal del sitio.
 */
export type FondoDePagina = string;
/**
 * Fondo un poco más oscuro, por ejemplo detrás del hero.
 */
export type FondoAtenuado = string;
/**
 * Fondo de bloques como el pie de página.
 */
export type ContenedorBajo = string;
/**
 * Fondo de tarjetas y franjas intermedias.
 */
export type Contenedor = string;
/**
 * Fondo un punto más marcado que el contenedor.
 */
export type ContenedorAlto = string;
/**
 * Fondo más marcado; también se usa en bordes suaves.
 */
export type ContenedorMaximo = string;
/**
 * Superficie blanca o muy clara para tarjetas.
 */
export type FondoClaro = string;
/**
 * Color del texto principal.
 */
export type TextoSobreFondo = string;
/**
 * Color de párrafos y textos de apoyo.
 */
export type TextoSecundario = string;
/**
 * Color de bordes visibles.
 */
export type Borde = string;
/**
 * Color de separadores y bordes discretos.
 */
export type BordeSuave = string;
/**
 * Número internacional solo con dígitos, sin + ni espacios. Ejemplo: 5491140008800.
 */
export type NumeroDeWhatsApp = string;
/**
 * Número con formato legible, como se ve en la página.
 */
export type NumeroParaMostrar = string;
/**
 * Mensaje al tocar el botón principal o el flotante de WhatsApp.
 */
export type MensajeGeneral = string;
/**
 * Mensaje al pedir lista de precios o catálogo mayorista.
 */
export type MensajeMayorista = string;
/**
 * Mensaje opcional para consultas de venta por unidad.
 */
export type MensajeMinorista = string;
/**
 * Nombre de usuario con @, como se muestra en el sitio.
 */
export type UsuarioDeInstagram = string;
/**
 * URL completa del perfil.
 */
export type EnlaceDeInstagram = string;
/**
 * Dirección de correo que se muestra en el pie.
 */
export type CorreoElectronico = string;
/**
 * Calle, número y local, como se muestra en el sitio.
 */
export type DireccionCompleta = string;
/**
 * URL para abrir la ubicación. Si falta, el sitio arma una búsqueda con la dirección y la ciudad.
 */
export type EnlaceDeGoogleMaps = string;
/**
 * Ciudad y provincia para completar la búsqueda en el mapa.
 */
export type Ciudad = string;
/**
 * Texto opcional sobre colectivos, subte o estacionamiento.
 */
export type ComoLlegar = string;
/**
 * Una línea de días y horas.
 */
export type LineaDeHorario = string;
/**
 * Cada ítem es una línea, por ejemplo de lunes a viernes y sábados.
 */
export type LineasDeHorario = LineaDeHorario[];
/**
 * 0 es domingo y 6 es sábado.
 */
export type DiaCerrado = number;
/**
 * Números de 0 (domingo) a 6 (sábado) en los que no hay atención.
 */
export type DiasCerrado = DiaCerrado[];
/**
 * Etiqueta visible en el menú.
 */
export type TextoDelEnlace = string;
/**
 * Ancla o URL del enlace (por ejemplo #contacto).
 */
export type Destino = string;
/**
 * Ítems del menú superior.
 */
export type EnlacesDelMenu = {
  label: TextoDelEnlace;
  href: Destino;
}[];
/**
 * Texto del botón de WhatsApp en pantallas grandes.
 */
export type BotonDeContactoEscritorio = string;
/**
 * Texto corto del mismo botón en el celular.
 */
export type BotonDeContactoCelular = string;
/**
 * Una frase de la franja móvil.
 */
export type Frase = string;
/**
 * Lista de mensajes de la franja.
 */
export type Frases = Frase[];
/**
 * Usa {address} para insertar la dirección. Dejalo vacío para no mostrar ese ítem.
 */
export type TextoDelShowroomEnLaCinta = string;
/**
 * Texto chico encima del título de la portada.
 */
export type EtiquetaSuperior = string;
/**
 * Título principal de la primera pantalla.
 */
export type TituloDePortada = string;
/**
 * Párrafo de apoyo debajo del título.
 */
export type BajadaDePortada = string;
/**
 * Foto horizontal de al menos 1280 px de ancho.
 */
export type ArchivoDePortada = string;
/**
 * Foto alternativa si no carga la de portada.
 */
export type ImagenDeRespaldo = string;
/**
 * Descripción de la foto de portada.
 */
export type TextoAlternativo = string;
/**
 * Ancho real del archivo, para que la página reserve el espacio.
 */
export type AnchoEnPixeles = number;
/**
 * Alto real del archivo.
 */
export type AltoEnPixeles = number;
/**
 * Texto del botón de WhatsApp en la portada.
 */
export type BotonPrincipal = string;
/**
 * Texto del segundo botón de la portada.
 */
export type BotonSecundario = string;
/**
 * Id de la sección a la que baja el botón (sin #).
 */
export type SeccionDeDestino = string;
/**
 * Id interno del sello (minúsculas y guiones).
 */
export type Identificador = string;
/**
 * Dibujo del sello: atención, envío o tilde.
 */
export type Icono = "support" | "shipping" | "check";
/**
 * Frase corta junto al ícono.
 */
export type TextoDelSello = string;
/**
 * Tres frases con ícono debajo de los botones.
 */
export type SellosDeConfianza = {
  id: Identificador;
  iconType: Icono;
  label: TextoDelSello;
}[];
/**
 * Título de la barra mayorista y minorista.
 */
export type TituloDeLaFranja = string;
/**
 * Texto de apoyo de la barra.
 */
export type BajadaDeLaFranja = string;
/**
 * Texto del botón que abre WhatsApp mayorista.
 */
export type BotonDeLaFranja = string;
/**
 * Si se desactiva, la barra no se muestra.
 */
export type MostrarLaBarraMayoristaRapida = boolean;
/**
 * Texto chico encima del título.
 */
export type EtiquetaDeLaSeccion = string;
/**
 * Título de la presentación de la marca.
 */
export type TituloDeLaSeccion = string;
/**
 * Párrafo que presenta a la marca.
 */
export type Descripcion1 = string;
/**
 * Retrato vertical de al menos 800 px de ancho.
 */
export type ArchivoDeLaFoto = string;
/**
 * Foto alternativa si no carga la principal.
 */
export type ImagenDeRespaldo1 = string;
/**
 * Descripción de la foto.
 */
export type TextoAlternativo1 = string;
/**
 * Ancho real del archivo.
 */
export type AnchoEnPixeles1 = number;
/**
 * Alto real del archivo.
 */
export type AltoEnPixeles1 = number;
/**
 * Texto chico superpuesto (categoría del look).
 */
export type EtiquetaSobreLaFoto = string;
/**
 * Texto superpuesto más destacado.
 */
export type TituloSobreLaFoto = string;
/**
 * Id interno del pilar.
 */
export type Identificador1 = string;
/**
 * Título corto.
 */
export type TituloDelPilar = string;
/**
 * Explicación del pilar.
 */
export type TextoDelPilar = string;
/**
 * Dibujo del pilar.
 */
export type Icono1 = "palette" | "precision" | "groups";
/**
 * Tres ideas con ícono, título y texto.
 */
export type Pilares = {
  id: Identificador1;
  title: TituloDelPilar;
  description: TextoDelPilar;
  iconType: Icono1;
}[];
/**
 * Texto chico encima del título.
 */
export type Etiqueta = string;
/**
 * Título de la sección de pasos.
 */
export type Titulo = string;
/**
 * Párrafo de apoyo.
 */
export type Bajada = string;
/**
 * Número visible del paso (01, 02, 03).
 */
export type Numero = string;
/**
 * Nombre del paso.
 */
export type TituloDelPaso = string;
/**
 * Explicación del paso.
 */
export type TextoDelPaso = string;
/**
 * Dibujo del paso.
 */
export type Icono2 = "book" | "chat" | "mail";
/**
 * Lista de pasos numerados.
 */
export type Pasos = {
  number: Numero;
  title: TituloDelPaso;
  description: TextoDelPaso;
  iconType: Icono2;
}[];
/**
 * Texto chico encima del título de contacto.
 */
export type Etiqueta1 = string;
/**
 * Título de la sección de contacto.
 */
export type Titulo1 = string;
/**
 * Párrafo de apoyo de la sección de contacto.
 */
export type Bajada1 = string;
/**
 * Texto chico de la tarjeta de WhatsApp.
 */
export type EtiquetaDeLaTarjeta = string;
/**
 * Título de la tarjeta de WhatsApp.
 */
export type TituloDeLaTarjeta = string;
/**
 * Descripción de la tarjeta de WhatsApp.
 */
export type TextoDeLaTarjeta = string;
/**
 * Texto del botón de WhatsApp.
 */
export type BotonDeLaTarjeta = string;
/**
 * Título de la tarjeta de Instagram.
 */
export type TituloDeInstagram = string;
/**
 * Texto chico de la tarjeta de Instagram.
 */
export type EtiquetaDeInstagram = string;
/**
 * Descripción de la cuenta.
 */
export type TextoDeInstagram = string;
/**
 * Texto del botón que abre Instagram.
 */
export type BotonDeInstagram = string;
/**
 * Título corto de la tarjeta de local.
 */
export type TituloDeLaTarjetaDeShowroom = string;
/**
 * Texto que precede a las líneas de horario.
 */
export type RotuloDeHorarios = string;
/**
 * Texto chico de la tarjeta de showroom.
 */
export type EtiquetaDeShowroom = string;
/**
 * Texto del botón de la tarjeta de showroom.
 */
export type BotonDeComoLlegar = string;
/**
 * Usa {name} para insertar el nombre de la marca.
 */
export type DescripcionAccesibleDelMapa = string;
/**
 * Texto chico encima del título del mapa.
 */
export type EtiquetaDelMapa = string;
/**
 * Cómo llegar o ventajas de la ubicación.
 */
export type TextoDelMapa = string;
/**
 * Texto del botón que abre Google Maps.
 */
export type BotonDelMapa = string;
/**
 * Título largo que se muestra junto a la ilustración del mapa. Es distinto del título corto de la tarjeta.
 */
export type TituloDelShowroomEnElMapa = string;
/**
 * Texto chico del bloque mayorista.
 */
export type Etiqueta2 = string;
/**
 * Título del llamado a comercios.
 */
export type Titulo2 = string;
/**
 * Texto del llamado mayorista.
 */
export type Descripcion2 = string;
/**
 * Texto del botón de catálogo mayorista.
 */
export type Boton = string;
/**
 * Si se desactiva, el bloque no se muestra.
 */
export type MostrarElLlamadoMayorista = boolean;
/**
 * Párrafo corto junto al logo en el pie.
 */
export type DescripcionDeLaMarca = string;
/**
 * Frase de confianza debajo de la descripción.
 */
export type SelloDelPie = string;
/**
 * Título de la columna de dirección y horarios.
 */
export type TituloDeShowroom = string;
/**
 * Título de la columna de Instagram, WhatsApp y correo.
 */
export type TituloDeCanales = string;
/**
 * Título de la columna legal.
 */
export type TituloLegal = string;
/**
 * Texto legal o de prototipo.
 */
export type AvisoLegal = string;
/**
 * Línea de derechos reservados.
 */
export type Copyright = string;
/**
 * Texto base de prototipo. El sitio lo completa con el nombre del servicio.
 */
export type LeyendaDeDemostracion = string;
/**
 * Crédito o nombre de la variante de diseño.
 */
export type EtiquetaDeVariante = string;
/**
 * Dejalo vacío para ocultar el enlace de WhatsApp del pie.
 */
export type TextoDelEnlaceDeWhatsApp = string;
/**
 * Lo leen los lectores de pantalla en el botón de menú del celular.
 */
export type EtiquetaAccesibleDelBotonDeMenu = string;
/**
 * Usa {name} para insertar el nombre de la marca.
 */
export type EtiquetaAccesibleDelLogo = string;
/**
 * Si se desactiva, el botón no se muestra.
 */
export type MostrarElBotonFlotante = boolean;
/**
 * Dejalo vacío para no mostrar el mensaje.
 */
export type MensajeJuntoAlBoton = string;
/**
 * Lo leen los lectores de pantalla.
 */
export type EtiquetaAccesibleParaCerrarElMensaje = string;
/**
 * Lo leen los lectores de pantalla.
 */
export type EtiquetaAccesibleDelBoton = string;

/**
 * Configuración editable de la marca y de los textos del sitio.
 */
export interface BrandConfig {
  schemaVersion: VersionDelEsquema;
  site: IdentificadorDelSitio;
  demo: Demostracion;
  identity: Identidad;
  logo: LogoEIconos;
  seo: BuscadoresYRedes;
  typography: Tipografias;
  theme: Colores;
  contact: Contacto;
  navigation: Navegacion;
  marquee?: FranjaMovil;
  hero: Portada;
  quickWholesaleBar: FranjaMayorista;
  essenceSection: NuestraEsencia;
  processSection: ProcesoDeCompra;
  contactSection: SeccionDeContacto;
  wholesaleCallout: LlamadoMayorista;
  footer: PieDePagina;
  ui: TextosDeInterfazYAccesibilidad;
}
/**
 * Opciones del prototipo de demostración.
 */
export interface Demostracion {
  showPrototypeBanner: MostrarAvisoDePrototipo;
}
/**
 * Nombre comercial y rubro.
 */
export interface Identidad {
  name: NombreDeLaMarca;
  niche: Rubro;
}
/**
 * Archivos del logo, favicon e ícono para dispositivos Apple.
 */
export interface LogoEIconos {
  src: ArchivoDelLogo;
  favicon32: Favicon;
  appleTouchIcon: IconoApple;
  alt: TextoAlternativoDelLogo;
  iconCrop?: RecorteDelEmblema;
}
/**
 * Fracciones de 0 a 1 del logo recortado. Solo hace falta si la detección automática del emblema no corta bien.
 */
export interface RecorteDelEmblema {
  left: Izquierda;
  top: Arriba;
  width: Ancho;
  height: Alto;
}
/**
 * Título, descripción e imagen que se muestran al compartir el sitio.
 */
export interface BuscadoresYRedes {
  titleSuffix: SufijoDelTitulo;
  description: Descripcion;
  socialImage: ImagenParaRedes;
}
/**
 * Fuentes de títulos y de texto, y la hoja de estilos de Google Fonts.
 */
export interface Tipografias {
  headingFont: FuenteDeTitulos;
  bodyFont: FuenteDeTexto;
  stylesheetUrl: HojaDeFuentes;
}
/**
 * Paleta de la marca. Cada valor es un color hexadecimal de seis dígitos.
 */
export interface Colores {
  primary: ColorPrincipal;
  primaryHover: PrincipalAlPasarElCursor;
  secondary: ColorSecundario;
  secondaryDark: SecundarioOscuro;
  secondaryContainer: ContenedorSecundario;
  secondaryFixed: AcentoFijo;
  surface: FondoDePagina;
  surfaceDim: FondoAtenuado;
  surfaceContainerLow: ContenedorBajo;
  surfaceContainer: Contenedor;
  surfaceContainerHigh: ContenedorAlto;
  surfaceContainerHighest: ContenedorMaximo;
  surfaceBright: FondoClaro;
  onSurface: TextoSobreFondo;
  onSurfaceVariant: TextoSecundario;
  outline: Borde;
  outlineVariant: BordeSuave;
}
/**
 * WhatsApp, Instagram, correo, dirección y horarios.
 */
export interface Contacto {
  whatsapp: WhatsApp;
  instagram: Instagram;
  email: CorreoElectronico;
  address: Direccion;
  hours: Horarios;
}
/**
 * Número y mensajes prearmados.
 */
export interface WhatsApp {
  number: NumeroDeWhatsApp;
  display: NumeroParaMostrar;
  messages: MensajesDeWhatsApp;
}
/**
 * Textos que se prellenan al abrir el chat.
 */
export interface MensajesDeWhatsApp {
  default: MensajeGeneral;
  wholesale: MensajeMayorista;
  retail?: MensajeMinorista;
}
/**
 * Usuario y enlace de la cuenta.
 */
export interface Instagram {
  handle: UsuarioDeInstagram;
  url: EnlaceDeInstagram;
}
/**
 * Showroom o local y enlace al mapa.
 */
export interface Direccion {
  full: DireccionCompleta;
  mapsUrl?: EnlaceDeGoogleMaps;
  city?: Ciudad;
  transitInfo?: ComoLlegar;
}
/**
 * Líneas de horario que se muestran en contacto y en el pie.
 */
export interface Horarios {
  lines: LineasDeHorario;
  closedWeekdays?: DiasCerrado;
}
/**
 * Enlaces del encabezado y textos de los botones.
 */
export interface Navegacion {
  links: EnlacesDelMenu;
  ctaButtonText: BotonDeContactoEscritorio;
  ctaButtonTextMobile: BotonDeContactoCelular;
}
/**
 * Frases que se desplazan debajo del encabezado.
 */
export interface FranjaMovil {
  items?: Frases;
  showroomText?: TextoDelShowroomEnLaCinta;
}
/**
 * Textos, imagen y botones de la primera sección.
 */
export interface Portada {
  eyebrowBadge: EtiquetaSuperior;
  headline: TituloDePortada;
  subheadline: BajadaDePortada;
  backgroundImage: ImagenDePortada;
  primaryCta: {
    label: BotonPrincipal;
  };
  secondaryCta: {
    label: BotonSecundario;
    targetSectionId: SeccionDeDestino;
  };
  trustBadges: SellosDeConfianza;
}
/**
 * Foto de fondo de la primera pantalla.
 */
export interface ImagenDePortada {
  src: ArchivoDePortada;
  fallback?: ImagenDeRespaldo;
  alt: TextoAlternativo;
  width: AnchoEnPixeles;
  height: AltoEnPixeles;
}
/**
 * Barra entre la portada y la sección de la marca.
 */
export interface FranjaMayorista {
  title: TituloDeLaFranja;
  subtitle: BajadaDeLaFranja;
  buttonText: BotonDeLaFranja;
  enabled?: MostrarLaBarraMayoristaRapida;
}
/**
 * Textos, fotos y pilares de la marca.
 */
export interface NuestraEsencia {
  eyebrow: EtiquetaDeLaSeccion;
  title: TituloDeLaSeccion;
  description: Descripcion1;
  look1: FotoDeLook;
  look2: FotoDeLook;
  pillars: Pilares;
}
/**
 * Retrato vertical de la sección de esencia. Mínimo 800 px de ancho.
 */
export interface FotoDeLook {
  src: ArchivoDeLaFoto;
  fallback?: ImagenDeRespaldo1;
  alt: TextoAlternativo1;
  width: AnchoEnPixeles1;
  height: AltoEnPixeles1;
  badgeCategory?: EtiquetaSobreLaFoto;
  badgeTitle?: TituloSobreLaFoto;
}
/**
 * Los tres pasos para comprar.
 */
export interface ProcesoDeCompra {
  eyebrowBadge: Etiqueta;
  title: Titulo;
  subtitle: Bajada;
  steps: Pasos;
}
/**
 * Textos de las tarjetas de WhatsApp, Instagram, showroom y mapa.
 */
export interface SeccionDeContacto {
  eyebrowBadge: Etiqueta1;
  title: Titulo1;
  subtitle: Bajada1;
  whatsappCard: ActionCard;
  instagramCard: InstagramCard;
  showroomCard: ShowroomCard;
  mapCallout: {
    eyebrow: EtiquetaDelMapa;
    description: TextoDelMapa;
    buttonText: BotonDelMapa;
  };
  showroomTitle?: TituloDelShowroomEnElMapa;
}
export interface ActionCard {
  badge: EtiquetaDeLaTarjeta;
  title: TituloDeLaTarjeta;
  description: TextoDeLaTarjeta;
  buttonText: BotonDeLaTarjeta;
}
export interface InstagramCard {
  title: TituloDeInstagram;
  badge?: EtiquetaDeInstagram;
  description?: TextoDeInstagram;
  buttonText?: BotonDeInstagram;
}
export interface ShowroomCard {
  title: TituloDeLaTarjetaDeShowroom;
  hoursLabel: RotuloDeHorarios;
  badge?: EtiquetaDeShowroom;
  buttonText?: BotonDeComoLlegar;
  mapLabel: DescripcionAccesibleDelMapa;
}
/**
 * Bloque final para comercios y revendedoras.
 */
export interface LlamadoMayorista {
  badge: Etiqueta2;
  title: Titulo2;
  description: Descripcion2;
  buttonText: Boton;
  enabled?: MostrarElLlamadoMayorista;
}
/**
 * Textos del pie. La leyenda de demostración la completa el sitio.
 */
export interface PieDePagina {
  brandDescription: DescripcionDeLaMarca;
  trustBadge: SelloDelPie;
  showroomTitle: TituloDeShowroom;
  channelsTitle: TituloDeCanales;
  legalTitle: TituloLegal;
  legalNotice: AvisoLegal;
  copyrightText: Copyright;
  demonstrationDisclaimer?: LeyendaDeDemostracion;
  variantTag: EtiquetaDeVariante;
  whatsappLabel: TextoDelEnlaceDeWhatsApp;
}
/**
 * Textos que no pertenecen a una sección concreta: etiquetas accesibles y el botón flotante de WhatsApp.
 */
export interface TextosDeInterfazYAccesibilidad {
  menuLabel: EtiquetaAccesibleDelBotonDeMenu;
  logoLabel: EtiquetaAccesibleDelLogo;
  whatsappFloating: BotonFlotanteDeWhatsApp;
}
/**
 * Botón fijo en la esquina inferior derecha.
 */
export interface BotonFlotanteDeWhatsApp {
  enabled?: MostrarElBotonFlotante;
  tooltip: MensajeJuntoAlBoton;
  closeTooltipLabel: EtiquetaAccesibleParaCerrarElMensaje;
  buttonLabel: EtiquetaAccesibleDelBoton;
}
