"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUserRole } from "@/app/actions/onboarding"; // Importation de l'action
import { use } from "react";
import { useUser } from "@clerk/nextjs"; // 1. Importation du hook Clerk pour récupérer l'utilisateur

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default function OnboardingPage({ params }: PageProps) {
  const { lng } = use(params); // Raccourci Next.js pour dérouler les paramètres
  const router = useRouter();
  const { user, isLoaded } = useUser(); // 2. Initialisation de la session Clerk
  
  const [selectedRole, setSelectedRole] = useState<"recruiter" | "seeker" | null>(null); //
  const [isSubmitting, setIsSubmitting] = useState(false); //
  const [error, setError] = useState(""); //

  const handleConfirm = async () => {
    if (!selectedRole) return; //
    
    // Sécurité au cas où la session Clerk ne serait pas encore chargée à l'écran
    if (!isLoaded || !user) {
      setError("Session utilisateur en cours de chargement. Veuillez réessayer.");
      return;
    }

    setIsSubmitting(true); //
    setError(""); //

    // 3. CORRECTION : On envoie l'objet attendu par la Server Action avec les infos de Clerk
    const result = await saveUserRole({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: selectedRole
    });

    if (result.success) {
  // REDIRECTION CONDITIONNELLE SELON LE RÔLE
  if (selectedRole === "recruiter") {
    router.push(`/${lng}/employer`); // Direction l'espace entreprise
  } else {
    router.push(`/${lng}/seeker`); // Ou juste `/${lng}` pour les chercheurs d'emploi
  }
  router.refresh();
    } else {
      // On affiche le message d'erreur retourné par la base de données ou l'action
      setError(result.error || "Une erreur est survenue lors de l'enregistrement."); //
      setIsSubmitting(false); //
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-6 text-gray-900 font-sans">
      <div className="bg-white rounded-[24px] shadow-xl p-8 sm:p-12 max-w-2xl w-full border border-gray-100 text-center">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a1629]">
          Bienvenue sur World of Support !
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Pour commencer, quel est votre profil ?
        </p>

        {error && <p className="text-red-500 text-sm mt-4 bg-red-50 p-2 rounded-xl">{error}</p>}

        {/* GRILLE DE CHOIX DES RÔLES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          
          {/* CARTE : CHERCHEUR D'EMPLOI */}
          <button
            onClick={() => setSelectedRole("seeker")}
            className={`flex flex-col items-center p-6 rounded-2xl border text-center transition-all ${
              selectedRole === "seeker"
                ? "border-[#074e43] bg-[#effef7] ring-2 ring-[#074e43]/20"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              selectedRole === "seeker" ? "bg-[#074e43] text-white" : "bg-gray-100 text-gray-600"
            }`}>
              💼
            </div>
            <h3 className="font-bold text-base mt-4 text-[#0a1629]">Chercheur d'emploi</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Je souhaite postuler à des offres et développer mes compétences.
            </p>
          </button>

          {/* CARTE : RECRUTEUR */}
          <button
            onClick={() => setSelectedRole("recruiter")}
            className={`flex flex-col items-center p-6 rounded-2xl border text-center transition-all ${
              selectedRole === "recruiter"
                ? "border-[#074e43] bg-[#effef7] ring-2 ring-[#074e43]/20"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              selectedRole === "recruiter" ? "bg-[#074e43] text-white" : "bg-gray-100 text-gray-600"
            }`}>
              🤝
            </div>
            <h3 className="font-bold text-base mt-4 text-[#0a1629]">Recruteur</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Je souhaite publier des opportunités et trouver des talents.
            </p>
          </button>

        </div>

        {/* BOUTON DE SOUMISSION */}
        <button
          onClick={handleConfirm}
          disabled={!selectedRole || isSubmitting || !isLoaded}
          className={`w-full sm:w-auto px-10 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all mt-10 ${
            selectedRole && !isSubmitting && isLoaded
              ? "bg-[#074e43] text-white hover:bg-[#053a32] cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Enregistrement en cours..." : "Confirmer et continuer"}
        </button>

      </div>
    </div>
  );
}