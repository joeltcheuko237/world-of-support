import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import CategoriesGrid from "@/components/CategoriesGrid";
import JobOfTheDay from "@/components/JobOfTheDay";
import Testimonials from "@/components/Testimonials";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lng } = await params;

  // Chargement des traductions
  const messages = (await import(`../../messages/${lng}.json`)).default;

  return (
    <main>
      <Hero lng={lng} t={messages.Home} />
      {/* Tu pourras ajouter d'autres sections ici plus tard sans surcharger ce fichier */}
      <TrustedBy text={messages.Home.trustedBy} />
      <HowItWorks lng={lng} t={messages.Home.howItWorks} />
      <CategoriesGrid lng={lng} t={messages.Home.categories} />
      <JobOfTheDay lng={lng} t={messages.Home.jobOfTheDay} />
      <Testimonials t={messages.Home.testimonials} />
    </main>
  );
}