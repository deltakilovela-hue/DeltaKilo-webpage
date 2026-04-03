'use client';
import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="p-8 rounded-2xl border border-[#0dcfcf]/20 bg-[#0f0f0f] flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-[#0dcfcf]/10 flex items-center justify-center">
          <Check size={24} className="text-[#0dcfcf]" />
        </div>
        <h3 className="text-xl font-bold text-white">Mensaje recibido</h3>
        <p className="text-white/45 text-sm max-w-xs">
          Te responderemos en menos de 24 horas para coordinar tu llamada de diagnóstico gratuita.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-8 rounded-2xl border border-[#1e1e1e] bg-[#0f0f0f]"
    >
      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          Nombre
        </label>
        <input
          type="text"
          required
          placeholder="Tu nombre completo"
          className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#0dcfcf]/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          Teléfono / WhatsApp
        </label>
        <input
          type="tel"
          required
          placeholder="+52 55 0000 0000"
          className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#0dcfcf]/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="tu@empresa.com"
          className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#0dcfcf]/40 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          ¿Qué necesitas resolver?
        </label>
        <select
          className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm focus:outline-none focus:border-[#0dcfcf]/40 transition-colors appearance-none"
        >
          <option value="" className="text-white/40">Selecciona una opción</option>
          <option>Automatizar mi proceso de ventas</option>
          <option>Implementar un CRM</option>
          <option>Crear o mejorar mi página web</option>
          <option>Asistente de IA para atención al cliente</option>
          <option>Funnels de captación de leads</option>
          <option>Gestión de llamadas y comunicación</option>
          <option>Posicionamiento en Google Maps</option>
          <option>Necesito el sistema completo</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-medium">
          Cuéntanos brevemente (opcional)
        </label>
        <textarea
          rows={3}
          placeholder="¿Cuál es tu principal reto comercial hoy?"
          className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#0dcfcf]/40 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0dcfcf] text-black font-semibold text-sm rounded-xl hover:bg-[#0bbdbd] transition-all hover:shadow-[0_0_24px_rgba(13,207,207,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="loader" style={{ width: 18, height: 18, borderWidth: 2 }} />
        ) : (
          <>
            <Send size={15} />
            Enviar mensaje
          </>
        )}
      </button>

      <p className="text-xs text-white/25 text-center">
        Sin spam. Tu información es confidencial.
      </p>
    </form>
  );
}
