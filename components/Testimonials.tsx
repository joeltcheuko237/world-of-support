interface Review {
  title: string;
  text: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  t: {
    title: string;
    subtitle: string;
    review1: Review;
    review2: Review;
    review3: Review;
  };
}

export default function Testimonials({ t }: TestimonialsProps) {
  const reviews = [t.review1, t.review2, t.review3];

  return (
    <section className="bg-white w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Grille des cartes de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[260px] transition duration-200 hover:shadow-md"
            >
              {/* Contenu de l'avis */}
              <div>
                <h3 className="text-lg font-bold text-gray-950 tracking-tight mb-4">
                  {review.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {review.text}
                </p>
              </div>

              {/* Bloc Auteur de l'avis */}
              <div className="flex items-center space-x-3.5 mt-8 pt-2">
                {/* Placeholder d'avatar gris comme sur l'image */}
                <div className="w-11 h-11 bg-gray-200 rounded-full shrink-0" />
                
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-gray-900 truncate tracking-tight">
                    {review.author}
                  </span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}