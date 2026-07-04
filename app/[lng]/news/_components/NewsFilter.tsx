"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface NewsFilterProps {
  t: any;
  currentCategory: string;
}

export default function NewsFilter({ t, currentCategory }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 mb-10">
      {[
        { id: "all", label: t.all || "Tout" },
        { id: "blog", label: t.blogs || "Blogs" },
        { id: "annonce", label: t.announcements || "Annonces" },
      ].map((btn) => (
        <button
          key={btn.id}
          onClick={() => handleFilter(btn.id)}
          className={`px-6 py-2 rounded-full text-xs font-bold transition border ${
            currentCategory === btn.id
              ? "bg-[#e1701a] border-[#e1701a] text-white shadow-md"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}