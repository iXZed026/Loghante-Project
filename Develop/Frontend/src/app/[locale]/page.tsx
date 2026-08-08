import Container from '@/components/shared/Container';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Header from '@/features/loghante(root)/components/header/Header';

import { useTranslations } from 'next-intl';


function Loghante() {

  const t = useTranslations("hero");

  return (
    <div>
      <Header />
      <Container>
        <div className='h-[100vh]'></div>
      </Container>
    </div>
  )
}

export default Loghante