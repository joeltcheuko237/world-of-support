"use client";

import { useState } from "react";
import { saveCompanyInfo } from "../actions";

interface CompanyInfoFormProps {
  t: any;
  userEmail: string;
  userId: string;
  setCompanyName: (name: string) => void;
}

export default function CompanyInfoForm({ t, userEmail, userId, setCompanyName }: CompanyInfoFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    officialName: "",
    website: "",
    address: "",
    phone: "",
    foundedDate: "",
    location: "Atlanta, USA",
    postalCode: ""
  });

  const handleSave = async () => {
    setLoading(true);
    const result = await saveCompanyInfo({
      userId,
      contactEmail: userEmail,
      ...formData
    });
    setLoading(false);

    if (result.success) {
      alert("Informations de l'entreprise enregistrées avec succès !");
    } else {
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-6">
        {t.tabInfo}
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.officialName}</label>
            <input
              type="text"
              placeholder="Ex: World of Support Inc."
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
              value={formData.officialName}
              onChange={(e) => {
                setFormData({ ...formData, officialName: e.target.value });
                setCompanyName(e.target.value || t.defaultCompanyName);
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.website}</label>
            <input
              type="text"
              placeholder="https://www.entreprise.com"
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.contactEmail}</label>
          <input
            type="email"
            value={userEmail}
            disabled
            className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.address}</label>
          <input
            type="text"
            placeholder="3605 Parker Rd."
            className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.phone}</label>
            <input
              type="text"
              placeholder="(405) 555-0128"
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.foundedDate}</label>
            <input
              type="date"
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-500"
              value={formData.foundedDate}
              onChange={(e) => setFormData({ ...formData, foundedDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.location}</label>
            <select 
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-700"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option>Atlanta, USA</option>
              <option>Paris, France</option>
              <option>Douala, Cameroun</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase">{t.postalCode}</label>
            <input
              type="text"
              placeholder="30301"
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#e1701a] text-gray-800"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-50 mt-8">
          <button 
            type="button" 
            onClick={() => setFormData({ officialName: "", website: "", address: "", phone: "", foundedDate: "", location: "Atlanta, USA", postalCode: "" })}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition"
          >
            {t.discard}
          </button>
          <button 
            type="button" 
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#e1701a] hover:bg-[#c95f13] text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-50"
          >
            {loading ? "..." : t.save}
          </button>
        </div>
      </div>
    </div>
  );
}