import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // On récupère le paramètre de langue 'lng' depuis l'URL
  const { lng } = await params;

  return (
    <>
      {/* Notre Navbar dynamique à qui on passe la langue actuelle */}
      <Navbar lng={lng} />
      
      {/* Le contenu principal de chaque page prend tout l'espace disponible */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Notre Footer global */}
      <Footer />
    </>
  );
}