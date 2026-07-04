"use client";

import { useState, useEffect } from "react";

interface Member {
  name: string;
  role: string;
  bio: string;
  shortKey: string;
}

interface TeamCarouselProps {
  t: {
    title: string;
    members: {
      robert: Omit<Member, "shortKey">;
      sarah: Omit<Member, "shortKey">;
      trent: Omit<Member, "shortKey">;
      jos: Omit<Member, "shortKey">;
    };
  };
}

export default function TeamCarousel({ t }: TeamCarouselProps) {
  const team: Member[] = [
    { ...t.members.robert, shortKey: "ROBERT" },
    { ...t.members.sarah, shortKey: "SARAH" },
    { ...t.members.trent, shortKey: "TRENT" },
    { ...t.members.jos, shortKey: "JOS" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Défilement automatique toutes les 5 secondes (5000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % team.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [team.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % team.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  const currentMember = team[activeIndex];

  return (
    <section className="bg-white w-full py-16 px-6 sm:px-12 lg:px-20 select-none">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center sm:text-left">
          {t.title}
        </h2>

        {/* CONTENEUR PRINCIPAL DU MEMBRE ACTIF */}
        <div className="relative flex flex-col md:flex-row items-center gap-8 lg:gap-16 min-h-[340px]">
          
          {/* Flèche Gauche (Masquée sur mobile pour l'esthétique) */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex absolute -left-12 items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-900 transition text-xl font-light"
          >
            &larr;
          </button>

          {/* Grande Image de gauche */}
          <div className="w-full sm:w-[220px] h-[240px] bg-gray-200 rounded-3xl shrink-0 overflow-hidden shadow-sm flex items-center justify-center text-gray-400">
            {/* Template d'image à remplacer par ton asset réel plus tard */}
            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>

          {/* Bloc d'informations à droite */}
          <div className="flex-1 text-center md:text-left py-4">
            <h3 className="text-4xl font-extrabold text-[#0a1629] tracking-tight transition duration-300">
              {currentMember.name}
            </h3>
            <p className="text-[#074e43] text-[15px] font-bold mt-2 tracking-wide">
              {currentMember.role}
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6 font-normal max-w-xl">
              {currentMember.bio}
            </p>
          </div>

          {/* Flèche Droite */}
          <button 
            onClick={handleNext}
            className="hidden md:flex absolute -right-12 items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-900 transition text-xl font-light"
          >
            &rarr;
          </button>
        </div>

        {/* LIGNE DE SÉPARATION HORIZONTALE */}
        <div className="w-full h-[1px] bg-gray-200 my-12" />

        {/* INDEX NAVIGATION : LES MINI AVATARS (PAGINATION) */}
        <div className="flex items-center justify-center space-x-6 sm:space-x-8">
          {team.map((member, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="flex flex-col items-center focus:outline-none group transition"
              >
                {/* Cercle Avatar */}
                <div 
                  className={`w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "ring-2 ring-offset-2 ring-[#f59e0b] scale-105" 
                      : "opacity-60 group-hover:opacity-100"
                  }`}
                >
                  <span className="text-[10px] text-gray-400 font-bold">{member.shortKey[0]}</span>
                </div>
                
                {/* Label texte en dessous */}
                <span 
                  className={`text-[10px] sm:text-[11px] tracking-wider mt-3 uppercase font-bold transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {member.shortKey}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}