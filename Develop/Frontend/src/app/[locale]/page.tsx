import Container from '@/components/shared/Container';
import "@/features/loghante(root)/styles/utilities.css"
import Header from '@/features/loghante(root)/components/header/Header';
import AboutMuseums from '@/features/loghante(root)/components/sections/AboutMuseums';
import HeroSection from '@/features/loghante(root)/components/sections/HeroSection';
import MuseumsSection from '@/features/loghante(root)/components/sections/MuseumsSection';
import ShopSection from '@/features/loghante(root)/components/sections/ShopSection';
import EventsAndCoursesSection from '@/features/loghante(root)/components/sections/EventsAndCoursesSection';


function Loghante() {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <HeroSection />
      <Container>
        <AboutMuseums />
        <MuseumsSection />
        <EventsAndCoursesSection />
        <ShopSection />
      </Container>
    </div>
  )
}

export default Loghante