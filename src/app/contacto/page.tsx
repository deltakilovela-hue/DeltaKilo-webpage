import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, TrendingUp, Users, Zap } from "lucide-react";
import { GHLForm } from "@/components/sections/ghl-form";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una llamada gratuita con Delta Kilo Soluciones. En 30 minutos te mostramos qué sistema necesitas y cómo lo implementamos.",
};

const stats = [
  { icon: TrendingUp, value: "+340%", label: "Leads calificados promedio" },
  { icon: Users,      value: "100+",  label: "Negocios implementados" },
  { icon: Zap,        value: "30 min", label: "Diagnóstico gratuito" },
];

const expectItems = [
  "Análisis de tu proceso comercial actual",
  "Identificación de cuellos de botella y oportunidades",
  "Propuesta de sistema personalizado para tu negocio",
  "Sin presiones ni contratos forzados",
];

export default function ContactoPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 bg-[#080808] overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        {/* Top cyan glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,207,207,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#0dcfcf]/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <BlurFade delay={0} inView>
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full
                            bg-[#0dcfcf]/8 border border-[#0dcfcf]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0dcfcf] animate-pulse" />
              <AnimatedShinyText
                shimmerWidth={120}
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0dcfcf]/80"
              >
                Hablemos
              </AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-heading gradient-text mb-5 leading-tight">
              ¿Listo para ordenar tu negocio?
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Agenda una llamada gratuita de 30 minutos. Analizamos tu situación y te
              mostramos exactamente qué sistema necesitas, sin burocracia.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────── */}
      <section className="pb-0 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <BlurFade delay={0.1} inView>
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
          </BlurFade>
        </div>
      </section>

      {/* ─── CONTACT SECTION ──────────────────────────────────── */}
      <section className="section-padding relative bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ── Left: info ── */}
            <div className="space-y-5">
              <BlurFade delay={0} inView>
                <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold">
                  Opciones de contacto
                </p>
              </BlurFade>

              {/* WhatsApp */}
              <BlurFade delay={0.08} inView>
                <a
                  href="https://wa.me/5215663864984?text=Hola,%20quiero%20agendar%20una%20llamada%20gratuita%20💊%20con%20Delta%20Kilo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]
                             hover:border-[#25d366]/25 hover:shadow-[0_0_24px_rgba(37,211,102,0.05)]
                             transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25d366]/10 flex items-center justify-center
                                  flex-shrink-0 mt-0.5 group-hover:bg-[#25d366]/18 transition-colors">
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
              </BlurFade>

              {/* Email */}
              <BlurFade delay={0.14} inView>
                <a
                  href="mailto:contacto@deltakilo.com.mx"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]
                             hover:border-[#0dcfcf]/25 hover:shadow-[0_0_24px_rgba(13,207,207,0.05)]
                             transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center
                                  flex-shrink-0 mt-0.5 group-hover:bg-[#0dcfcf]/18 transition-colors">
                    <Mail size={18} className="text-[#0dcfcf]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#0dcfcf] transition-colors">
                      Email
                    </h3>
                    <p className="text-sm text-white/40">contacto@deltakilo.com.mx</p>
                  </div>
                </a>
              </BlurFade>

              {/* What to expect */}
              <BlurFade delay={0.2} inView>
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
              </BlurFade>
            </div>

            {/* ── Right: GHL form ── */}
            <BlurFade delay={0.12} direction="left" inView>
              <GHLForm />
            </BlurFade>

          </div>
        </div>
      </section>
    </>
  );
}
