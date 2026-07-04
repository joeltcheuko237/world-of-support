import { use } from "react";
import { getNewsArticles } from "./_components/actions";
import NewsFilter from "./_components/NewsFilter";
import frMessages from "../../../messages/fr.json";
import enMessages from "../../../messages/en.json";

interface PageProps {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { lng } = await params;
  const { category } = await searchParams;
  
  const currentCategory = category || "all";
  const messages = lng === "en" ? enMessages : frMessages;
  const t = messages.news;

  const articles = await getNewsArticles(currentCategory);

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-[#00f2fe] selection:text-slate-900 relative overflow-hidden">
      
      {/* 🌌 Lueurs d'ambiance discrètes adaptées sur fond clair */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00f2fe]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#05c46b]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-[#00f2fe] bg-clip-text text-transparent mb-4">
          {t.title}
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {/* Composant de filtrage */}
        <NewsFilter t={t} currentCategory={currentCategory} />

        {/* Grille d'articles */}
        {articles.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-16 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 backdrop-blur-sm">
            {t.noArticles}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => {
              const title = lng === "en" ? article.title_en : article.title_fr;
              const content = lng === "en" ? article.content_en : article.content_fr;

              return (
                <article 
                  key={article.id} 
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-[#00f2fe]/40 transition-all duration-300 flex flex-col group hover:shadow-[0_10px_30px_rgba(0,242,254,0.06)]"
                >
                  {article.image_url && (
                    <div className="h-48 w-full overflow-hidden bg-slate-50 relative border-b border-slate-100">
                      <img 
                        src={article.image_url} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                      />
                      {/* Badge aux couleurs de la marque */}
                      <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[#05c46b] border border-[#05c46b]/20 shadow-sm">
                        {article.category === "annonce" ? "📢 Annonce" : "📝 Blog"}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[11px] text-slate-400 font-bold tracking-wider mb-2">
                      {new Date(article.created_at).toLocaleDateString(lng === "en" ? "en-US" : "fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                    <h2 className="text-base font-bold text-slate-800 mb-3 group-hover:text-[#00f2fe] transition-colors duration-300 line-clamp-2 leading-snug">
                      {title}
                    </h2>
                    <p className="text-xs text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                      {content}
                    </p>
                    <button className="mt-auto self-start text-xs font-bold text-[#00f2fe] hover:text-[#05c46b] transition-colors duration-300 flex items-center gap-1.5 group/btn">
                      <span>{t.readMore}</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}