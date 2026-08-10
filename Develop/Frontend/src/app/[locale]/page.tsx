import Container from '@/components/shared/Container';
import Header from '@/features/loghante(root)/components/header/Header';

function Loghante() {
  return (
    <div>
      <Header />
      <Container>
        <div id="hero" className='h-[100vh] scroll-mt-[80px]'></div>
        <div id="2" className='h-[100vh] scrll-mt-[80]'></div>
      </Container>
    </div>
  )
}

export default Loghante