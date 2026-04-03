import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Optimización en Google Maps y Local SEO",
  description:
    "Posiciona tu negocio en Google Maps donde tus clientes te buscan. Más visibilidad local, más llamadas, más clientes.",
};

const data = {
  eyebrow: "Presencia local",
  title: "Google Maps y Local SEO",
  subtitle: "Que te encuentren cuando más importa.",
  description:
    "Optimizamos tu perfil de Google Business y tu posicionamiento local para que aparezcas en los primeros resultados cuando alguien busca lo que ofreces en tu zona.",
  icon: "MapPin" as const,
  problem: {
    title: "Si no apareces en Google Maps, no existes para quien está cerca.",
    description:
      "El 46% de las búsquedas en Google tienen intención local. Si tu perfil está incompleto, desactualizado o mal optimizado, estás perdiendo clientes a clientes de la competencia que sí aparecen.",
    points: [
      "Tu negocio no aparece en el top 3 de Google Maps de tu zona.",
      "Tu perfil de Google Business tiene información incompleta o incorrecta.",
      "Tienes pocas reseñas o no tienes una estrategia para conseguirlas.",
      "Tus competidores aparecen antes que tú en búsquedas locales.",
      "No sabes cuántas personas ven tu perfil ni de dónde vienen.",
    ],
  },
  solution: {
    title: "Optimización completa de tu perfil de Google Business y estrategia de posicionamiento local.",
    description:
      "Completamos, optimizamos y gestionamos tu perfil de Google Maps con las palabras clave correctas, imágenes profesionales, estrategia de reseñas y monitoreo continuo.",
  },
  features: [
    { title: "Optimización del perfil", description: "Información completa, categorías correctas, descripción optimizada con palabras clave." },
    { title: "Estrategia de reseñas", description: "Sistema para conseguir reseñas positivas de clientes actuales de forma sistemática." },
    { title: "Fotos y contenido", description: "Imágenes de calidad y publicaciones regulares para mantener el perfil activo." },
    { title: "Citaciones locales", description: "Registro consistente de tu negocio en directorios locales que refuerzan tu posición." },
    { title: "Gestión de reseñas negativas", description: "Protocolo de respuesta profesional para proteger tu reputación online." },
    { title: "Keywords locales", description: "Optimización con las palabras clave que usan tus clientes para encontrarte." },
    { title: "Reportes de visibilidad", description: "Métricas mensuales: vistas, clics, llamadas y solicitudes de ruta desde tu perfil." },
    { title: "Monitoreo competitivo", description: "Seguimiento de tu posición vs. competidores en tu zona geográfica." },
  ],
  howItWorks: [
    { step: "01", title: "Auditoría inicial", description: "Evaluamos tu perfil actual, tu posición en Maps y la situación de tus competidores." },
    { step: "02", title: "Optimización del perfil", description: "Completamos y optimizamos cada sección del perfil con información y keywords estratégicas." },
    { step: "03", title: "Estrategia de contenido y reseñas", description: "Activamos el sistema de reseñas y planificamos publicaciones regulares en el perfil." },
    { step: "04", title: "Monitoreo y mejora continua", description: "Revisamos métricas mensualmente y ajustamos la estrategia para mantener y mejorar posiciones." },
  ],
  benefits: [
    "Aparece en el top 3 de Maps para búsquedas de tu zona",
    "Más llamadas directas desde Google",
    "Mayor confianza con reseñas positivas y activas",
    "Visibilidad en el momento exacto de intención de compra",
    "Sin costo por clic como en publicidad pagada",
    "Resultados sostenibles a largo plazo",
  ],
  useCases: [
    "Negocio local que quiere más clientes de su zona",
    "Empresa con múltiples sucursales que necesita visibilidad en cada ubicación",
    "Negocio nuevo que quiere establecer presencia local desde el inicio",
    "Empresa con reseñas negativas que necesita gestión de reputación",
    "Servicio que opera en zonas específicas y necesita posicionamiento geográfico",
  ],
  relatedServices: [
    { title: "Páginas Web", href: "/servicios/paginas-web", description: "Tu sitio web potencia el SEO local y complementa tu presencia en Maps." },
    { title: "Gestión de Llamadas", href: "/servicios/gestion-llamadas", description: "Las llamadas que vienen de Maps se gestionan y registran de forma centralizada." },
    { title: "Asistentes de IA", href: "/servicios/asistentes-ia", description: "Atiende automáticamente a los prospectos que te contactan desde Maps." },
  ],
  faqs: [
    { question: "¿Cuánto tiempo tarda en ver resultados?", answer: "Los primeros cambios se notan en 30 días. El posicionamiento significativo se alcanza entre 2 y 4 meses con trabajo consistente." },
    { question: "¿Necesito tener un local físico?", answer: "No necesariamente. Hay configuraciones de Google Business para negocios que prestan servicios a domicilio o en zonas específicas." },
    { question: "¿Qué pasa con las reseñas negativas que ya tengo?", answer: "Desarrollamos un protocolo de respuesta profesional y activamos una estrategia para generar nuevas reseñas positivas que compensen." },
    { question: "¿Incluye gestión mensual o es un servicio de una sola vez?", answer: "Ofrecemos ambas modalidades. La optimización inicial es un proyecto, pero el posicionamiento se mantiene con gestión continua." },
  ],
};

export default function GoogleMapsPage() {
  return <ServicePageTemplate {...data} />;
}
