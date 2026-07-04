"use client";

import { useState } from "react";
import { saveSeekerProfile } from "@/app/[lng]/employee/_components/actions";

interface SeekerProfileFormProps {
  t: any;
  userId: string;
  userEmail: string;
  setProfileName: (name: string) => void;
}

export default function SeekerProfileForm({ t, userId, userEmail, setProfileName }: SeekerProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    professionalTitle: "",
    bio: "",
    skills: "",
    qualifications: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await saveSeekerProfile({ userId, ...formData });
    setLoading(false);

    if (result.success) {
      alert(t.profileSuccess || "Profil enregistré avec succès !");
    } else {
      alert(t.profileError || "Une erreur est survenue.");
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-6">{t.tabProfile || "Mon Profil"}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.fullName || "Nom Complet"}</label>
          <input
            type="text"
            required
            className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setProfileName(e.target.value || "Mon Profil");
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.professionalTitle || "Titre Professionnel"}</label>
          <input
            type="text"
            className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
            value={formData.professionalTitle}
            onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.contactEmail || "Email"}</label>
        <input type="email" value={userEmail} disabled className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed" />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.skills || "Compétences"}</label>
        <input
          type="text"
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.qualifications || "Qualifications / Diplômes"}</label>
        <textarea
          rows={3}
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800 resize-none"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.bio || "Biographie"}</label>
        <textarea
          rows={3}
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800 resize-none"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">GitHub</label>
          <input type="url" className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">LinkedIn</label>
          <input type="url" className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800" value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-50 mt-8">
        <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-2.5 bg-[#e1701a] hover:bg-[#c95f13] text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-50">
          {loading ? "..." : t.save || "Sauvegarder"}
        </button>
      </div>
    </form>
  );
}