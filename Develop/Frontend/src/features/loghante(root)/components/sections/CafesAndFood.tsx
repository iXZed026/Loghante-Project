import FadeUp from '@/components/animations/FadeUp'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { defaultTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import {
    cafesAndFoodsContainerVariant,
    cafesAndFoodsVariant,

} from '../../animations/loghante.variants'
import { cafesAndFoods } from '../../data/cafesAndFoods'
import CafesAndFoodsBox from '../CafesAndFoodsBox'

function CafesAndFood() {
    return (
        <section id="cafes-and-foods" className='loghante-section'>
            <div className='fcol gap-15 text-center mb-20'>
                <FadeUp
                    y={40}
                >
                    <h2 className={cn(
                        "font-wulkan",
                        "loghante-section-title",
                        "",
                    )}>
                        Cafes & Foods in Loghanteh
                    </h2>
                </FadeUp>
                <FadeUp
                    y={40}
                    transition={verySlowTransitionOut}
                >
                    <h5 className='text-lg'>
                        Discover food and drink menus from our cafes and food truck.
                    </h5>
                </FadeUp>
            </div>
            {/* CARDS */}
            <StaggerWrapper
                className='grid grid-cols-12 gap-10 overflow-hidden'
                variants={cafesAndFoodsContainerVariant}
            >
                {cafesAndFoods.map(CAF => (
                    <div
                        className={cn(
                            "lg:col-span-4 sm:col-span-6 col-span-12",
                            "w-full",
                        )}
                        key={CAF.id}
                    >
                        <FadeUp
                            variants={cafesAndFoodsVariant}
                            transition={defaultTransitionOut}
                        >
                            <CafesAndFoodsBox {...CAF} />
                        </FadeUp>
                    </div>
                ))}
            </StaggerWrapper>
        </section>
    )
}

export default CafesAndFood