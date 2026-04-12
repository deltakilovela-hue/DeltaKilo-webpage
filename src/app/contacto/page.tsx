import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, TrendingUp, Users, Zap } from "lucide-react";
import { GHLForm } from "@/components/sections/ghl-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una llamada gratuita con Delta Kilo Soluciones. En 30 minutos te mostramos qué sistema necesitas y cómo lo implementamos.",
};

export default function ContactoPage() {
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
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-4">
            Hablemos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 leading-tight">
            ¿Listo para ordenar tu negocio?
          </h1>
          <p className="text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Agenda una llamada gratuita. En 30 minutos analizamos tu situación y te mostramos qué sistema necesitas y cómo lo implementamos.
          </p>
        </div>
      </section>

      {/* Visual Stats Banner */}
      <section className="pb-0 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative rounded-2xl overflow-hidden border border-[#0dcfcf]/10 bg-[#0a0a0a]">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(13,207,207,0.05), transparent 70%)",
              }}
            />

            {/* NB2 image slot */}
            <img
              src="/images/nb2/contacto-preview.png"
              alt="Delta Kilo — consultoría"
              className="w-full h-auto object-cover relative z-10"
            />

            {/* Stats overlay */}
            <div className="relative z-20 grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
              {[
                { icon: TrendingUp, value: "+340%", label: "Leads calificados" },
                { icon: Users, value: "100+", label: "Negocios implementados" },
                { icon: Zap, value: "30 min", label: "Sesión gratuita" },
              ].map(({ icon: Icon, value, label }) => (
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
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Info */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-6">
                Opciones de contacto
              </p>

              <div className="space-y-5 mb-10">
                <a
                  href="https://wa.me/5215663864984?text=Hola,%20quiero%20agendar%20una%20llamada%20gratuita%20💊%20con%20Delta%20Kilo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25d366]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#25d366]/15 transition-colors">
                    <MessageCircle size={18} className="text-[#25d366]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#25d366] transition-colors">
                      WhatsApp (respuesta más rápida)
                    </h3>
                    <p className="text-sm text-white/40">Escríbenos directamente. Respondemos en menos de 1 hora en horario laboral.</p>
                  </div>
                </a>

                <a
                  href="mailto:contacto@deltakilo.com.mx"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] hover:border-[#0dcfcf]/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0dcfcf]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0dcfcf]/15 transition-colors">
                    <Mail size={18} className="text-[#0dcfcf]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#0dcfcf] transition-colors">
                      Email
                    </h3>
                    <p className="text-sm text-white/40">contacto@deltakilo.com.mx</p>
                  </div>
                </a>
              </div>

              {/* What to expect */}
              <div className="p-5 rounded-xl border border-[#1e1e1e] bg-[#0f0f0f]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-[#0dcfcf]" />
                  <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold">
                    Qué esperar
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Análisis de tu proceso comercial actual",
                    "Identificación de cuellos de botella y oportunidades",
                    "Propuesta de sistema personalizado para tu negocio",
                    "Sin presiones, sin contratos forzados",
                  ].map((item, i) => (
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
    </>
  );
}
