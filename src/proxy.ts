import { NextRequest, NextResponse } from 'next/server';

// Serves static proposal microsites from public/propuestas/<slug>/ under two
// URL shapes:
//   - www.deltakilo.com.mx/propuestas/<slug>/   (works today, no DNS change)
//   - propuestas.deltakilo.com.mx/<slug>/       (once the subdomain + Vercel
//     domain are added — see Sistema-Diagnostico-Propuesta.md)
// The bare subdomain root (propuestas.deltakilo.com.mx/) serves its own
// branded landing page (public/propuestas/index.html) — it does NOT redirect
// to the main site, since visitors land there only via a mistyped/missing
// proposal link and shouldn't be bounced away without explanation.
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
    if (!pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = `${pathname}/`;
      return NextResponse.redirect(url);
    }
    const url = request.nextUrl.clone();
    url.pathname = `/propuestas${pathname}index.html`;
    return NextResponse.rewrite(url);
  }

  if (pathname === '/propuestas' || pathname.startsWith('/propuestas/')) {
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
