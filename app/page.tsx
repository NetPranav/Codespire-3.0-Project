import Navbar from "@/components/navbar";
import Hero from '@/components/hero';
import Carousal from '@/components/carousal';
import Footer from '@/components/footer';


export default function Home() {  

  return (
    <div className="h-full w-full ">
      <div id="heroBg" className="h-full w-full z-[-99] absolute inset-0">
        <video className="w-full h-full object-cover" src='/Hero-Video.mp4' autoPlay loop muted></video>
      </div>
      <Navbar/>
      <Hero/>
      <Carousal/>
      <Footer/>
    </div>
  );
}