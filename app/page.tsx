'use client';

import Navigation from "@/components/nav/page";
import About from "@/components/about/page";
import Hero from "@/components/hero/page";
import Features from "@/components/features/page";
import Pricing from "@/components/pricing/page";
import Contact from "@/components/contact/page";




const Home = () => {
  return (
    <div className='w-full'>
      
      <section id="home" className="w-full lg:px-[40px] sm:px-0">
        <Navigation />
        <Hero/>
      </section>

      {/* about section */}
      <section id="about" className="w-full ">
        <About/>
        <Features/>
        <Pricing/>
      </section>

      {/* contact section */}
      <section id="contact" className="w-full">
        <Contact/>
      </section>

    </div>
  )
}

export default Home
