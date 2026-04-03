import Link from 'next/link';

const services = [
  { label: 'Páginas Web', href: '/servicios/paginas-web' },
  { label: 'Funnels Automáticos', href: '/servicios/funnels' },
  { label: 'Asistentes de IA', href: '/servicios/asistentes-ia' },
  { label: 'CRM', href: '/servicios/crm' },
  { label: 'Google Maps', href: '/servicios/google-maps' },
  { label: 'Gestión de Llamadas', href: '/servicios/gestion-llamadas' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <polygon points="40,4 76,72 4,72" stroke="#0dcfcf" strokeWidth="6" fill="none" strokeLinejoin="round" />
                  <polygon points="40,18 66,66 14,66" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinejoin="round" opacity="0.25" />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">Delta Kilo</span>
                <span className="block text-[9px] tracking-[0.2em] text-[#0dcfcf] uppercase font-medium">Soluciones</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Convertimos negocios en sistemas organizados, automatizados y escalables.
            </p>
            <p className="text-xs text-white/25">www.deltakilo.com.mx</p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-5">Servicios</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0dcfcf] font-semibold mb-5">Contacto</p>
            <div className="space-y-3">
              <a
                href="https://wa.me/521XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#0dcfcf]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:contacto@deltakilo.com.mx"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contacto@deltakilo.com.mx
              </a>
              <Link href="/contacto" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-[#0dcfcf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Formulario de contacto
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2025 Delta Kilo Soluciones. Todos los derechos reservados.</p>
          <p className="text-xs text-white/20">www.deltakilo.com.mx</p>
        </div>
      </div>
    </footer>
  );
}
