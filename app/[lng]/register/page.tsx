import { SignUp } from "@clerk/nextjs";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default async function RegisterPage({ params }: PageProps) {
  const { lng } = await params;

  // Chargement du slogan traduit
  const messages = (await import(`../../../messages/${lng}.json`)).default;
  const t = messages.Auth.register;

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Conteneur global split-screen avec les bords arrondis du modèle */}
      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[620px] border border-gray-100">
        
        {/* SECTION GAUCHE : Slogan & Fond Vert */}
        <div className="bg-[#1e6b54] md:w-1/2 p-8 sm:p-12 flex flex-col justify-end relative overflow-hidden min-h-[200px] md:min-h-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight max-w-sm relative z-10">
            {t.slogan}
          </h2>
        </div>

        {/* SECTION DROITE : Le module Clerk Personnalisé */}
        <div className="md:w-1/2 p-4 sm:p-8 lg:p-12 flex items-center justify-center bg-white">
          <SignUp
            // Résout l'erreur de configuration en utilisant le routage par ancre (#)
            routing="hash"
            
            // Redirection après inscription vers la page d'accueil de la langue actuelle
            signInUrl={`/${lng}/login`}
            fallbackRedirectUrl={`/${lng}/onboarding`}
            
            // Customisation des styles Clerk pour coller aux captures d'écran
            appearance={{
              elements: {
                rootBox: "w-full shadow-none",
                cardBox: "shadow-none border-none w-full",
                card: "shadow-none border-none p-0 w-full bg-transparent",
                headerTitle: "text-xl sm:text-2xl font-bold text-gray-900 tracking-tight text-center",
                headerSubtitle: "text-xs sm:text-sm text-gray-500 mt-1 text-center",
                socialButtonsBlockButton: "w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 px-4 rounded-xl transition shadow-sm",
                socialButtonsBlockButtonText: "text-[13px] font-semibold text-gray-800",
                dividerLine: "bg-gray-200",
                dividerText: "text-xs text-gray-400 font-normal uppercase tracking-wider",
                formLabel: "block text-xs sm:text-sm font-bold text-gray-800 mb-1.5",
                formButtonPrimary: "w-full bg-[#074e43] hover:bg-[#053a32] text-white font-semibold text-sm py-2.5 rounded-xl shadow-sm transition normal-case",
                formFieldInput: "w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e6b54]/20 focus:border-[#1e6b54] text-gray-900 font-normal transition",
                footerActionText: "text-xs sm:text-sm text-gray-500",
                footerActionLink: "text-[#074e43] font-bold hover:underline",
              },
              
            }}
          />
        </div>

      </div>
    </div>
  );
}