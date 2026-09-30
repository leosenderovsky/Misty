/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRAND CONFIGURATION FILE - MISTY (VARIANTE A: EDITORIAL LOOKBOOK)
 * 
 * Este es el ÚNICO archivo necesario para personalizar la landing page
 * para un nuevo cliente o marca. Todos los componentes de la aplicación
 * (Header, Hero, Beneficios, Manifiesto, Proceso, Contacto, Footer) consumen sus
 * textos, colores, imágenes, canales y enlaces directamente desde aquí.
 */

import heroWomanBlazer from './assets/images/hero_woman_blazer_1790508633209.jpg';
import heroWomanKnitwear from './assets/images/hero_woman_knitwear_1790508644652.jpg';
import manifestoShowroom from './assets/images/manifesto_showroom_1790508658455.jpg';
import showroomMapPreview from './assets/images/showroom_map_preview_1790508671635.jpg';

export interface ImageAsset {
  src: string;
  alt: string;
  fallback?: string;
  badgeCategory?: string;
  badgeTitle?: string;
}

export interface BrandConfig {
  identity: {
    name: string;
    legalName: string;
    tagline: string;
    niche: string;
    statusBadgeText: string;
    logoUrl: string;
  };
  typography: {
    headings: string;
    body: string;
  };
  theme: {
    primary: string;              // #2b6473 - Deep oceanic petrol teal
    primaryHover: string;         // #1d4b57
    secondary: string;            // #468a9b
    secondaryDark: string;        // #1d4b57
    secondaryContainer: string;   // #d2ecf4
    secondaryFixed: string;       // #acedff
    surface: string;              // #f4f8fa
    surfaceDim: string;           // #d9e8ed
    surfaceContainerLow: string;  // #eef5f8
    surfaceContainer: string;     // #e8f1f5
    surfaceContainerHigh: string; // #dfecef
    surfaceContainerHighest: string; // #d5e3e8
    surfaceBright: string;        // #ffffff
    onSurface: string;            // #16272e
    onSurfaceVariant: string;     // #3e5258
    outline: string;              // #607a82
    outlineVariant: string;       // #c0cdd2
  };
  contact: {
    whatsapp: {
      number: string;             // Formato internacional sin +, ej: "5491158249102"
      display: string;            // "+54 9 11 5824-9102"
      defaultMessage: string;
      wholesaleMessage: string;
      retailMessage: string;
    };
    instagram: {
      handle: string;             // "@misty.indumentaria"
      url: string;                // "https://instagram.com/misty.indumentaria"
      badge: string;
      description: string;
      buttonText: string;
    };
    email: {
      address: string;
      display: string;
    };
    showroom: {
      title: string;
      badge: string;
      addressDisplay: string;
      hoursWeekdays: string;
      hoursSaturdays: string;
      transitInfo: string;
      googleMapsUrl: string;
      mapImageSrc: string;
      mapImageFallback?: string;
      buttonText: string;
    };
  };
  navigation: {
    links: Array<{
      label: string;
      href: string;
    }>;
    ctaButtonText: string;
    ctaButtonTextMobile: string;
  };
  marquee?: {
    items: string[];
  };
  hero: {
    eyebrowBadge: string;
    headline: string;
    subheadline: string;
    backgroundImage: {
      src: string;
      fallback?: string;
      alt: string;
    };
    primaryCta: {
      label: string;
    };
    secondaryCta: {
      label: string;
      targetSectionId: string;
    };
    trustBadges: Array<{
      id: string;
      iconType: 'support' | 'shipping' | 'check';
      label: string;
    }>;
  };
  quickWholesaleBar: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  essenceSection: {
    eyebrow: string;
    title: string;
    description: string;
    look1: ImageAsset;
    look2: ImageAsset;
    pillars: Array<{
      id: string;
      title: string;
      description: string;
      iconType: 'palette' | 'precision' | 'groups';
    }>;
  };
  processSection: {
    eyebrowBadge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      iconType: 'book' | 'chat' | 'mail';
    }>;
  };
  contactSection: {
    eyebrowBadge: string;
    title: string;
    subtitle: string;
    whatsappCard: {
      badge: string;
      title: string;
      description: string;
      buttonText: string;
    };
    instagramCard: {
      badge: string;
      title: string;
      description: string;
      buttonText: string;
    };
    showroomCard: {
      badge: string;
      title: string;
      addressLine1: string;
      addressLine2: string;
      hoursLabel: string;
      hoursWeekdays: string;
      hoursSaturdays: string;
      buttonText: string;
    };
    mapCallout: {
      eyebrow: string;
      title: string;
      description: string;
      buttonText: string;
      pinLabel: string;
    };
  };
  wholesaleCallout: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
  };
  footer: {
    brandDescription: string;
    trustBadge: string;
    showroomTitle: string;
    showroomAddresses: string[];
    showroomHours: string[];
    channelsTitle: string;
    legalTitle: string;
    legalNotice: string;
    copyrightText: string;
    demonstrationDisclaimer: string;
    variantTag: string;
  };
}

