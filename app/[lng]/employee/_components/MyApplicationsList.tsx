"use client";

import { useEffect, useState } from "react";
import { getMyApplications } from "@/app/[lng]/employee/_components/actions";

interface MyApplicationsListProps {
  t: any;
  userId: string;
}

export default function MyApplicationsList({ t, userId }: MyApplicationsListProps) {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getMyApplications(userId);
      setApps(data);
      setLoading(false);
    }
    loadData();
  }, [userId]);

  if (loading) return <div className="text-sm text-gray-500">{t.loading || "Chargement..."}</div>;

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-6">{t.tabApplications || "Mes Candidatures"}</h1>
      {apps.length === 0 ? (
        <p className="text-sm text-gray-400">{t.noApplications || "Aucune candidature pour le moment."}</p>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{app.job_title}</h3>
                <p className="text-xs text-gray-400">{app.company_name || "Entreprise Anonyme"}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                app.status === "Accepté" ? "bg-green-100 text-green-700" : app.status === "Refusé" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}