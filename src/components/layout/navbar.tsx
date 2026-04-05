'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const services = [
  { label: 'Páginas Web',        href: '/servicios/paginas-web',      tag: 'Presencia digital' },
  { label: 'Funnels Automáticos', href: '/servicios/funnels',          tag: 'Captación' },
  { label: 'Asistentes de IA',   href: '/servicios/asistentes-ia',    tag: 'IA' },
  { label: 'CRM',                href: '/servicios/crm',              tag: 'Gestión' },
  { label: 'Google Maps',        href: '/servicios/google-maps',      tag: 'Local SEO' },
  { label: 'Gestión de Llamadas',href: '/servicios/gestion-llamadas', tag: 'Comunicación' },
];

const navLinks = [
  { label: 'Inicio',    href: '/' },
  { label: 'Servicios', href: '/servicios', hasDropdown: true },
  { label: 'Contacto',  href: '/contacto' },
];

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                {/* Outer triangle cyan */}
                <polygon points="40,4 76,72 4,72" stroke="#0dcfcf" strokeWidth="5" fill="none" strokeLinejoin="round" />
                {/* Inner triangle white/dim */}
                <polygon points="40,20 64,66 16,66" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                {/* Center dot */}
                <circle cx="40" cy="50" r="3" fill="#0dcfcf" opacity="0.6" />
              </svg>
              {/* Logo glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'drop-shadow(0 0 8px rgba(13,207,207,0.6))' }} />
            </div>
            <div className="leading-none">
              <span className="block text-white font-bold text-[14px] tracking-[0.18em] uppercase">Delta Kilo</span>
              <span className="block text-[#0dcfcf] text-[10px] tracking-[0.22em] uppercase font-medium mt-0.5">Soluciones</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative">
                  <button
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname.startsWith('/servicios')
                        ? 'text-[#0dcfcf] bg-[#0dcfcf]/5'
                        : 'text-white/55 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    <ChevronDown size={13} className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                      >
                        <div className="rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] bg-[#0e0e0e] border border-white/5">
                          {/* Header */}
                          <div className="px-4 pt-3 pb-2 border-b border-white/5">
                            <p className="text-[10px] uppercase tracking-widest text-white/25 font-semibold">Servicios</p>
                          </div>
                          {/* Links */}
                          <div className="p-2">
                            {services.map((s) => (
                              <Link
                                key={s.href}
                                href={s.href}
                                className={cn(
                                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 group/item',
                                  pathname === s.href
                                    ? 'text-[#0dcfcf] bg-[#0dcfcf]/8'
                                    : 'text-white/55 hover:text-white hover:bg-white/5'
                                )}
                              >
                                <span>{s.label}</span>
                                <span className="text-[10px] text-white/20 group-hover/item:text-[#0dcfcf]/40 transition-colors">{s.tag}</span>
                              </Link>
                            ))}
                          </div>
                          {/* Footer CTA */}
                          <div className="p-3 pt-0">
                            <Link
                              href="/servicios"
                              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold text-[#0dcfcf]/60 hover:text-[#0dcfcf] hover:bg-[#0dcfcf]/5 transition-all"
                            >
                              Ver todos los servicios
                              <ArrowUpRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-[#0dcfcf] bg-[#0dcfcf]/5'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20Delta%20Kilo%20Soluciones"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/8 bg-white/3 hover:bg-white/6 transition-all text-white/70 hover:text-white"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#080808]/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-[#0a0a0a] border-l border-white/5 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/5">
                <span className="text-sm font-medium text-white/40">Menú</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/50"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                <Link href="/" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  Inicio
                </Link>

                {/* Services group */}
                <div className="pt-2">
                  <p className="px-3 pb-2 text-[10px] uppercase tracking-widest text-white/20 font-semibold">Servicios</p>
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] text-white/20">{s.tag}</span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5">
                  <Link href="/contacto" className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
                    Contacto
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="p-4 border-t border-white/5">
                <a
                  href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20Delta%20Kilo%20Soluciones"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Hablar por WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
