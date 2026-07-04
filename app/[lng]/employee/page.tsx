"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SeekerProfileForm from "@/app/[lng]/employee/_components/SeekerProfileForm";
import MyApplicationsList from "@/app/[lng]/employee/_components/MyApplicationsList";

// 📦 Importations statiques globales
import frMessages from "../../../messages/fr.json";
import enMessages from "../../../messages/en.json";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default function EmployeePage({ params }: PageProps) {
  const { lng } = use(params);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Ciblage de la clé de traduction "employee"
  const messages = lng === "en" ? enMessages : frMessages;
  const t = messages.employee;

  const [profileName, setProfileName] = useState("Mon Profil");
  const [avatar, setAvatar] = useState(""); 
  const [activeTab, setActiveTab] = useState("profile"); 

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/${lng}/register`);
    }
  }, [isLoaded, isSignedIn, router, lng]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center text-gray-600 font-sans">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-gray-900">
      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        
        {/* SIDEBAR GAUCHE */}
        <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col items-center">
          <div className="relative w-24 h-24 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden shadow-inner mb-3">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="text-3xl text-gray-400">👤</div>
            )}
            <label className="absolute bottom-1 right-1 bg-[#e1701a] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md cursor-pointer hover:bg-[#c95f13] transition">
              ✏️
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => { 
                  if (e.target.files?.[0]) setAvatar(URL.createObjectURL(e.target.files[0])); 
                }} 
              />
            </label>
          </div>

          <h2 className="font-bold text-gray-800 text-center text-base tracking-tight mb-8">
            {profileName}
          </h2>

          <div className="w-full flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 font-semibold text-xs py-3 px-4 rounded-xl transition ${
                activeTab === "profile" ? "bg-[#fff3eb] text-[#e1701a]" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm">👤</span>
              <span>{t.tabProfile}</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-3 font-semibold text-xs py-3 px-4 rounded-xl transition ${
                activeTab === "applications" ? "bg-[#fff3eb] text-[#e1701a]" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm">💼</span>
              <span>{t.tabApplications}</span>
            </button>

            <button className="w-full flex items-center gap-3 font-semibold text-xs py-3 px-4 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition mt-auto">
              <span className="text-sm">🚪</span>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        {/* CONTENU DROITE DYNAMIQUE */}
        <div className="flex-1 p-6 sm:p-10 bg-white">
          {activeTab === "profile" ? (
            <SeekerProfileForm 
              t={t}
              userId={user?.id || ""}
              userEmail={user?.emailAddresses[0]?.emailAddress || ""} 
              setProfileName={setProfileName} 
            />
          ) : (
            <MyApplicationsList t={t} userId={user?.id || ""} />
          )}
        </div>

      </div>
    </div>
  );
}