'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitcher({ currentLng }: { currentLng: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLng: string) => {
    // Remplace le code de langue actuel par le nouveau dans l'URL
    const segments = pathname.split('/');
    segments[1] = newLng; // Le premier segment après le "/" est [lng]
    router.push(segments.join('/'));
  };

  return (
  <select
    value={currentLng}
    onChange={(e) => changeLanguage(e.target.value)}
    className="bg-transparent text-gray-700 font-medium text-[15px] focus:outline-none cursor-pointer hover:text-emerald-800 transition uppercase"
  >
    <option value="fr">FR</option>
    <option value="en">EN</option>
  </select>
);
}