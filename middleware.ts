import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// 1. Définir les langues supportées
const locales = ['fr', 'en'];
const defaultLocale = 'fr';


const isEmployerRoute = createRouteMatcher(["/:lng/employer(.*)"]);
const isPublicRoute = createRouteMatcher([
  '/',
  '/fr',
  '/en',
  '/(fr|en)/login(.*)',
  '/(fr|en)/register(.*)'
]);

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

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // 1. Gestion de la langue par défaut (i18n)
  const locales = ['fr', 'en'];
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  //  Si l'utilisateur tente d'accéder à la page employer sans être connecté
  if (isEmployerRoute(req)) {
    await auth.protect(); 
    // `.protect()` redirige automatiquement l'utilisateur non connecté 
    // vers la page de connexion Clerk configurée.
  }

  if (!pathnameHasLocale) {
    const url = new URL(`/fr${pathname}`, req.url);
    return NextResponse.redirect(url);
  }

  // 2. Protection par Clerk
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
// 4. Configurer le Matcher pour ignorer les fichiers internes de Next.js et les images
export const config = {
  matcher: [
    // On applique le middleware à toutes les routes sauf aux fichiers statiques (_next, images, favicon)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Exécute toujours le middleware pour les API et les Server Actions
    '/(api|trpc)(.*)',
  ],
};