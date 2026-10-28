import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Team from "@/components/Team";
import FeaturedProjects from "@/components/FeaturedProject";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf9f5]">
      <Hero />
      <About />
      <Stats />
      <Services />
      <Team />
      <FeaturedProjects />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}