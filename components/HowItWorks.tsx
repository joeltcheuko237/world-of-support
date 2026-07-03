import Link from 'next/link';

interface Step {
  title: string;
  desc: string;
  link: string;
}

interface HowItWorksProps {
  lng: string;
  t: {
    badge: string;
    title: string;
    subtitle: string;
    step1: Step;
    step2: Step;
    step3: Step;
  };
}

export default function HowItWorks({ lng, t }: HowItWorksProps) {
  return (
    <section className="bg-[#fafafa] w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="bg-[#e8f5e9] text-[#1e3e2b] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-500 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Grille des 3 étapes / Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Carte 1 : Post a Job */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center justify-between min-h-[340px] hover:shadow-md transition duration-200">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center text-[#1e3e2b] mb-6">
                {/* Icône Valise */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.step1.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{t.step1.desc}</p>
            </div>
            <Link href={`/${lng}/categories`} className="mt-6 text-sm font-semibold text-gray-800 hover:text-[#1e3e2b] flex items-center transition group">
              {t.step1.link} <span className="ml-1 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Carte 2 : Hire Freelancer */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center justify-between min-h-[340px] hover:shadow-md transition duration-200">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center text-[#1e3e2b] mb-6">
                {/* Icône Utilisateur avec loupe */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.step2.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{t.step2.desc}</p>
            </div>
            <Link href={`/${lng}/categories`} className="mt-6 text-sm font-semibold text-gray-800 hover:text-[#1e3e2b] flex items-center transition group">
              {t.step2.link} <span className="ml-1 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Carte 3 : Make Secure Payment */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center justify-between min-h-[340px] hover:shadow-md transition duration-200">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#e8f5e9] rounded-full flex items-center justify-center text-[#1e3e2b] mb-6">
                {/* Icône Carte Bancaire */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.step3.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{t.step3.desc}</p>
            </div>
            <Link href={`/${lng}/categories`} className="mt-6 text-sm font-semibold text-gray-800 hover:text-[#1e3e2b] flex items-center transition group">
              {t.step3.link} <span className="ml-1 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}