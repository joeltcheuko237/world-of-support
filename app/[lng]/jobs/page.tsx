import { use } from "react";
import { getJobs } from "./_components/actions";
import frMessages from "../../../messages/fr.json";
import enMessages from "../../../messages/en.json";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default async function JobsPage({ params }: PageProps) {
  const { lng } = await params;
  
  const messages = lng === "en" ? enMessages : frMessages;
  // Si tu n'as pas encore créé la clé "jobs" dans tes JSON, on prévoit des valeurs de secours textuelles
  const t = messages.jobs || {
    title: lng === "en" ? "Available Job Offers" : "Offres d'emploi disponibles",
    subtitle: lng === "en" ? "Find the best opportunities matching your skills." : "Trouvez les meilleures opportunités correspondant à vos compétences.",
    noJobs: lng === "en" ? "No job offers available at the moment." : "Aucune offre d'emploi disponible pour le moment.",
    qualificationsLabel: lng === "en" ? "Required Qualifications" : "Qualifications requises",
    applyBtn: lng === "en" ? "Apply Now" : "Postuler maintenant"
  };

  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-[#00f2fe] selection:text-slate-900 relative overflow-hidden">
      
      {/* 🌌 Lueurs d'ambiance discrètes de la charte logo sur fond blanc */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00f2fe]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#05c46b]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-[#00f2fe] bg-clip-text text-transparent mb-4">
          {t.title}
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Liste des Offres */}
      <div className="max-w-4xl mx-auto px-6 pb-20 relative z-10">
        {jobs.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-16 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 backdrop-blur-sm">
            {t.noJobs}
          </p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job: any) => (
              <article 
                key={job.id} 
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:border-[#00f2fe]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,242,254,0.06)] group"
              >
                {/* En-tête de la carte */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-[#00f2fe] transition-colors duration-300">
                    {job.title}
                  </h2>
                  <span className="text-[11px] text-slate-400 font-bold tracking-wider shrink-0">
                    📅 {new Date(job.created_at).toLocaleDateString(lng === "en" ? "en-US" : "fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>

                {/* Description de l'offre */}
                <div className="mb-6">
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                {/* Section Qualifications */}
                {job.qualifications && (
                  <div className="bg-slate-50/70 border border-slate-100/80 rounded-2xl p-4 mb-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      📋 {t.qualificationsLabel}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {job.qualifications}
                    </p>
                  </div>
                )}

                {/* Bouton pour postuler */}
                <div className="flex justify-end border-t border-slate-50 pt-4 mt-4">
                  <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#00f2fe] to-[#05c46b] text-white hover:shadow-[0_4px_15px_rgba(0,242,254,0.2)] transition-all duration-300">
                    {t.applyBtn}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}