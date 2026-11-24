'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

// Real lead form: posts to /api/lead, which forwards to the GHL inbound
// webhook. The workflow answers by WhatsApp (text + voice note) in seconds.

const ACCENTS = {
  gold: {
    focus: 'border-[#D4AF37]/50 bg-[#D4AF37]/[0.04]',
    badge: 'bg-[#D4AF37]/10 border-[#D4AF37]/35',
    icon: 'text-[#D4AF37]',
    link: 'text-[#D4AF37]/60 hover:text-[#D4AF37]',
    button: 'bg-[#D4AF37] text-[#0e0e0e] hover:bg-[#E5C158] active:bg-[#C49A2E] hover:shadow-[#D4AF37]/25',
  },
  teal: {
    focus: 'border-[#0dcfcf]/50 bg-[#0dcfcf]/[0.04]',
    badge: 'bg-[#0dcfcf]/10 border-[#0dcfcf]/35',
    icon: 'text-[#0dcfcf]',
    link: 'text-[#0dcfcf]/60 hover:text-[#0dcfcf]',
    button: 'bg-[#0dcfcf] text-[#041414] hover:bg-[#3ee0e0] active:bg-[#0bb3b3] hover:shadow-[#0dcfcf]/25',
  },
} as const;

type Props = {
  source: string;
  accent?: keyof typeof ACCENTS;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  successTitle?: string;
  successText?: string;
  footnote?: string;
};

export function LeadDemoForm({
  source,
  accent = 'gold',
  submitLabel = 'Enviar mensaje',
  messageLabel = '¿Qué necesitas?',
  messagePlaceholder = 'Cuéntanos sobre tu negocio…',
  successTitle = '¡Mensaje recibido!',
  successText = 'Te contactaremos en menos de 24 horas.',
  footnote = 'Notificación inmediata · Sin spam · Respuesta en <24h',
}: Props) {
  const a = ACCENTS[accent];
  const emptyFields = { name: '', email: '', phone: '', message: '' };
  const [fields, setFields] = useState(emptyFields);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const phoneDigits = fields.phone.replace(/\D/g, '');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim());

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = 'Tu nombre es requerido';
    if (!emailOk) e.email = 'Ingresa un correo válido';
    if (phoneDigits.length < 10) e.phone = 'Ingresa tu WhatsApp a 10 dígitos';
    if (fields.message.trim().length < 10) e.message = 'Cuéntanos más (mínimo 10 caracteres)';
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSendError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, website: honeypot, source, page: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
    } catch {
      setStatus('idle');
      setSendError('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.');
    }
  };

  const reset = () => { setStatus('idle'); setFields(emptyFields); setSendError(''); };

  const set = (key: keyof typeof emptyFields, value: string) => {
    setFields((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }));
  };

  const fieldClass = (key: string) =>
    `relative rounded-xl border transition-all duration-200 overflow-hidden ${
      errors[key] ? 'border-red-500/50 bg-red-500/[0.04]'
      : focused === key ? a.focus
      : 'border-white/10 bg-white/[0.03]'
    }`;

  const inputClass = 'w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/25 outline-none pr-10';
  const labelClass = 'text-xs font-medium text-white/40 uppercase tracking-wider pl-1';
  const ok = <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></div>;
  const focusProps = (key: string) => ({ onFocus: () => setFocused(key), onBlur: () => setFocused(null) });

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div key="success"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-14 text-center gap-5"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className={`w-16 h-16 rounded-full border flex items-center justify-center ${a.badge}`}
          >
            <CheckCircle2 className={`w-8 h-8 ${a.icon}`} />
          </motion.div>
          <div className="space-y-1 max-w-xs">
            <h4 className="text-lg font-bold text-white">{successTitle}</h4>
            <p className="text-sm text-white/50">{successText}</p>
          </div>
          <button onClick={reset}
            className={`text-xs transition-colors underline underline-offset-4 mt-2 ${a.link}`}>
            Enviar otro mensaje
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} className="relative space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor={`${source}-name`} className={labelClass}>Nombre</label>
            <div className={fieldClass('name')}>
              <input id={`${source}-name`} type="text" autoComplete="name" placeholder="Tu nombre completo"
                value={fields.name} onChange={(e) => set('name', e.target.value)} {...focusProps('name')}
                className={inputClass} />
              {fields.name && !errors.name && ok}
            </div>
            {errors.name && <p className="text-xs text-red-400 pl-1">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`${source}-email`} className={labelClass}>Correo electrónico</label>
            <div className={fieldClass('email')}>
              <input id={`${source}-email`} type="email" autoComplete="email" placeholder="tu@correo.com"
                value={fields.email} onChange={(e) => set('email', e.target.value)} {...focusProps('email')}
                className={inputClass} />
              {emailOk && !errors.email && ok}
            </div>
            {errors.email && <p className="text-xs text-red-400 pl-1">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`${source}-phone`} className={labelClass}>WhatsApp</label>
            <div className={fieldClass('phone')}>
              <input id={`${source}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder="311 123 4567"
                value={fields.phone} onChange={(e) => set('phone', e.target.value)} {...focusProps('phone')}
                className={inputClass} />
              {phoneDigits.length >= 10 && !errors.phone && ok}
            </div>
            {errors.phone && <p className="text-xs text-red-400 pl-1">{errors.phone}</p>}
          </div>

          {/* Honeypot anti-spam: hidden from people, bots fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label>
              Sitio web
              <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`${source}-message`} className={labelClass}>{messageLabel}</label>
            <div className={fieldClass('message')}>
              <textarea id={`${source}-message`} placeholder={messagePlaceholder} rows={4}
                value={fields.message} onChange={(e) => set('message', e.target.value)} {...focusProps('message')}
                className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-white/25 outline-none resize-none" />
            </div>
            {errors.message && <p className="text-xs text-red-400 pl-1">{errors.message}</p>}
          </div>

          {sendError && (
            <p role="alert" className="text-xs text-red-400 bg-red-500/[0.06] border border-red-500/30 rounded-xl px-4 py-3">
              {sendError}
            </p>
          )}

          <button type="submit" disabled={status === 'sending'}
            className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-sm
                        disabled:opacity-60 transition-all duration-200 mt-2 shadow-lg hover:shadow-xl ${a.button}`}
          >
            {status === 'sending' ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando…
              </>
            ) : (
              <>{submitLabel} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-[11px] text-white/25 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3 h-3 shrink-0" />
            {footnote}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
