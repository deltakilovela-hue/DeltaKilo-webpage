import type { Metadata } from "next";
import Link from "next/link";

import { ServicePageTemplate } from "@/components/sections/service-page-template";
import { GestionLlamadasHero } from "@/components/ui/gestion-llamadas-hero";
import { VoiceDemoSection } from "@/components/sections/voice-demo-section";

export const metadata: Metadata = {
  title: "Gestión de Llamadas y Comunicación Centralizada",
  description:
    "Centraliza llamadas, WhatsApp y mensajes en un solo lugar. Cero leads perdidos por falta de respuesta.",
  alternates: { canonical: "/servicios/gestion-llamadas" },
};

const data = {
  eyebrow: "Comunicación centralizada",
  previewImageSrc: "https://assets.cdn.filesafe.space/VDsSxD2SvuHi58jp058d/media/6a07d7790a69f1e7668329f6.png",
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
  return (
    <>
      <GestionLlamadasHero />
      <VoiceDemoSection />
      <div id="servicio">
        <ServicePageTemplate {...data} />
      </div>

      {/* ── Agente de Voz CTA ── */}
      <section className="bg-[#080808] border-t border-white/5 py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full
                           border border-[#0dcfcf]/20 bg-[#0dcfcf]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0dcfcf]">
              Demo en vivo
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Prueba el agente de voz{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #0dcfcf 0%, #7dd3fc 100%)" }}
            >
              ahora mismo
            </span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Escucha cómo suena un asistente de IA atendiendo llamadas, respondiendo preguntas
            y calificando prospectos de forma automática, las 24 horas del día.
          </p>
          <Link
            href="/agente"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-xl
                       bg-[#0dcfcf] text-black hover:bg-[#0bbdbd]
                       transition-all duration-300 shadow-lg hover:shadow-[0_0_32px_rgba(13,207,207,0.35)]
                       hover:scale-105 group"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Probar agente de voz IA
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
