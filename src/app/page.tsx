import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProject"; // ✅ Sirf yeh pehla wala rakhein
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbf9f5]">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <FeaturedProjects /> {/* ✅ Sirf pehla wala rahega */}
      <Team />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}