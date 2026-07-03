import Link from 'next/link';

interface CategoriesGridProps {
  lng: string;
  t: {
    badge: string;
    title: string;
    subtitle: string;
    jobsAvailable: string;
    list: Record<string, string>;
  };
}

export default function CategoriesGrid({ lng, t }: CategoriesGridProps) {
  // Configuration des catégories avec compteurs statiques (exemples fidèles à l'image)
  const categoriesData = [
    { id: 'retail', count: 2, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /> },
    { id: 'uiux', count: 8, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /> },
    { id: 'finance', count: 5, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5h-15V21m16.5 0h-18" /> },
    { id: 'hrd', count: 4, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.75-2.906m-.173 3.111a11.954 11.954 0 01-2.848-1.447m3.021 1.448a4.855 4.855 0 00-.752-2.16M12 11a3 3 0 100-6 3 3 0 000 6zm6.236 1.434a2.25 2.25 0 101.43-3.92 2.25 2.25 0 00-1.43 3.92zM6 18.72a9.094 9.094 0 01-3.741-.479 3 3 0 014.682-2.72m-.94 3.198l-.001.031c0 .225.012.447.037.666A11.944 11.944 0 0012 21c2.17 0 4.207-.576 5.963-1.584A6.062 6.062 0 0018 18.722m-12 0a5.97 5.97 0 01.75-2.906m.173 3.111a11.954 11.954 0 002.848-1.447m-3.021 1.448a4.855 4.855 0 01.752-2.16M12 11a3 3 0 110-6 3 3 0 010 6zm-6.236 1.434a2.25 2.25 0 11-1.43-3.92 2.25 2.25 0 011.43 3.92z" /> },
    { id: 'admin', count: 2, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z" /> },
    { id: 'education', count: 8, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L3 11v6.75c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75V11l-1.26-.826M12 3v15m0-15L3.304 8.804a1 1 0 000 1.392L12 19l8.696-8.804a1 1 0 000-1.392L12 3z" /> },
    { id: 'tech', count: 5, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /> },
    { id: 'social', count: 7, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m0 12.792l-9.566-5.314m9.566-7.478a2.25 2.25 0 113.183 3.183 2.25 2.25 0 01-3.183-3.183zm0 12.792a2.25 2.25 0 113.184 3.183 2.25 2.25 0 01-3.184-3.183z" /> },
    { id: 'content', count: 8, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h11.25" /> },
    { id: 'software', count: 8, icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 3h13.5m-13.5-6h13.5m-13.5-3h13.5m-13.5-3h13.5" /> }
  ];

  return (
    <section className="bg-white w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="bg-[#e8f5e9] text-[#1e3e2b] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Grille Responsive (5 colonnes sur grand écran, s'adapte sur mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              href={`/${lng}/categories/${cat.id}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4 hover:shadow-md hover:border-gray-200 transition duration-200 group"
            >
              {/* Conteneur de l'icône */}
              <div className="w-11 h-11 bg-gray-50 text-emerald-900 group-hover:bg-[#e8f5e9] group-hover:text-[#1e3e2b] rounded-xl flex items-center justify-center shrink-0 transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  {cat.icon}
                </svg>
              </div>

              {/* Textes de la catégorie */}
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-bold text-gray-900 truncate tracking-tight">
                  {t.list[cat.id]}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 font-medium">
                  {cat.count} {t.jobsAvailable}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}