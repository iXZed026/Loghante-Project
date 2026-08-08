import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

import { useTranslations } from 'next-intl';


function Loghante() {

  const t = useTranslations("hero");

  return (
    <div>
      Loghante
    </div>
  )
}

export default Loghante