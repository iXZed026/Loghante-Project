import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Header from '@/features/loghante(root)/components/header/Header';

import { useTranslations } from 'next-intl';


function Loghante() {

  const t = useTranslations("hero");

  return (
    <div>
      <Header/>
      <div className='h-[100vh]'></div>
    </div>
  )
}

export default Loghante