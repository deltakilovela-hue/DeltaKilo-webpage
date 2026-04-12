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
    gradient: "from-[#0a1a3a] via-[#0d2a5a] to-[#0a1a3a]",
    accentColor: "rgba(59,130,246,0.15)",
    imageSrc: "/images/nb2/paginas-web.png",
  },
  {
    icon: Zap,
    title: "Funnels Automáticos",
    description:
      "Flujos de captación que trabajan solos. Leads calificados que llegan al CRM sin intervención manual.",
    href: "/servicios/funnels",
    tag: "Captación",
    gradient: "from-[#2a1500] via-[#3d2200] to-[#2a1500]",
    accentColor: "rgba(251,146,60,0.15)",
    imageSrc: "/images/nb2/funnels.png",
  },
  {
    icon: Bot,
    title: "Asistentes de IA",
    description:
      "Atención 24/7 sin contratar personal. Tu asistente que atiende, califica y escala al humano correcto.",
    href: "/servicios/asistentes-ia",
    tag: "Inteligencia artificial",
    gradient: "from-[#001a1a] via-[#003333] to-[#001a1a]",
    accentColor: "rgba(13,207,207,0.15)",
    imageSrc: "/images/nb2/asistentes-ia.png",
  },
  {
    icon: Users,
    title: "CRM",
    description:
      "Centraliza clientes, seguimientos y oportunidades. Control total de tu pipeline de ventas.",
    href: "/servicios/crm",
    tag: "Gestión comercial",
    gradient: "from-[#1a0a2a] via-[#2a1040] to-[#1a0a2a]",
    accentColor: "rgba(168,85,247,0.15)",
    imageSrc: "/images/nb2/crm.png",
  },
  {
    icon: MapPin,
    title: "Google Maps y Local SEO",
    description:
      "Posiciona tu negocio donde tus clientes te buscan. Más visibilidad local, más llamadas.",
    href: "/servicios/google-maps",
    tag: "Presencia local",
    gradient: "from-[#001a0a] via-[#003318] to-[#001a0a]",
    accentColor: "rgba(34,197,94,0.15)",
    imageSrc: "/images/nb2/google-maps.png",
  },
  {
    icon: Phone,
    title: "Gestión de Llamadas",
    description:
      "Centraliza llamadas, WhatsApp y mensajes. Cero leads perdidos por falta de respuesta.",
    href: "/servicios/gestion-llamadas",
    tag: "Comunicación",
    gradient: "from-[#1a0010] via-[#330020] to-[#1a0010]",
    accentColor: "rgba(236,72,153,0.15)",
    imageSrc: "/images/nb2/gestion-llamadas.png",
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
                  className="group block rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f] card-glow transition-all duration-300 hover:border-[#0dcfcf]/20 overflow-hidden"
                >
                  {/* Image Banner */}
                  <div
                    className={`relative h-40 w-full bg-gradient-to-br ${service.gradient} overflow-hidden`}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    {/* Accent glow */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse 70% 60% at 50% 30%, ${service.accentColor}, transparent 70%)`,
                      }}
                    />
                    {/* NB2 image (shows when generated, hidden if missing) */}
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Large icon watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={56} className="text-white/10 group-hover:text-white/5 transition-colors" />
                    </div>
                    {/* Tag */}
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest text-white/30 font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      {service.tag}
                    </span>
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0dcfcf]/10 flex items-center justify-center group-hover:bg-[#0dcfcf]/15 transition-colors">
                        <Icon size={16} className="text-[#0dcfcf]" />
                      </div>
                      <h2 className="text-base font-semibold text-white group-hover:text-[#0dcfcf] transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#0dcfcf]/50 group-hover:text-[#0dcfcf] transition-colors font-medium">
                      Ver servicio completo
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
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
