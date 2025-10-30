import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VideoBackground from '../components/VideoBackground'
// import Services from '../components/Services'
// import Projects from '../components/Projects'
// import FoundersSection from '../components/FoundersSection'
// import ContactSection from '../components/ContactSection'

export default function HomePage() {
  return (
    <div className="bg-dark text-light">
      {/* Landing page section with video background */}
      <div className="relative h-screen overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 h-full">
          <Navbar />
          <Hero />
        </div>
      </div>
      
      {/* Rest of the page with solid background */}
      <div className="relative bg-dark">
        {/* <Services />
        <FoundersSection />
        <Projects />
        <ContactSection /> */}
      </div>
    </div>
  )
}