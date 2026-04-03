import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Funnels Automáticos de Venta",
  description:
    "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
};

const data = {
  eyebrow: "Captación automatizada",
  title: "Funnels Automáticos",
  subtitle: "Leads calificados sin esfuerzo manual.",
  description:
    "Diseñamos y activamos flujos de captación que atraen prospectos, los califican y los preparan para comprar. Tu equipo de ventas solo recibe leads listos.",
  icon: "Zap" as const,
  problem: {
    title: "Invertir en publicidad sin un funnel es tirar dinero.",
    description:
      "Sin un sistema de captación estructurado, el tráfico llega, mira y se va. Los anuncios no sirven si no hay una ruta clara que convierta al visitante en prospecto.",
    points: [
      "Gastas en Google Ads o Meta sin saber cuántos leads obtienes.",
      "Los prospectos llegan pero no hay seguimiento automático.",
      "Tu formulario de contacto no califica: cualquiera puede escribirte.",
      "No tienes métricas de conversión por etapa del embudo.",
      "El equipo de ventas pierde tiempo con prospectos que no van a comprar.",
    ],
  },
  solution: {
    title: "Un funnel que atrae, califica y entrega prospectos listos para cerrar.",
    description:
      "Construimos el flujo completo: landing page, formulario de captación, secuencia de seguimiento automático y entrega al CRM. Todo configurado para maximizar la conversión en cada etapa.",
  },
  features: [
    { title: "Landing pages de conversión", description: "Páginas de aterrizaje diseñadas para captar, no para informar." },
    { title: "Formularios inteligentes", description: "Preguntas de calificación que filtran prospectos desde el primer contacto." },
    { title: "Seguimiento automático", description: "Emails y mensajes de WhatsApp que se envían solos al captar un lead." },
    { title: "Integración con CRM", description: "Cada lead entra directamente al pipeline de ventas con sus datos completos." },
    { title: "A/B testing", description: "Probamos versiones del funnel para optimizar la tasa de conversión continuamente." },
    { title: "Métricas en tiempo real", description: "Dashboard de conversión por etapa, fuente de tráfico y costo por lead." },
    { title: "Funnels por segmento", description: "Flujos distintos para diferentes tipos de cliente o servicio." },
    { title: "Conexión con anuncios", description: "Compatible con campañas de Google Ads, Meta Ads y tráfico orgánico." },
  ],
  howItWorks: [
    { step: "01", title: "Definimos el objetivo", description: "Qué tipo de lead necesitas, cuál es tu oferta y qué fuente de tráfico utilizaremos." },
    { step: "02", title: "Diseñamos el flujo", description: "Mapeamos cada etapa: anuncio → landing → formulario → seguimiento → CRM." },
    { step: "03", title: "Construimos y conectamos", description: "Creamos las páginas, configuramos las automatizaciones y conectamos con tus herramientas." },
    { step: "04", title: "Activamos y optimizamos", description: "Lanzamos el funnel, medimos resultados y mejoramos continuamente." },
  ],
  benefits: [
    "Leads calificados sin intervención manual",
    "Seguimiento inmediato en los primeros minutos",
    "Reducción del costo por adquisición",
    "Tu equipo de ventas habla solo con prospectos calientes",
    "Métricas claras de retorno de inversión",
    "Escalable: más tráfico, más leads automáticos",
  ],
  useCases: [
    "Empresa que invierte en publicidad digital y quiere mejorar la conversión",
    "Negocio de servicios que quiere automatizar su captación",
    "Emprendedor que lanza un nuevo producto o servicio",
    "Empresa con equipo de ventas que quiere leads más calificados",
    "Negocio con múltiples servicios que necesita funnels segmentados",
  ],
  relatedServices: [
    { title: "Páginas Web", href: "/servicios/paginas-web", description: "La base donde aterrizan tus prospectos antes del funnel." },
    { title: "Asistentes de IA", href: "/servicios/asistentes-ia", description: "Califica y atiende leads automáticamente después de la captación." },
    { title: "CRM", href: "/servicios/crm", description: "Recibe los leads del funnel directamente en tu pipeline de ventas." },
  ],
  faqs: [
    { question: "¿Necesito tener publicidad activa para que funcione?", answer: "No necesariamente. Los funnels también funcionan con tráfico orgánico, SEO y referencias. Pero sí se potencian con tráfico pago." },
    { question: "¿Cuánto tiempo tarda en implementarse?", answer: "Un funnel estándar se puede activar en 1 a 2 semanas dependiendo de la complejidad." },
    { question: "¿Qué plataformas utilizan?", answer: "Usamos las herramientas más adecuadas para tu negocio: desde soluciones simples hasta plataformas avanzadas de automatización." },
    { question: "¿Los funnels incluyen emails automáticos?", answer: "Sí. Diseñamos la secuencia de seguimiento por email y/o WhatsApp que se activa automáticamente al captar cada lead." },
  ],
};

export default function FunnelsPage() {
  return <ServicePageTemplate {...data} />;
}
