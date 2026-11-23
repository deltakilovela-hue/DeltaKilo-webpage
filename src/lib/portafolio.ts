// Video portfolio shown on /portafolio and teased on /ecosistema.
// Files live in public/videos/portafolio/<slug>.mp4 (720p) + <slug>.jpg (poster).
// Prospects are shown by industry and city only — never by brand name.

export type PortafolioVideo = {
  slug: string;
  titulo: string;
  giro: string;
  segundos: number;
  idioma?: string;
};

export type PortafolioCategoria = {
  id: string;
  eyebrow: string;
  titulo: string;
  descripcion: string;
  videos: PortafolioVideo[];
};

export const PORTAFOLIO: PortafolioCategoria[] = [
  {
    id: 'inmobiliario',
    eyebrow: 'Bienes raíces',
    titulo: 'Recorridos y spots para vender desarrollos',
    descripcion:
      'Recorridos por la zona, amenidades y spots cortos para preventa. También en inglés, para compradores extranjeros.',
    videos: [
      { slug: 'inmo-recorrido-mazatlan', titulo: 'Recorrido por la ciudad y el desarrollo', giro: 'Desarrollo inmobiliario · Mazatlán', segundos: 62, idioma: 'Inglés' },
      { slug: 'inmo-amenidades', titulo: 'Tour de amenidades', giro: 'Desarrollo inmobiliario · Mazatlán', segundos: 31, idioma: 'Inglés' },
      { slug: 'inmo-un-dia', titulo: 'Un día viviendo aquí', giro: 'Desarrollo inmobiliario · Mazatlán', segundos: 14 },
    ],
  },
  {
    id: 'autos',
    eyebrow: 'Agencias de autos',
    titulo: 'Contenido que da confianza antes de la visita',
    descripcion:
      'Videos que educan al comprador y posicionan a la agencia como la opción segura para comprar un seminuevo.',
    videos: [
      { slug: 'autos-5-cosas', titulo: '5 cosas antes de comprar un seminuevo', giro: 'Agencia de seminuevos · Tepic', segundos: 47 },
      { slug: 'autos-prueba-manejo', titulo: 'Qué revisar en la prueba de manejo', giro: 'Agencia de seminuevos · Tepic', segundos: 51 },
    ],
  },
  {
    id: 'salud',
    eyebrow: 'Salud y clínicas',
    titulo: 'Promociones y educación para pacientes',
    descripcion:
      'Promos de servicios y videos que resuelven las dudas que el paciente tiene antes de agendar.',
    videos: [
      { slug: 'salud-promo', titulo: 'Promoción de un programa de terapia', giro: 'Clínica de rehabilitación · Tepic', segundos: 27 },
      { slug: 'salud-rehabilitacion', titulo: '¿Qué es la rehabilitación física?', giro: 'Clínica de rehabilitación · Tepic', segundos: 51 },
    ],
  },
  {
    id: 'historias-3d',
    eyebrow: 'Historias 3D',
    titulo: 'Tradiciones mexicanas en animación 3D',
    descripcion:
      'Piezas emotivas de temporada para conectar con tu audiencia: posadas, desfiles, el 12 de diciembre y la Navidad.',
    videos: [
      { slug: '3d-posadas', titulo: 'Todas las posadas', giro: 'Contenido de temporada', segundos: 66 },
      { slug: '3d-desfiles', titulo: 'Todos los desfiles del 20 de noviembre', giro: 'Contenido de temporada', segundos: 80 },
      { slug: '3d-guadalupe', titulo: 'Todos los 12 de diciembre', giro: 'Contenido de temporada', segundos: 89 },
      { slug: '3d-diciembres', titulo: 'Todos los diciembres', giro: 'Contenido de temporada', segundos: 97 },
    ],
  },
  {
    id: 'casos',
    eyebrow: 'Casos de negocio',
    titulo: 'Historias que explican el problema y la solución',
    descripcion:
      'Contamos la historia de un negocio —su problema, lo que cambia con un sistema— para que tu cliente se vea reflejado.',
    videos: [
      { slug: 'caso-agro', titulo: 'Caso real: un laboratorio agrícola sale a darse a conocer', giro: 'Laboratorio agrícola · Culiacán', segundos: 34 },
      { slug: 'caso-pasteleria', titulo: 'Le aplicamos IA a una pastelería', giro: 'Pastelería por encargo', segundos: 62 },
      { slug: 'caso-asesor-inmobiliario', titulo: 'Un día de un gerente de ventas inmobiliario', giro: 'Inmobiliaria', segundos: 36 },
    ],
  },
  {
    id: 'explicativos',
    eyebrow: 'Explicativos y VSL',
    titulo: 'Videos que venden mientras explican',
    descripcion:
      'Guiones de venta en video (VSL) para anuncios y landing pages: muestran el costo de no actuar y cómo se resuelve.',
    videos: [
      { slug: 'vsl-consultorio', titulo: 'Pacientes que se pierden en un consultorio', giro: 'Consultorios médicos', segundos: 62 },
      { slug: 'vsl-seguimiento-lead', titulo: 'Qué pasa cuando un prospecto entra al sistema', giro: 'Automatización comercial', segundos: 54 },
    ],
  },
  {
    id: 'testimonios',
    eyebrow: 'Testimonios',
    titulo: 'Resultados contados por nuestros clientes',
    descripcion: 'Un mes de contenido creado, programado y publicado para una clienta real.',
    videos: [
      { slug: 'testimonio-karina', titulo: 'Testimonio: Nutrición Karina Lara', giro: 'Nutrición · Cliente Delta Kilo', segundos: 69 },
    ],
  },
];

export const PORTAFOLIO_DESTACADOS = ['inmo-recorrido-mazatlan', 'autos-5-cosas', 'salud-promo', '3d-posadas'];

export function videoPorSlug(slug: string) {
  for (const c of PORTAFOLIO) {
    const v = c.videos.find((x) => x.slug === slug);
    if (v) return v;
  }
  return undefined;
}

export const portafolioSrc = (slug: string) => `/videos/portafolio/${slug}.mp4`;
export const portafolioPoster = (slug: string) => `/videos/portafolio/${slug}.jpg`;

export function formatoDuracion(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = String(segundos % 60).padStart(2, '0');
  return `${m}:${s}`;
}
