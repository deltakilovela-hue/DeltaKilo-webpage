import { NextRequest, NextResponse } from 'next/server';

// Serves static proposal microsites from public/propuestas/<slug>/ under two
// URL shapes:
//   - www.deltakilo.com.mx/propuestas/<slug>/   (works today, no DNS change)
//   - propuestas.deltakilo.com.mx/<slug>/       (once the subdomain + Vercel
//     domain are added — see Sistema-Diagnostico-Propuesta.md)
// Canonical URLs always end in "/" so the page's relative asset paths
// (assets/...) resolve correctly. next.config.ts sets
// skipTrailingSlashRedirect so Next's own default doesn't fight this.
export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;
  const isPropuestasHost = host.startsWith('propuestas.');
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathname);

  if (hasExtension) {
    if (isPropuestasHost) {
      const url = request.nextUrl.clone();
      url.pathname = `/propuestas${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (isPropuestasHost) {
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.protocol = 'https';
      url.hostname = 'www.deltakilo.com.mx';
      url.port = '';
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    if (!pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = `${pathname}/`;
      return NextResponse.redirect(url);
    }
    const url = request.nextUrl.clone();
    url.pathname = `/propuestas${pathname}index.html`;
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith('/propuestas/') && pathname !== '/propuestas/') {
    if (!pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = `${pathname}/`;
      return NextResponse.redirect(url);
    }
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}index.html`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
