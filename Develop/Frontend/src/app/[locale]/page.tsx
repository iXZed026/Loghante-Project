import Container from '@/components/shared/Container';
import Header from '@/features/loghante(root)/components/header/Header';
import HeroSection from '@/features/loghante(root)/components/sections/HeroSection';

function Loghante() {
  return (
    <div>
      <Header />
      <Container>
        <HeroSection />
        <div id="2" className='h-[100vh] scrll-mt-[80]'></div>
      </Container>
    </div>
  )
}

export default Loghante