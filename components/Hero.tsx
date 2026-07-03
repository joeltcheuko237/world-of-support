'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroProps {
  lng: string;
  t: {
    heroTitle: string;
    heroSubtitle: string;
    tabHire: string;
    tabWork: string;
    searchPlaceholder: string;
    searchBtn: string;
    skills: {
      web: string;
      ai: string;
      video: string;
      ads: string;
    };
  };
}

export default function Hero({ lng, t }: HeroProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'hire' | 'work'>('hire');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const targetRoute = activeTab === 'hire' ? 'employee' : 'employer';
    router.push(`/${lng}/${targetRoute}?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    /* Section conteneur globale (Fond blanc avec marges tout autour) */
    <section className="bg-white w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
      
      {/* La Div principale centrée avec border-radius et ombre */}
      <div className="relative mx-auto max-w-7xl min-h-[75vh] sm:min-h-[80vh] flex items-center justify-start overflow-hidden rounded-[2rem] text-white px-6 sm:px-12 lg:px-16 shadow-md">
        
        {/* 🎥 LA VIDÉO EN ARRIÈRE-PLAN */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          {/* Remplace cette URL par le lien direct de ta vidéo en ligne (ex: fichier .mp4 sur Vercel Blob, Cloudinary, AWS S3...) */}
          <source 
            src="https://www.pexels.com/download/video/4629264/" 
            type="video/mp4" 
          />
          Ton navigateur ne supporte pas les vidéos en arrière-plan.
        </video>

        {/* 🖤 LE FILTRE SOMBRE (OVERLAY) */}
        {/* Ce gradient permet de masquer la vidéo sous un voile noir à gauche pour garantir la parfaite lisibilité de tes textes blancs */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />

        {/* CONTENU TEXTE & INTERACTIF (Placé au-dessus de la vidéo et du filtre grâce au z-20) */}
        <div className="relative z-20 max-w-3xl w-full py-16 flex flex-col justify-center">
          
          {/* Titre Principal */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
            {t.heroTitle}
          </h1>

          {/* Sous-titre */}
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl font-light leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* 1. Sélecteur d'onglets (Boutons Pilules) */}
          <div className="mt-8 inline-flex p-1 bg-white/10 backdrop-blur-md rounded-full max-w-max border border-white/10">
            <button
              onClick={() => setActiveTab('hire')}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'hire'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {t.tabHire}
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'work'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {t.tabWork}
            </button>
          </div>

          {/* 2. Barre de recherche arrondie */}
          <form onSubmit={handleSearch} className="mt-6 w-full max-w-2xl relative flex items-center">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 pl-6 pr-36 py-4 rounded-full text-[15px] sm:text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-800 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 bg-[#1e3e2b] hover:bg-[#152c1e] text-white font-medium px-5 py-2.5 rounded-full flex items-center space-x-2 text-sm transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{t.searchBtn}</span>
            </button>
          </form>

          {/* 3. Badges de compétences (Tags) */}
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-300">
            <button 
              type="button" 
              onClick={() => setSearchQuery('Web design')}
              className="px-4 py-1.5 rounded-full border border-gray-500/40 hover:border-white hover:bg-white/5 transition text-xs font-medium"
            >
              {t.skills.web} &rarr;
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('AI development')}
              className="px-4 py-1.5 rounded-full border border-gray-500/40 hover:border-white hover:bg-white/5 transition text-xs font-medium"
            >
              {t.skills.ai} &rarr;
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Video editing')}
              className="px-4 py-1.5 rounded-full border border-gray-500/40 hover:border-white hover:bg-white/5 transition text-xs font-medium"
            >
              {t.skills.video} &rarr;
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Google Ads')}
              className="px-4 py-1.5 rounded-full border border-gray-500/40 hover:border-white hover:bg-white/5 transition text-xs font-medium"
            >
              {t.skills.ads} &rarr;
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}