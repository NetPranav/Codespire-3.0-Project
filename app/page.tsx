import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Carousal from "@/components/carousal";
import Footer from "@/components/footer";
import AnimatedSections from "@/components/features";
import HowItWorks from "@/components/howItworks";
import FAQ from '@/components/faq'
import Goals from "@/components/goals";
import Comp from "@/components/Temp-ad";

export default function Home() {
  return (
    <div className="h-full w-full bg-[black]">
      <div className="h-screen w-screen fixed bg-[black] z-[-99]"></div>
      <div id="heroBg" className="h-full w-full z-3 absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/Hero-Video.mp4"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <Navbar />
      <Hero />
      <Carousal />
      <HowItWorks />
      <Comp />
      <FAQ/>
      {/* <div className="">
        <AnimatedSections/>
      </div> */}
      <Footer />
    </div>
  );
}
