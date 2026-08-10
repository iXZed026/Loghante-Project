import Container from '@/components/shared/Container';
import Header from '@/features/loghante(root)/components/header/Header';
import AboutMuseums from '@/features/loghante(root)/components/sections/AboutMuseums';
import HeroSection from '@/features/loghante(root)/components/sections/HeroSection';

function Loghante() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Container>
        <AboutMuseums />
      </Container>
    </div>
  )
}

export default Loghante