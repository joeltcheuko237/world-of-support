'use client';

import { useState } from 'react';
import Link from 'next/link';

interface JobOfTheDayProps {
  lng: string;
  t: {
    badge: string;
    title: string;
    exploreBtn: string;
    applyBtn: string;
    categories: Record<string, string>;
  };
}

export default function JobOfTheDay({ lng, t }: JobOfTheDayProps) {
  // Liste des catégories pour l'affichage des filtres (pilules)
  const categories = ['designer', 'admin', 'finance', 'content', 'tech', 'software', 'education'];
  const [activeCategory, setActiveCategory] = useState('admin'); // 'Admin Officer' actif par défaut comme sur l'image

  // Données de test structurées et fidèles à l'image
  const mockJobs = [
    {
      id: 1,
      company: 'Citi',
      position: 'Purchasing Staff',
      category: 'admin',
      tags: ['Figma', 'Adobe'],
      salary: '$800/hr'
    },
    {
      id: 2,
      company: 'Google',
      position: 'Senior UI/UX Designer',
      category: 'designer',
      tags: ['Figma', 'Prototyping'],
      salary: '$120/hr'
    },
    {
      id: 3,
      company: 'Vercel',
      position: 'Frontend Engineer',
      category: 'software',
      tags: ['Next.js', 'Tailwind'],
      salary: '$95/hr'
    }
  ];

  // Filtrage des offres selon la catégorie active
  const filteredJobs = mockJobs.filter(job => job.category === activeCategory);

  return (
    <section className="bg-[#fafafa] w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* En-tête */}
        <div className="text-center mb-8 flex flex-col items-center">
          <span className="bg-[#e8f5e9] text-[#1e3e2b] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Barre de filtres (Pilules de catégories) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-150 ${
                activeCategory === cat
                  ? 'border-gray-900 bg-white text-gray-900 shadow-sm font-semibold'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {t.categories[cat]}
            </button>
          ))}
        </div>

        {/* Zone de la Grille d'offres */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px] max-w-sm w-full transition duration-200 hover:shadow-md"
              >
                <div>
                  {/* Entreprise */}
                  <span className="text-[17px] font-extrabold text-gray-900 tracking-tight block">
                    {job.company}
                  </span>
                  {/* Intitulé du poste */}
                  <span className="text-[16px] font-bold text-gray-800 mt-1 block">
                    {job.position}
                  </span>
                  
                  {/* Liste des tags de compétences */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-50 text-gray-500 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pied de la carte (Salaire & Bouton Postuler) */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                  <span className="text-lg font-bold text-gray-900 tracking-tight">
                    {job.salary}
                  </span>
                  <Link 
                    href={`/${lng}/jobs/${job.id}`}
                    className="bg-[#e8f5e9] text-[#1e3e2b] hover:bg-[#dceddd] font-semibold text-xs px-5 py-2.5 rounded-xl transition duration-150"
                  >
                    {t.applyBtn}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            /* État si aucune offre n'est encore saisie dans cette catégorie */
            <div className="col-span-full text-center py-12 text-sm text-gray-400 font-normal">
              Aucune offre disponible aujourd'hui dans cette catégorie.
            </div>
          )}
        </div>

        {/* Bouton d'action centralisé tout en bas */}
        <Link
          href={`/${lng}/jobs`}
          className="bg-[#1e3e2b] hover:bg-[#152c1e] text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-sm transition duration-200"
        >
          {t.exploreBtn}
        </Link>

      </div>
    </section>
  );
}