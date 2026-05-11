import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/sections/service-page-template";

export const metadata: Metadata = {
  title: "Implementación de CRM",
  description:
    "Centraliza clientes, seguimientos y oportunidades en un solo panel. Nunca más pierdas un prospecto por falta de organización.",
};

const data = {
  eyebrow: "Gestión comercial",
  previewImageSrc: "/images/nb2/crm.png",
  title: "CRM para tu Equipo",
  subtitle: "Nunca más pierdas un prospecto por desorganización.",
  description:
    "Implementamos y configuramos tu CRM para que tengas control total de tu proceso de ventas: quién es cada prospecto, en qué etapa está y qué acción sigue.",
  icon: "Users" as const,
  problem: {
    title: "Sin CRM, tu proceso de ventas depende de la memoria de una persona.",
    description:
      "Los negocios que no usan un CRM pierden prospectos, duplican esfuerzos y no tienen visibilidad real de su pipeline. El caos comercial cuesta dinero.",
    points: [
      "No sabes cuántos prospectos tienes activos en este momento.",
      "El seguimiento depende de que alguien recuerde llamar o escribir.",
      "Cuando un vendedor sale, se lleva toda la información de sus clientes.",
      "No tienes métricas de conversión ni de tiempo promedio de cierre.",
      "Usas Excel, notas o WhatsApp para gestionar tu cartera.",
    ],
  },
  solution: {
    title: "Un CRM configurado para tu negocio, no para el negocio promedio.",
    description:
      "Instalamos, configuramos y personalizamos tu CRM según tu proceso de ventas real. Definimos etapas, automatizaciones, reportes y accesos. Tu equipo lo adopta desde el día uno.",
  },
  features: [
    { title: "Configuración personalizada", description: "Etapas del pipeline, campos y vistas ajustadas a tu proceso de ventas real." },
    { title: "Automatizaciones de seguimiento", description: "Recordatorios, tareas y mensajes automáticos en cada etapa del pipeline." },
    { title: "Integración con WhatsApp", description: "Toda la comunicación con prospectos registrada directamente en el CRM." },
    { title: "Dashboard de ventas", description: "Métricas en tiempo real: pipeline activo, tasa de cierre, tiempo promedio y más." },
    { title: "Gestión de equipo", description: "Asignación de prospectos, seguimiento por vendedor y reportes de productividad." },
    { title: "Historial completo", description: "Cada llamada, mensaje y acción queda registrada en el perfil del cliente." },
    { title: "Alertas inteligentes", description: "Notificaciones cuando un prospecto lleva mucho tiempo sin contacto o acción." },
    { title: "Capacitación incluida", description: "Entrenamos a tu equipo para que adopte el CRM desde el primer día." },
  ],
  howItWorks: [
    { step: "01", title: "Análisis del proceso", description: "Mapeamos tu proceso de ventas actual: etapas, tiempos, equipo y puntos de quiebre." },
    { step: "02", title: "Configuración del CRM", description: "Instalamos y personalizamos la plataforma para que refleje exactamente tu proceso." },
    { step: "03", title: "Migración de datos", description: "Importamos tus contactos y clientes actuales al nuevo sistema sin perder información." },
    { step: "04", title: "Capacitación y activación", description: "Entrenamos al equipo y activamos el sistema con acompañamiento en los primeros días." },
  ],
  benefits: [
    "Visibilidad total de tu pipeline de ventas en tiempo real",
    "Seguimiento sistemático sin depender de la memoria",
    "Equipo de ventas más productivo y coordinado",
    "Métricas para tomar decisiones basadas en datos",
    "Histórico completo de cada cliente y prospecto",
    "Onboarding de nuevos vendedores más rápido",
  ],
  useCases: [
    "Empresa con equipo de ventas que necesita coordinación y seguimiento",
    "Negocio que creció y ya no puede gestionar clientes con Excel",
    "Empresa con ventas recurrentes que necesita gestionar renovaciones",
    "Servicio de alto valor con ciclos de venta largos",
    "Negocio que quiere escalar su equipo comercial con orden",
  ],
  relatedServices: [
    { title: "Funnels Automáticos", href: "/servicios/funnels", description: "Los leads del funnel entran directamente al CRM con su información completa." },
    { title: "Asistentes de IA", href: "/servicios/asistentes-ia", description: "Las conversaciones del asistente se registran automáticamente en el CRM." },
    { title: "Gestión de Llamadas", href: "/servicios/gestion-llamadas", description: "Llamadas y mensajes centralizados y vinculados a los registros del CRM." },
  ],
  faqs: [
    { question: "¿Qué CRM utilizan?", answer: "Trabajamos con las principales plataformas del mercado y elegimos la más adecuada para el tamaño y proceso de tu negocio." },
    { question: "¿Cuánto tiempo toma la implementación?", answer: "Entre 1 y 3 semanas dependiendo del volumen de datos y la complejidad del proceso de ventas." },
    { question: "¿Qué pasa con mis contactos actuales?", answer: "Migramos todos tus contactos y datos existentes al nuevo CRM antes de la activación." },
    { question: "¿El CRM se conecta con WhatsApp?", answer: "Sí. Configuramos la integración para que toda la comunicación de WhatsApp quede registrada en el perfil de cada cliente." },
  ],
};

export default function CRMPage() {
  return <ServicePageTemplate {...data} />;
}
