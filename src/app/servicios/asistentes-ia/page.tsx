import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Asistentes de IA para Negocios",
  description:
    "Atención 24/7 sin contratar personal. Asistentes de inteligencia artificial que venden, califican y responden por ti.",
};

const data = {
  eyebrow: "Inteligencia artificial",
  previewImageSrc: "/images/nb2/asistentes-ia.png",
  title: "Asistentes de IA",
  subtitle: "Tu equipo de ventas que nunca duerme.",
  description:
    "Implementamos asistentes de inteligencia artificial que atienden, califican y cierran conversaciones de venta de forma automática, los 365 días del año.",
  icon: "Bot" as const,
  problem: {
    title: "Pierdes clientes mientras duermes, comes o estás en reunión.",
    description:
      "El 80% de los prospectos que no reciben respuesta en los primeros 5 minutos se van con la competencia. No puedes estar disponible siempre. Pero tu asistente sí.",
    points: [
      "Clientes escriben a las 11 de la noche y nadie responde hasta el día siguiente.",
      "Tu equipo pasa horas respondiendo las mismas preguntas repetitivas.",
      "Los leads fríos se olvidan porque no hay seguimiento automático.",
      "No tienes capacidad de atender múltiples conversaciones simultáneas.",
      "La calidad de la respuesta depende del humor o disponibilidad del vendedor.",
    ],
  },
  solution: {
    title: "Un asistente de IA que conoce tu negocio, atiende sin descanso y califica cada prospecto.",
    description:
      "Entrenamos un asistente personalizado con la información de tu empresa, tus servicios y tu proceso de ventas. Atiende, responde, califica y pasa al humano cuando es el momento correcto.",
  },
  features: [
    { title: "Entrenado con tu información", description: "El asistente conoce tus servicios, precios, procesos y respuestas frecuentes." },
    { title: "Disponible 24/7/365", description: "Responde de inmediato a cualquier hora, sin importar el volumen de mensajes." },
    { title: "Calificación automática", description: "Identifica prospectos calificados y los separa de curiosos o spam." },
    { title: "Integración con WhatsApp", description: "Opera directamente en el canal donde están tus clientes." },
    { title: "Escalada inteligente", description: "Detecta cuándo transferir la conversación a un humano sin perder el contexto." },
    { title: "Conexión con CRM", description: "Registra automáticamente cada conversación y prospecto en tu sistema." },
    { title: "Múltiples canales", description: "Web, WhatsApp, Instagram y más. Un asistente para todos tus puntos de contacto." },
    { title: "Análisis de conversaciones", description: "Métricas de volumen, temas frecuentes y tasa de calificación." },
  ],
  howItWorks: [
    { step: "01", title: "Mapeo del negocio", description: "Documentamos tus servicios, preguntas frecuentes, precios y flujo de ventas." },
    { step: "02", title: "Entrenamiento", description: "Configuramos y entrenamos el asistente con toda tu información de negocio." },
    { step: "03", title: "Integración", description: "Conectamos el asistente con tus canales: WhatsApp, web, CRM." },
    { step: "04", title: "Activación y mejora", description: "Lanzamos, monitoreamos conversaciones y mejoramos la calidad de respuestas." },
  ],
  benefits: [
    "Atención inmediata en los primeros segundos de contacto",
    "Hasta 10x más conversaciones atendidas sin aumentar personal",
    "Calidad de atención consistente en todo momento",
    "Reducción del tiempo que tu equipo dedica a preguntas básicas",
    "Seguimiento automático de prospectos sin esfuerzo",
    "Datos y métricas de cada interacción",
  ],
  useCases: [
    "Negocio que recibe muchas consultas repetitivas por WhatsApp",
    "Empresa con equipo de ventas desbordado de mensajes",
    "Servicio que opera en horarios donde no hay personal disponible",
    "Negocio que quiere calificar prospectos antes de hablar con ellos",
    "Empresa con múltiples servicios que necesita enrutar consultas correctamente",
  ],
  relatedServices: [
    { title: "Gestión de Llamadas", href: "/servicios/gestion-llamadas", description: "Complementa el asistente de IA con gestión centralizada de llamadas y mensajes." },
    { title: "CRM", href: "/servicios/crm", description: "Cada conversación del asistente se registra automáticamente en tu CRM." },
    { title: "Funnels Automáticos", href: "/servicios/funnels", description: "Los leads del asistente ingresan al funnel de seguimiento de forma automática." },
  ],
  faqs: [
    { question: "¿El asistente puede reemplazar completamente a mi equipo de ventas?", answer: "Es complementario, no reemplaza. Hace el trabajo repetitivo y de primera respuesta para que tu equipo humano se enfoque en cerrar." },
    { question: "¿Cuánto tiempo tarda en estar listo?", answer: "Aproximadamente 2 semanas desde el mapeo hasta la activación en producción." },
    { question: "¿El asistente puede hacer cotizaciones?", answer: "Sí. Si tienes precios definidos y estructurados, el asistente puede generar y enviar cotizaciones automáticamente." },
    { question: "¿Qué pasa si el cliente hace una pregunta que el asistente no sabe?", answer: "El asistente detecta cuando no tiene respuesta y escala la conversación a un humano con todo el contexto de la charla." },
  ],
};

export default function AsistentesIAPage() {
  return <ServicePageTemplate {...data} />;
}
