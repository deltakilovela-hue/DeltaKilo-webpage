import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import { GHLForm } from "@/components/sections/ghl-form";
import { ContactHero } from "@/components/ui/animated-hero-section";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import DataGridHero from "@/components/ui/data-grid-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una llamada gratuita con Delta Kilo Soluciones. En 30 minutos te mostramos qué sistema necesitas y cómo lo implementamos.",
};

const stats = [
  { icon: TrendingUp, value: "+340%", label: "Leads calificados" },
  { icon: Users,      value: "100+",  label: "Negocios implementados" },
  { icon: Zap,        value: "30 min", label: "Sesión gratuita" },
];

const expectItems = [
  "Análisis de tu proceso comercial actual",
  "Identificación de cuellos de botella y oportunidades",
  "Propuesta de sistema personalizado para tu negocio",
  "Sin presiones, sin contratos forzados",
];

export default function ContactoPage() {
  return (
    <>
      {/* ── 1. PONG HERO ─────────────────────────── */}
      <ContactHero />

      {/* ── 2. CONTAINER SCROLL ──────────────────── */}
      <section className="bg-[#080808] overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">
                Sin rodeos
              </p>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight mb-4">
                Todo inicia con una
                <br />
                <span className="gradient-text-cyan text-5xl md:text-7xl font-bold leading-none">
                  llamada de 30 min
                </span>
              </h2>
              <p className="text-white/45 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Sin compromisos. Analizamos tu negocio y te mostramos exactamente qué sistema necesitas.
              </p>
            </div>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80"
            alt="Equipo Delta Kilo — sesión de consultoría"
            height={720}
            width={1400}
            className="mx-auto object-cover h-full w-full object-center rounded-2xl"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* ── 3. STATS BANNER ──────────────────────── */}
      <section className="pb-0 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-3 divide-x divide-white/5
                          border border-white/[0.06] rounded-2xl bg-[#0a0a0a] overflow-hidden">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <div className="w-9 h-9 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#0dcfcf]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CONTACT SECTION ───────────────────── */}
      <section className="section-padding relative bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Info */}
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold">
                Opciones de contacto
              </p>

              <a
                href="https://wa.me/5215663864984?text=Hola,%20quiero%20agendar%20una%20llamada%20gratuita%20💊%20con%20Delta%20Kilo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]
                           hover:border-[#25d366]/25 hover:shadow-[0_0_24px_rgba(37,211,102,0.05)]
                           transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25d366]/10 flex items-center justify-center
                                flex-shrink-0 mt-0.5 group-hover:bg-[#25d366]/15 transition-colors">
                  <MessageCircle size={18} className="text-[#25d366]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#25d366] transition-colors">
                    WhatsApp — Respuesta más rápida
                  </h3>
                  <p className="text-sm text-white/40">
                    Escríbenos directamente. Respondemos en menos de 1 hora en horario laboral.
                  </p>
                </div>
              </a>

              <a
                href="mailto:contacto@deltakilo.com.mx"
                className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]
                           hover:border-[#0dcfcf]/25 hover:shadow-[0_0_24px_rgba(13,207,207,0.05)]
                           transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center
                                flex-shrink-0 mt-0.5 group-hover:bg-[#0dcfcf]/15 transition-colors">
                  <Mail size={18} className="text-[#0dcfcf]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#0dcfcf] transition-colors">
                    Email
                  </h3>
                  <p className="text-sm text-white/40">contacto@deltakilo.com.mx</p>
                </div>
              </a>

              <div className="p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-[#0dcfcf]" />
                  <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold">
                    Qué esperar en la llamada
                  </p>
                </div>
                <div className="space-y-3">
                  {expectItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#0dcfcf]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/50">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: GHL Form */}
            <GHLForm />
          </div>
        </div>
      </section>

      {/* ── 5. DATA GRID ─────────────────────────── */}
      <DataGridHero
        rows={22}
        cols={36}
        spacing={4}
        duration={5}
        color="#0dcfcf"
        animationType="wave"
        pulseEffect={true}
        mouseGlow={true}
        opacityMin={0.04}
        opacityMax={0.35}
        background="#080808"
      >
        <div className="h-48 md:h-64" />
      </DataGridHero>
    </>
  );
}
