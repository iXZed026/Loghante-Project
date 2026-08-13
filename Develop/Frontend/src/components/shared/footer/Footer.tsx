import Container from '../Container'
import { cn } from '@/lib/utils/cn'
import FooterSummery from './FooterSummery'
import FooterQuickAccess from './FooterQuickAccess'
import FooterContact from './FooterContact'
import FooterLocation from './FooterLocation'
import { useTranslations } from 'next-intl'

function Footer() {

    const t = useTranslations("footer")

    return (
        <footer className={cn(
            "bg-crimson",
            "text-white-utility"
        )}>
            <Container>
                <div className={cn(
                    "grid grid-cols-12 md:gap-10 gap-y-20",
                    "py-15",
                )}>
                    {/* Summary */}
                    <FooterSummery t={t} />
                    {/* Quick Access */}
                    <FooterQuickAccess t={t} />
                    {/* Contact & Address */}
                    <FooterContact t={t} />
                    {/* Location */}
                    <FooterLocation t={t} />
                </div>
            </Container>
            {/* Policy */}
            <div className='bg-[#3A3A3A] py-2 text-center'>
                <Container>
                    <span className='md:text-[16px] text-xs'>
                        All rights reserved for the Loghanteh Cultural and Historical Complex.
                    </span>
                </Container>
            </div>
        </footer>
    )
}

export default Footer