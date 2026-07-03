import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// 1. Définir les langues supportées
const locales = ['fr', 'en'];
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Vérifier si le chemin contient déjà une langue supportée
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si l'URL contient déjà /fr ou /en, on laisse passer la requête normalement
  if (pathnameHasLocale) return NextResponse.next();

  // 3. Sinon, on redirige vers la langue par défaut (fr)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// 4. Configurer le Matcher pour ignorer les fichiers internes de Next.js et les images
export const config = {
  matcher: [
    // On applique le middleware à toutes les routes sauf aux fichiers statiques (_next, images, favicon)
    '/((?!_next/static|_next/image|favicon.ico|messages|public).*)',
  ],
};