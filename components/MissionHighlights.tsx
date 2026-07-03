interface Pillar {
  title: string;
  desc: string;
}

interface MissionHighlightsProps {
  t: {
    tagline: string;
    title: string;
    description: string;
    pillars: {
      p1: Pillar;
      p2: Pillar;
      p3: Pillar;
    };
  };
}

export default function MissionHighlights({ t }: MissionHighlightsProps) {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
      
      {/* BLOC GAUCHE : Identitaire (Prend 4 colonnes sur 12 sur grand écran) */}
      <div className="bg-[#074e43] md:col-span-4 flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 text-white">
        <span className="text-[#a3e635] text-[11px] font-bold tracking-widest uppercase mb-3">
          {t.tagline}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {t.title.split(' ')[0]} <span className="block text-[#fbc02d]">{t.title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="mt-6 text-sm text-gray-100 opacity-90 leading-relaxed font-normal">
          {t.description}
        </p>
      </div>

      {/* BLOC DROITE : Les 3 fiches horizontales (Prend 8 colonnes sur 12) */}
      <div className="bg-[#effef7] md:col-span-8 flex flex-col justify-center gap-5 px-6 py-14 sm:px-12 lg:px-20">
        
        {/* Fiche 1 : Blanche standard */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-50 flex items-start space-x-5 transition duration-150 hover:shadow-md">
          <div className="w-12 h-12 bg-[#effef7] rounded-full flex items-center justify-center shrink-0 text-[#074e43]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 01-.75-.75v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 14.15m16.5 0V9.75A2.25 2.25 0 0016.5 7.5h-9A2.25 2.25 0 005.25 9.75v4.4m10.5-6.75V4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-1">
              {t.pillars.p1.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
              {t.pillars.p1.desc}
            </p>
          </div>
        </div>

        {/* Fiche 2 : Orange mise en valeur (Active) */}
        <div className="bg-[#f59e0b] rounded-xl p-5 sm:p-6 shadow-md flex items-start space-x-5 text-white transform md:scale-[1.02] transition duration-150">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 text-[#f59e0b]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-extrabold tracking-tight mb-1">
              {t.pillars.p2.title}
            </h3>
            <p className="text-xs sm:text-sm text-orange-50 font-medium leading-relaxed opacity-95">
              {t.pillars.p2.desc}
            </p>
          </div>
        </div>

        {/* Fiche 3 : Blanche standard */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-50 flex items-start space-x-5 transition duration-150 hover:shadow-md">
          <div className="w-12 h-12 bg-[#effef7] rounded-full flex items-center justify-center shrink-0 text-[#074e43]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight mb-1">
              {t.pillars.p3.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
              {t.pillars.p3.desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}