interface TrustedByProps {
  text: string;
}

export default function TrustedBy({ text }: TrustedByProps) {
  return (
    <div className="bg-white w-full py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Titre de la section */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8">
          {text}
        </p>

        {/* Conteneur des logos (Flexible, centré et espacé) */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 md:gap-20 opacity-50 grayscale hover:opacity-75 transition-opacity duration-300">
          
          {/* Logo 1: Canada */}
          <div className="flex items-center space-x-1 text-gray-700 font-bold text-sm">
            <span className="text-red-600 text-lg">🇨🇦</span>
            <div className="flex flex-col text-[10px] leading-tight font-normal text-left">
              <span className="font-bold">Government</span>
              <span>of Canada</span>
            </div>
          </div>

          {/* Logo 2: Alberta */}
          <div className="text-gray-700 font-serif text-lg italic tracking-tight">
            Alberta <span className="text-[10px] not-italic font-sans font-light block -mt-2">Government</span>
          </div>

          {/* Logo 3: Shield Placeholder */}
          <div className="w-8 h-8 opacity-70">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          {/* Logo 4: Ledcor */}
          <div className="border border-gray-600 text-gray-700 font-black px-2 py-0.5 text-xs tracking-tighter rounded uppercase transform -rotate-2">
            Ledcor
          </div>

          {/* Logo 5: Huawei-like abstract */}
          <div className="flex items-center space-x-2 text-gray-700 font-semibold tracking-wider text-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
              <path d="M12 2L2 22h20L12 2z"/>
            </svg>
            <span className="font-sans font-bold tracking-widest">HUAWEI</span>
          </div>

        </div>
      </div>
    </div>
  );
}