import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Páginas Web Profesionales",
  description:
    "Diseñamos y desarrollamos sitios web modernos, rápidos y orientados a conversión. Tu presencia digital premium.",
};

const data = {
  eyebrow: "Presencia digital",
  title: "Páginas Web Profesionales",
  subtitle: "Tu negocio merece un sitio que venda.",
  description:
    "Diseñamos sitios web modernos, rápidos y enfocados en convertir visitantes en clientes. No solo presencia: una herramienta de ventas activa.",
  icon: "Globe" as const,
  problem: {
    title: "Un sitio web mediocre no atrae, no convence y no convierte.",
    description:
      "La primera impresión digital de tu empresa se juzga en segundos. Si tu sitio se ve lento, genérico o desactualizado, los prospectos se van antes de leer tu propuesta.",
    points: [
      "Tu sitio tarda más de 3 segundos en cargar y los visitantes se van.",
      "El diseño parece de 2015 y no inspira confianza profesional.",
      "No hay llamadas a la acción claras: los visitantes no saben qué hacer.",
      "No está optimizado para móvil y pierdes el 70% del tráfico.",
      "No aparece en Google y nadie lo encuentra de forma orgánica.",
    ],
  },
  solution: {
    title: "Un sitio rápido, moderno y diseñado para que el visitante tome acción.",
    description:
      "Construimos tu sitio con arquitectura moderna, diseño premium y copy orientado a conversión. Cada sección tiene un propósito: captar atención, generar confianza y dirigir al contacto.",
  },
  features: [
    { title: "Diseño personalizado", description: "Sin plantillas genéricas. Cada sitio se diseña desde cero para tu marca y mercado." },
    { title: "Velocidad optimizada", description: "Carga en menos de 2 segundos con Next.js y buenas prácticas de rendimiento." },
    { title: "SEO técnico", description: "Estructura semántica, metadatos y optimización para posicionarte en Google." },
    { title: "100% responsive", description: "Experiencia perfecta en móvil, tablet y escritorio desde el primer día." },
    { title: "CTAs estratégicos", description: "Botones y formularios ubicados para convertir visitantes en prospectos." },
    { title: "Integración con CRM", description: "Conexión directa con tu sistema de gestión de clientes para capturar leads automáticamente." },
    { title: "Analytics integrado", description: "Sabes cuántas visitas tienes, de dónde vienen y qué hacen en tu sitio." },
    { title: "SSL + dominio", description: "Seguridad y dirección web profesional incluidas desde el inicio." },
  ],
  howItWorks: [
    { step: "01", title: "Briefing estratégico", description: "Entendemos tu negocio, tu cliente ideal y el objetivo principal del sitio." },
    { step: "02", title: "Estructura y wireframe", description: "Definimos la arquitectura de páginas y el flujo que llevará al visitante a contactarte." },
    { step: "03", title: "Diseño y desarrollo", description: "Construimos el sitio con las mejores prácticas de UX, UI y rendimiento técnico." },
    { step: "04", title: "Revisión y lanzamiento", description: "Validamos contigo, ajustamos y publicamos. Tu sitio está activo y generando resultados." },
  ],
  benefits: [
    "Primera impresión profesional que genera confianza inmediata",
    "Más tiempo en el sitio, menos rebote",
    "Prospectos que llegan listos para comprar",
    "Posicionamiento en Google desde el día uno",
    "Integrado con el resto de tu sistema Delta Kilo",
    "Actualizaciones y soporte continuo",
  ],
  useCases: [
    "Empresa de servicios que quiere captar leads desde su web",
    "Negocio local que necesita posicionarse en Google",
    "Emprendedor que lanza su primer sitio profesional",
    "Empresa que quiere renovar un sitio desactualizado",
    "Marca que necesita un sitio que refleje su nivel de precio",
  ],
  relatedServices: [
    { title: "Funnels Automáticos", href: "/servicios/funnels", description: "Conecta tu web con un funnel de captación que convierte tráfico en leads calificados." },
    { title: "CRM", href: "/servicios/crm", description: "Los leads de tu web van directo a tu panel de seguimiento." },
    { title: "Google Maps", href: "/servicios/google-maps", description: "Complementa tu presencia web con posicionamiento local." },
  ],
  faqs: [
    { question: "¿Cuánto tiempo tarda la entrega?", answer: "Dependiendo de la complejidad, entre 2 y 6 semanas desde el briefing hasta el lanzamiento." },
    { question: "¿El sitio incluye dominio y hosting?", answer: "Te asesoramos en la elección y configuración. Puedes adquirir el hosting directamente o gestionamos todo por ti." },
    { question: "¿Puedo actualizar el contenido yo mismo?", answer: "Sí. Integramos un panel de administración simple para que puedas actualizar textos e imágenes sin conocimiento técnico." },
    { question: "¿El sitio queda conectado con WhatsApp y CRM?", answer: "Sí. Cada formulario o botón de contacto puede conectarse directamente con WhatsApp, tu CRM o ambos." },
  ],
};

export default function PaginasWebPage() {
  return <ServicePageTemplate {...data} />;
}
