"use client";

import { useState } from "react";
import { publishJobOffer } from "../actions";

interface JobPublishFormProps {
  t: any;
  lng: string;
  userId: string;
}

export default function JobPublishForm({ t, lng, userId }: JobPublishFormProps) {
  const [loading, setLoading] = useState(false);
  const [jobForm, setJobForm] = useState({ title: "", description: "", qualifications: "" });

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await publishJobOffer({
      userId,
      ...jobForm
    });

    setLoading(false);

    if (result.success) {
      alert(lng === "fr" ? "Offre créée avec succès !" : "Job posted successfully!");
      setJobForm({ title: "", description: "", qualifications: "" });
    } else {
      alert(lng === "fr" ? "Erreur lors de la publication." : "Error during publication.");
    }
  };

  return (
    <form onSubmit={handleJobSubmit} className="space-y-5">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-6">{t.publishTitle}</h1>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.jobTitle}</label>
        <input
          type="text"
          required
          value={jobForm.title}
          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
          placeholder={lng === "fr" ? "Ex: Développeur Fullstack React" : "e.g. Fullstack React Developer"}
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.jobDescription}</label>
        <textarea
          required
          rows={4}
          value={jobForm.description}
          onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
          placeholder={lng === "fr" ? "Décrivez les missions principales du poste..." : "Describe the core missions..."}
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.jobQualifications}</label>
        <textarea
          required
          rows={3}
          value={jobForm.qualifications}
          onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
          placeholder={lng === "fr" ? "Ex: 3 ans d'expérience..." : "e.g. 3 years experience..."}
          className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800 resize-none"
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto px-8 py-2.5 bg-[#e1701a] hover:bg-[#c95f13] text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-50"
        >
          {loading ? "..." : t.btnPublishJob}
        </button>
      </div>
    </form>
  );
}