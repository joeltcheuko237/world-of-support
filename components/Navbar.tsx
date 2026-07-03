'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LangSwitcher from './LangSwitcher';

export default function Navbar({ lng }: { lng: string }) {
  const [t, setT] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Chargement des traductions côté client
  useEffect(() => {
    import(`../messages/${lng}.json`).then((mod) => {
      setT(mod.default.Navbar);
    });
  }, [lng]);

  if (!t) return <div className="h-20 bg-white border-b border-gray-100"></div>;

  return (
    <nav className="bg-white text-gray-800 border-b border-gray-100 px-4 sm:px-6 py-4 relative sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        
        {/* 1. Zone Logo & Texte */}
        <Link href={`/${lng}`} className="flex items-center space-x-3 z-50">
          <div className="w-10 h-10 relative bg-[#1e3e2b] rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
            WOS
          </div>
          <div className="flex flex-col leading-none font-bold text-gray-900 tracking-tight text-sm uppercase">
            <span>World Of</span>
            <span className="text-[#1e3e2b]">Support</span>
          </div>
        </Link>

        {/* 2. Liens de Navigation Centraux (Ordinateur uniquement) */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-[15px] text-gray-700">
          <Link href={`/${lng}`} className="hover:text-emerald-800 transition">
            {t.home}
          </Link>
          
          <Link href={`/${lng}/about`} className="hover:text-[#1e3e2b] transition">
            {t.about}
          </Link>

          {/* Menu Déroulant "Programmes & Services" */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`flex items-center transition focus:outline-none ${isDropdownOpen ? 'text-[#1e3e2b] font-semibold' : 'hover:text-[#1e3e2b]'}`}>
              {t.services} <span className="text-[10px] ml-1">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                <Link href={`/${lng}/employee`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-800 transition">
                  {t.dropdown.jobs}
                </Link>
                <Link href={`/${lng}/training`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-800 transition">
                  {t.dropdown.training}
                </Link>
                <Link href={`/${lng}/partner`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-800 transition">
                  {t.dropdown.fellowships}
                </Link>
                <Link href={`/${lng}/employer`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-800 transition">
                  {t.dropdown.employerResources}
                </Link>
                <Link href={`/${lng}/volunteering`} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-800 transition">
                  {t.dropdown.volunteering}
                </Link>
              </div>
            )}
          </div>

          <Link href={`/${lng}/news`} className="hover:text-[#1e3e2b] transition">
            {t.news}
          </Link>
          
          <Link href={`/${lng}/contact`} className="hover:text-[#1e3e2b] transition">
            {t.contact}
          </Link>
        </div>

        {/* 3. Actions à droite (Ordinateur uniquement) */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-[15px]">
          <LangSwitcher currentLng={lng} />
          <Link href={`/${lng}/login`} className="text-gray-700 hover:text-emerald-800 transition">
            {t.login}
          </Link>
          <Link
            href={`/${lng}/register`}
            className="bg-[#1e3e2b] hover:bg-[#152c1e] text-white px-6 py-2 rounded-full font-semibold shadow-sm transition duration-200 text-sm"
          >
            {t.register}
          </Link>
        </div>

        {/* 4. Bouton Menu Burger (Mobile uniquement) */}
        <div className="flex md:hidden items-center space-x-4">
          {/* On garde la sélection de la langue accessible directement même sur mobile */}
          <LangSwitcher currentLng={lng} />
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-[#1e3e2b] focus:outline-none z-50 p-2"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* 5. Menu Mobile Déroulant */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg p-5 flex flex-col space-y-4 md:hidden z-40 animate-fade-in">
          <Link href={`/${lng}`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-1 border-b border-gray-50">
            {t.home}
          </Link>
          <Link href={`/${lng}/about`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-1 border-b border-gray-50">
            {t.about}
          </Link>
          
          {/* Sous-liens "Programmes & Services" listés directement sur mobile */}
          <div className="flex flex-col pl-3 border-l-2 border-emerald-800/30 space-y-2 py-1">
            <span className="text-xs font-semibold text-[#1e3e2b] uppercase tracking-wider">{t.services}</span>
            <Link href={`/${lng}/employee`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600">{t.dropdown.jobs}</Link>
            <Link href={`/${lng}/training`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600">{t.dropdown.training}</Link>
            <Link href={`/${lng}/partner`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600">{t.dropdown.fellowships}</Link>
            <Link href={`/${lng}/employer`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600">{t.dropdown.employerResources}</Link>
            <Link href={`/${lng}/volunteering`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-600">{t.dropdown.volunteering}</Link>
          </div>

          <Link href={`/${lng}/news`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-1 border-b border-gray-50">
            {t.news}
          </Link>
          <Link href={`/${lng}/contact`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-medium py-1 border-b border-gray-50">
            {t.contact}
          </Link>
          
          {/* Actions de connexion sur Mobile */}
          <div className="pt-2 flex flex-col space-y-3">
            <Link 
              href={`/${lng}/login`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center text-gray-700 font-medium py-2 border border-gray-200 rounded-full"
            >
              {t.login}
            </Link>
            <Link 
              href={`/${lng}/register`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center bg-[#1e3e2b] text-white font-semibold py-2 rounded-full shadow-sm"
            >
              {t.register}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}