export const brandConfig: BrandConfig = {
  identity: {
    name: "Misty",
    legalName: "Misty Indumentaria",
    tagline: "Moda versátil que acompaña tu ritmo de vida",
    niche: "Venta Mayorista y Minorista",
    statusBadgeText: "Nueva Temporada · Mayorista & Minorista",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN1XO2Jt5YL5BDQ7QGU4aR--atiN2bkUg9rSLoy4FioWfVkfp0u9AB3TepeYuim1QHvf_UUHDEITb3KAq3LgdDDsyLddSmttIihKnwzEDZC08Ab1xS8eAvua3B_oCJk1MJ7TZeSgKnTBN5Xr0wmBgdpDZ9lHmSALTqpyxt3MntRF4uaXY_4WILNzmIk-a_7W1tQiEcNGfXcc-cKO7x1cz2p3KZyzsUBxU3YJbZkoFK3rIRHK85YTu1UmJ8rSg8pnDPMQ",
  },
  typography: {
    headings: "Playfair Display, serif",
    body: "DM Sans, sans-serif",
  },
  theme: {
    primary: "#2b6473",
    primaryHover: "#20515e",
    secondary: "#468a9b",
    secondaryDark: "#144f5c",
    secondaryContainer: "#d2ecf4",
    secondaryFixed: "#acedff",
    surface: "#f4f8fa",
    surfaceDim: "#d9e8ed",
    surfaceContainerLow: "#eef5f8",
    surfaceContainer: "#e8f1f5",
    surfaceContainerHigh: "#dfecef",
    surfaceContainerHighest: "#d5e3e8",
    surfaceBright: "#ffffff",
    onSurface: "#16272e",
    onSurfaceVariant: "#3e5258",
    outline: "#607a82",
    outlineVariant: "#c0cdd2",
  },
  contact: {
    whatsapp: {
      number: "5491140008800",
      display: "+54 9 11 4000-8800",
      defaultMessage: "¡Hola Misty! Quisiera consultar por sus prendas y conocer el catálogo.",
      wholesaleMessage: "¡Hola Misty! Me interesa solicitar la lista de precios mayorista y el catálogo en PDF.",
      retailMessage: "¡Hola Misty! Me gustaría consultar por prendas minoristas y asesoramiento de talles.",
    },
    instagram: {
      handle: "@misty.indumentaria",
      url: "https://instagram.com/misty-indumentaria",
      badge: "Comunidad Activa",
      description: "Mirá las prendas en movimiento, looks cotidianos, reviews de clientas y novedades semanales.",
      buttonText: "Ver comunidad & novedades",
    },
    email: {
      address: "ventas@misty.com.ar",
      display: "ventas@misty.com.ar",
    },
    showroom: {
      title: "Showroom en el corazón textil de Flores",
      badge: "Punto de Venta",
      addressDisplay: "Av. Avellaneda 2840, Local 12",
      hoursWeekdays: "Lun a Vie: 08:00 a 17:00 hs",
      hoursSaturdays: "Sábados: 08:30 a 13:30 hs",
      transitInfo: "Fácil acceso en colectivos y subte Línea A. Estacionamiento comercial disponible en la zona.",
      googleMapsUrl: "https://maps.google.com/?q=Av.+Avellaneda+2840+Flores+Buenos+Aires",
      mapImageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL9v1TMwPlIBqxvJ_eZWA1maXkQDzim2nraOZuhOdSwRdZdy8RACB2iJaqQ9J9-TJ5f1e5NHTBefxVzTlng1kaRbjolZHR5C0Y24p6WdFqJIFLydJWZxwxwrTMHo0MDfYH8K6WRiTrboEerIawawMvf0nIo_II-M3KysA9KTmhB343eRYUTcSPlyXBgikIShhVw3uLM2ae8I0rNVDun0238mZRJnciB-RARsuVHVZZ9eXMhp_Skra_",
      mapImageFallback: showroomMapPreview,
      buttonText: "Cómo llegar",
    },
  },
  navigation: {
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
    ctaButtonText: "Escribinos por WhatsApp",
    ctaButtonTextMobile: "WhatsApp",
  },
  marquee: {
    items: [
      "Envíos a todo el país por expreso y correo",
      "Atención directa persona a persona",
      "Precios competitivos sin intermediarios",
      "Showroom en Av. Avellaneda (Flores)",
    ],
  },
  hero: {
    eyebrowBadge: "Nueva Temporada · Mayorista & Minorista",
    headline: "Moda versátil que acompaña tu ritmo de vida",
    subheadline: "Prendas contemporáneas con excelente relación precio–calidad. Diseñadas para renovar tu guardarropa y potenciar tu negocio o estilo diario.",
    backgroundImage: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm76E96_6zmoqIPwFNLHVroBvtU2VgRgq9nsSD0akgHWx22oZtc_NJGkBL-MQTvCmU8RQxeRIgz3RP3q0FrvD9RMUAwdMLMWDkpYGZu4aFVDuc60jyLzGdh6IZ8aF97_6-r2QaqKAZW9m5c7HKuP_OVN2GHYBwMn-wsjSbty1yyfB-fS4JFcLGuouzeP2AptvPxHPmue72EuVfVNFuyaSxm3CVEUAnghJ4WvA3Fx57IXTOkWn4MLVA",
      fallback: manifestoShowroom,
      alt: "Editorial lookbook de campaña Misty con modelos en showroom contemporáneo",
    },
    primaryCta: {
      label: "Escribinos por WhatsApp",
    },
    secondaryCta: {
      label: "Conocé la marca",
      targetSectionId: "nosotros",
    },
    trustBadges: [
      {
        id: "badge-support",
        iconType: "support",
        label: "Atención personalizada",
      },
      {
        id: "badge-shipping",
        iconType: "shipping",
        label: "Envíos a todo el país",
      },
      {
        id: "badge-check",
        iconType: "check",
        label: "Mínimos accesibles",
      },
    ],
  },
  quickWholesaleBar: {
    title: "Venta por mayor y por menor sin intermediarios",
    subtitle: "Llevá curvas completas para tu comercio o tus prendas favoritas por unidad.",
    buttonText: "Pedir Lista Mayorista (PDF)",
  },
  essenceSection: {
    eyebrow: "Nuestra Esencia",
    title: "Diseño actual para todos los días",
    description: "En Misty creemos en una moda simple, auténtica y pensada para acompañar tu día a día. Creamos prendas actuales, cómodas y bien confeccionadas, con una buena relación entre calidad y precio, para que renovar tu guardarropa sea fácil y accesible.",
    look1: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcg6bgTSwmwbhp0fTfQBKTsQuaeNnpIKicIBZocS1Z-EESa7JAVFlyB1iVUqKS1ZN6YxnOs7_ou73R61Inl4DatCIt_QjzmrOJNFYOMF1XAfyQHJdZs7sigwIRFjyMvDaXrQVt0lVb40v-cEHtCKj_laYCQvRTaEG7flYi1IEE097aBSSwJvmZE3wYop-4bnCrmjIvcvpFHzEXe6Cg79w7dOvKTzcOUmMVj8YMSnYyzdzZTYETFX7y",
      fallback: heroWomanBlazer,
      alt: "Modelo Misty luciendo blazer terracota elegante y top neutro",
      badgeCategory: "Look 01 · Sastrería Relajada",
      badgeTitle: "Lino & Gabardina Premium",
    },
    look2: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj1s7nvBZ761kLAOJK1AHRRrjrcLpoj2fu8DjpZv1pVvbfyVpIaJYox57H9QHvKwTxrPlcD-lRqZa17WyA9FecD7mbISAlvtCGQ8EKNH5Fso_69Qi-tBSM3VZZX3Ci9r_gVLKtB3WJlMyJ5KHKO-JlGwV_IMF65gGxsc3mBX0JPcV7akCU4i3K6tv1Jfg3eYHE0jBjrulTKfn05zay41VuvPAA5cXc2Pd-DCer_umlB2j3s3kKEsfp",
      fallback: heroWomanKnitwear,
      alt: "Detalle de tejido artesanal suave y pantalones contemporáneos",
      badgeCategory: "Detalles Nobles",
      badgeTitle: "Tejidos & Texturas",
    },
    pillars: [
      {
        id: "pillar-trends",
        title: "Tendencias reales",
        description: "Siluetas modernas concebidas para la mujer real. Una fusión equilibrada entre elegancia casual, versatilidad diurna y comodidad total.",
        iconType: "palette",
      },
      {
        id: "pillar-quality",
        title: "Precio & Calidad",
        description: "Confección nacional y cuidada selección de hilados, linos y morleys resistentes al uso frecuente sin elevar costos innecesarios.",
        iconType: "precision",
      },
      {
        id: "pillar-channels",
        title: "Canal Mayorista & Minorista",
        description: "Asesoramiento directo y dedicado para locales, revendedoras y showrooms de todo el país, con facilidades de reposición continua.",
        iconType: "groups",
      },
    ],
  },
  processSection: {
    eyebrowBadge: "Experiencia Ágil",
    title: "Comprar en Misty es simple y directo",
    subtitle: "Sin registros eternos ni procesos engorrosos. Coordinamos todo persona a persona.",
    steps: [
      {
        number: "01",
        title: "Elegí tus prendas",
        description: "Mirá nuestro lookbook y solicitá el catálogo digital con stock actualizado al instante en WhatsApp.",
        iconType: "book",
      },
      {
        number: "02",
        title: "Asesoramiento & Curva",
        description: "Nuestras asesoras te ayudan a armar tu pedido (unidades o paquetes por talle y color) según tu conveniencia.",
        iconType: "chat",
      },
      {
        number: "03",
        title: "Despacho Inmediato",
        description: "Empaquetamos con extremo cuidado y despachamos por expreso, encomienda o retiro directo en showroom.",
        iconType: "mail",
      },
    ],
  },
  contactSection: {
    eyebrowBadge: "Canales de Atención",
    title: "Estamos cerca tuyo",
    subtitle: "Contactanos a través del medio que más cómodo te resulte. Estamos a un mensaje de distancia para resolver dudas, pasar presupuestos y tomar pedidos.",
    whatsappCard: {
      badge: "Canal Principal",
      title: "WhatsApp Directo",
      description: "Atención inmediata para listas de precios, consultas mayoristas y pedidos minoristas.",
      buttonText: "Chatear con asesoras",
    },
    instagramCard: {
      badge: "Comunidad Activa",
      title: "Instagram Oficial",
      description: "Mirá las prendas en movimiento, looks cotidianos, reviews de clientas y novedades semanales.",
      buttonText: "Ver comunidad & novedades",
    },
    showroomCard: {
      badge: "Punto de Venta",
      title: "Showroom Comercial",
      addressLine1: "Av. Avellaneda 2840, Local 12",
      addressLine2: "Flores, CABA (Centro Mayorista).",
      hoursLabel: "Horarios de Atención:",
      hoursWeekdays: "Lun a Vie: 08:00 a 17:00 hs",
      hoursSaturdays: "Sábados: 08:30 a 13:30 hs",
      buttonText: "Cómo llegar",
    },
    mapCallout: {
      eyebrow: "Ubicación Estratégica",
      title: "Showroom en el corazón textil de Flores",
      description: "Fácil acceso en colectivos y subte Línea A. Estacionamiento comercial disponible en la zona.",
      buttonText: "Abrir en Google Maps",
      pinLabel: "Av. Avellaneda 2840, Local 12",
    },
  },
  wholesaleCallout: {
    badge: "Canal Exclusivo para Emprendedoras",
    title: "¿Tenés local o vendés online?",
    description: "Consultá hoy mismo por WhatsApp para recibir la lista de precios mayorista actualizada, condiciones de compra mínima por bulto y el catálogo en PDF para empezar a vender de inmediato.",
    buttonText: "Solicitar Catálogo Mayorista",
  },
  footer: {
    brandDescription: "Indumentaria femenina con identidad contemporánea, disponible para pedidos por menor y curvas mayoristas.",
    trustBadge: "Canal Mayorista & Minorista",
    showroomTitle: "Atención & Showroom",
    showroomAddresses: [
      "Av. Avellaneda y Nazca (Flores) / Showroom Palermo Soho, CABA",
    ],
    showroomHours: [
      "Lunes a Viernes: 8:00 a 17:00 hs",
      "Sábados: 9:00 a 14:00 hs",
    ],
    channelsTitle: "Contacto Directo",
    legalTitle: "Información Legal",
    legalNotice: "Este sitio web corresponde a una demostración institucional con fines conceptuales y de portfolio. Toda marca y productos referenciados forman parte de un prototipo de diseño.",
    copyrightText: "© 2026 Misty Indumentaria. Todos los derechos reservados.",
    demonstrationDisclaimer: "Marca y contenido de ejemplo — prototipo de demostración de sender.ia",
    variantTag: "Variante A · Editorial Lookbook · Diseño y Desarrollo de Arquitectura Web Frontend",
  },
};

/**
 * Función auxiliar para generar el enlace dinámico a WhatsApp
 * a partir de la configuración centralizada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = brandConfig.contact.whatsapp.number.replace(/\D/g, "");
  const message = customMessage ?? brandConfig.contact.whatsapp.defaultMessage;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
