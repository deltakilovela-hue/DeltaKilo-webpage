import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Zap, Bot, Users, MapPin, Phone, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Explora todos los servicios de Delta Kilo Soluciones: automatización, CRM, funnels, asistentes de IA, páginas web y más.",
};

const services = [
  {
    icon: Globe,
    title: "Páginas Web Profesionales",
    description:
      "Sitios modernos, rápidos y orientados a conversión. Tu primera impresión digital hecha para vender.",
    href: "/servicios/paginas-web",
    tag: "Presencia digital",
  },
  {
    icon: Zap,
    title: "Funnels Automáticos",
    description:
      "Flujos de captación que trabajan solos. Leads calificados que llegan al CRM sin intervención manual.",
    href: "/servicios/funnels",
    tag: "Captación",
  },
  {
    icon: Bot,
    title: "Asistentes de IA",
    description:
      "Atención 24/7 sin contratar personal. Tu asistente que atiende, califica y escala al humano correcto.",
    href: "/servicios/asistentes-ia",
    tag: "Inteligencia artificial",
  },
  {
    icon: Users,
    title: "CRM",
    description:
      "Centraliza clientes, seguimientos y oportunidades. Control total de tu pipeline de ventas.",
    href: "/servicios/crm",
    tag: "Gestión comercial",
  },
  {
    icon: MapPin,
    title: "Google Maps y Local SEO",
    description:
      "Posiciona tu negocio donde tus clientes te buscan. Más visibilidad local, más llamadas.",
    href: "/servicios/google-maps",
    tag: "Presencia local",
  },
  {
    icon: Phone,
    title: "Gestión de Llamadas",
    description:
      "Centraliza llamadas, WhatsApp y mensajes. Cero leads perdidos por falta de respuesta.",
    href: "/servicios/gestion-llamadas",
    tag: "Comunicación",
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-[#080808] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">
            El ecosistema Delta Kilo
          </p>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 leading-tight">
            Todos nuestros servicios,
            <br />
            diseñados para conectarse.
          </h1>
          <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Cada servicio puede funcionar de forma independiente, pero su verdadero poder está cuando trabajan juntos como un sistema.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group block p-6 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] card-glow transition-all duration-300 hover:border-[#0dcfcf]/20"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center group-hover:bg-[#0dcfcf]/15 transition-colors">
                      <Icon size={20} className="text-[#0dcfcf]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/20 font-medium pt-1">
                      {service.tag}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0dcfcf] transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/45 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#0dcfcf]/50 group-hover:text-[#0dcfcf] transition-colors font-medium">
                    Ver servicio completo
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ecosystem note */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">
            La lógica del sistema
          </p>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-6 leading-tight">
            No son 6 servicios.<br />Es un solo sistema con 6 dimensiones.
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-2xl mx-auto">
            La web captura tráfico → el funnel lo convierte → el asistente lo atiende → el CRM lo gestiona → las llamadas lo retienen → Maps trae más. Todo conectado.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
