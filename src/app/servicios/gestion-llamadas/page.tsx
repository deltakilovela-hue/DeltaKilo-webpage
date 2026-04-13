import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Gestión de Llamadas y Comunicación Centralizada",
  description:
    "Centraliza llamadas, WhatsApp y mensajes en un solo lugar. Cero leads perdidos por falta de respuesta.",
};

const data = {
  eyebrow: "Comunicación centralizada",
  previewImageSrc: "/images/nb2/gestion-llamadas.png",
  title: "Gestión de Llamadas",
  subtitle: "Cero leads perdidos por falta de respuesta.",
  description:
    "Centralizamos todas tus comunicaciones: llamadas, WhatsApp, mensajes y más en un solo panel. Nunca más pierdas un prospecto porque no contestaron a tiempo.",
  icon: "Phone" as const,
  problem: {
    title: "Tus leads se pierden entre llamadas sin contestar y mensajes olvidados.",
    description:
      "Cuando los prospectos no reciben respuesta rápida, se van. El problema no es falta de interés: es falta de sistema para gestionar la comunicación entrante de forma efectiva.",
    points: [
      "Recibes llamadas en múltiples números y no hay registro de cuáles se contestaron.",
      "Los mensajes de WhatsApp, Instagram y web llegan en plataformas separadas.",
      "No hay historial de conversaciones por cliente en un solo lugar.",
      "El equipo no sabe qué llamadas atender primero ni cuáles son urgentes.",
      "Los leads de pago llaman, nadie contesta y el dinero se desperdicia.",
    ],
  },
  solution: {
    title: "Un panel centralizado donde llegan todas las comunicaciones de tu negocio.",
    description:
      "Integramos todos tus canales de comunicación en un solo lugar: llamadas, WhatsApp, mensajes web. Tu equipo ve todo, responde desde un panel y cada interacción queda registrada.",
  },
  features: [
    { title: "Bandeja unificada", description: "Llamadas, WhatsApp y mensajes de todos los canales en un solo panel de control." },
    { title: "Grabación de llamadas", description: "Registro automático de llamadas para control de calidad y seguimiento." },
    { title: "Distribución inteligente", description: "Asignación de llamadas y mensajes al agente correcto según disponibilidad o especialidad." },
    { title: "Número único de empresa", description: "Un número profesional para toda la comunicación comercial de tu negocio." },
    { title: "Integración con CRM", description: "Cada llamada y mensaje se vincula automáticamente al perfil del cliente en el CRM." },
    { title: "Horarios y respuestas automáticas", description: "Mensajes automáticos fuera de horario para que ningún lead se quede sin respuesta." },
    { title: "Métricas de atención", description: "Tiempo de respuesta, volumen por canal, llamadas perdidas y rendimiento del equipo." },
    { title: "WhatsApp Business API", description: "Integración oficial de WhatsApp para mayor capacidad y funcionalidades profesionales." },
  ],
  howItWorks: [
    { step: "01", title: "Mapeo de canales", description: "Identificamos todos los puntos de contacto actuales de tu negocio y el volumen de cada uno." },
    { step: "02", title: "Configuración de la plataforma", description: "Instalamos y configuramos el sistema de comunicaciones según tu equipo y proceso." },
    { step: "03", title: "Integración de canales", description: "Conectamos WhatsApp, número telefónico, web y otros canales al panel central." },
    { step: "04", title: "Capacitación y activación", description: "Entrenamos al equipo y activamos el sistema con monitoreo en los primeros días." },
  ],
  benefits: [
    "Cero llamadas ni mensajes sin respuesta registrada",
    "Tiempo de respuesta promedio reducido significativamente",
    "Visibilidad total de la comunicación con cada cliente",
    "Equipo más coordinado y eficiente en atención",
    "Historial de conversaciones accesible para todo el equipo",
    "Reportes de calidad de atención al cliente",
  ],
  useCases: [
    "Negocio con alto volumen de llamadas entrantes que se pierden",
    "Empresa con equipo de atención distribuido que necesita coordinación",
    "Servicio que recibe contactos por múltiples canales desconectados",
    "Negocio que invierte en publicidad y necesita captar cada lead que llega",
    "Empresa que quiere medir y mejorar la calidad de atención a clientes",
  ],
  relatedServices: [
    { title: "Asistentes de IA", href: "/servicios/asistentes-ia", description: "Atiende automáticamente los mensajes fuera de horario antes de que lleguen al equipo." },
    { title: "CRM", href: "/servicios/crm", description: "Cada comunicación queda vinculada al perfil del prospecto en el CRM." },
    { title: "Funnels Automáticos", href: "/servicios/funnels", description: "Los leads del funnel se comunican por los mismos canales centralizados." },
  ],
  faqs: [
    { question: "¿Puedo mantener mi número de WhatsApp actual?", answer: "En la mayoría de los casos sí. La integración depende del tipo de cuenta y el proceso se gestiona sin perder el historial." },
    { question: "¿Cuántos usuarios puede tener el panel?", answer: "La plataforma escala según tu equipo, desde 1 hasta cientos de agentes dependiendo del plan." },
    { question: "¿Las llamadas se graban automáticamente?", answer: "Sí. La grabación de llamadas es automática y el acceso se puede configurar por roles dentro del equipo." },
    { question: "¿Se integra con nuestro CRM actual?", answer: "Sí. Integramos con los principales CRM del mercado y con el sistema que hayamos implementado para tu negocio." },
  ],
};

export default function GestionLlamadasPage() {
  return <ServicePageTemplate {...data} />;
}
