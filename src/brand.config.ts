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
    tagline: string;
    niche: string;
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
    };
    instagram: {
      handle: string;             // "@misty.indumentaria"
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
      title: string;
    };
    showroomCard: {
      title: string;
      hoursLabel: string;
    };
    mapCallout: {
      eyebrow: string;
      description: string;
      buttonText: string;
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
    tagline: "Moda versátil que acompaña tu ritmo de vida",
    niche: "Venta Mayorista y Minorista",
    logoUrl: "/assets/logo/logo.png",
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
    },
    instagram: {
      handle: "@misty.indumentaria",
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
      mapImageSrc: "/assets/misc/showroom-map.png",
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
    ],
  },
  hero: {
    eyebrowBadge: "Nueva Temporada · Mayorista & Minorista",
    headline: "Moda versátil que acompaña tu ritmo de vida",
    subheadline: "Prendas contemporáneas con excelente relación precio–calidad. Diseñadas para renovar tu guardarropa y potenciar tu negocio o estilo diario.",
    backgroundImage: {
      src: "/assets/hero/hero-1.jpg",
      fallback: "/assets/misc/sobre-marca-1.jpg",
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
      src: "/assets/misc/sobre-marca-1.jpg",
      fallback: "/assets/hero/hero-1.jpg",
      alt: "Modelo Misty luciendo blazer terracota elegante y top neutro",
      badgeCategory: "Look 01 · Sastrería Relajada",
      badgeTitle: "Lino & Gabardina Premium",
    },
    look2: {
      src: "/assets/misc/sobre-marca-2.jpg",
      fallback: "/assets/misc/sobre-marca-1.jpg",
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
      title: "Instagram Oficial",
    },
    showroomCard: {
      title: "Showroom Comercial",
      hoursLabel: "Horarios de Atención:",
    },
    mapCallout: {
      eyebrow: "Ubicación Estratégica",
      description: "Fácil acceso en colectivos y subte Línea A. Estacionamiento comercial disponible en la zona.",
      buttonText: "Abrir en Google Maps",
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
    channelsTitle: "Contacto Directo",
    legalTitle: "Información Legal",
    legalNotice: "Este sitio web corresponde a una demostración institucional con fines conceptuales y de portfolio. Toda marca y productos referenciados forman parte de un prototipo de diseño.",
    copyrightText: "© 2026 Misty Indumentaria. Todos los derechos reservados.",
    demonstrationDisclaimer: "Marca y contenido de ejemplo — prototipo de demostración de sender.ia",
    variantTag: "Variante A · Editorial Lookbook · Diseño y Desarrollo de Arquitectura Web Frontend",
  },
};

export function getInstagramUrl(): string {
  return `https://instagram.com/${brandConfig.contact.instagram.handle.replace(/^@/, "")}`;
}

export function getShowroomAddressText(): string {
  return brandConfig.contact.showroom.addressDisplay;
}

export function getShowroomMapsUrl(): string {
  const address = `${getShowroomAddressText()}, Flores, Buenos Aires`;
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function getShowroomHoursText(): string[] {
  const { hoursWeekdays, hoursSaturdays } = brandConfig.contact.showroom;
  return [hoursWeekdays, hoursSaturdays];
}

/**
 * Función auxiliar para generar el enlace dinámico a WhatsApp
 * a partir de la configuración centralizada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = brandConfig.contact.whatsapp.number.replace(/\D/g, "");
  const message = customMessage ?? brandConfig.contact.whatsapp.defaultMessage;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
