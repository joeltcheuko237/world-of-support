import Link from 'next/link';

interface AboutHeroProps {
  lng: string;
  t: {
    title: string;
    text: string;
    btnText: string;
  };
}

export default function AboutHero({ lng, t }: AboutHeroProps) {
  return (
    <section className="bg-white w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Colonne Gauche : Contenu textuel (Prend 5 colonnes sur 12) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          {/* Titre avec soulignement jaune fidèle au modèle */}
          <div className="relative pb-4 mb-6">
            <h1 className="text-4xl font-extrabold text-[#0a1629] tracking-tight">
              {t.title}
            </h1>
            <div className="absolute bottom-0 left-0 w-32 h-[3.5px] bg-[#fbc02d]" />
          </div>

          {/* Description principale */}
          <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal mb-8 text-justify">
            {t.text}
          </p>

          {/* Bouton d'action Vert Sapin */}
          <Link
            href={`/${lng}/about/more`}
            className="inline-flex items-center bg-[#074e43] hover:bg-[#053a32] text-white font-medium text-sm px-6 py-3.5 rounded-lg shadow-sm transition duration-150 group"
          >
            {t.btnText}
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Colonne Droite : Image / Conteneur (Prend 7 colonnes sur 12) */}
        <div className="lg:col-span-7 w-full h-[320px] sm:h-[400px] bg-[#e9ecef] rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center text-gray-400">
          {/* Tu pourras remplacer ce div par une balise <Image /> Next.js dès que tu auras ton visuel */}
          <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>

      </div>
    </section>
  );
}