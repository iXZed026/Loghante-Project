import FadeUp from '@/components/animations/FadeUp'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { defaultTransitionOut, slowTransitionIn, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { MuseumCardVariant, MuseumsCardContainerVariant } from '../../animations/loghante.variants'
import MuseumsBox from '../MuseumsBox'
import { museumParts } from '../../data/museumParts'

function MuseumsSection() {

  const t = useTranslations("LoghantehMuseums")

  return (
    <div id="museums" className='px-20 loghante-section'>
      <div className='fcol gap-15 text-center mb-20'>
        <FadeUp
          y={40}
        >
          <h2 className={cn(
            "font-wulkan",
            "loghante-section-title",
            "",
          )}>
            {t("title")}
          </h2>
        </FadeUp>
        <FadeUp
          y={40}
          transition={verySlowTransitionOut}
        >
          <h5 className='text-lg'>{t("subtitle")}</h5>
        </FadeUp>
      </div>
      {/* CARDS */}
      <StaggerWrapper
        className='grid grid-cols-12 gap-10 overflow-hidden'
        variants={MuseumsCardContainerVariant}
      >
        {museumParts.map(museum => (
          <div className='col-span-4 w-full' key={museum.id}>
            <FadeUp
              variants={MuseumCardVariant}
              transition={defaultTransitionOut}
            >
              <MuseumsBox {...museum} />
            </FadeUp>
          </div>
        ))}
      </StaggerWrapper>
    </div >
  )
}

export default MuseumsSection