import AboutHero from "@/components/AboutHero";
import MissionHighlights from "@/components/MissionHighlights";
import TeamCarousel from "@/components/TeamCarousel";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { lng } = await params;

  const messages = (await import(`../../../messages/${lng}.json`)).default;

  return (
    <main className="bg-white min-h-screen text-gray-900 antialiased">
      
      {/* 1. Le tout nouveau Hero asymétrique fidèle à SharedScreenshot_8.jpg */}
      <AboutHero lng={lng} t={messages.About.hero} />

      {/* 2. Les 3 piliers de la mission */}
      <MissionHighlights t={messages.About.mission} />
      
      {/* 3. La carousel d'équipe */}
      <TeamCarousel t={messages.About.team} />
    </main>
  );
}