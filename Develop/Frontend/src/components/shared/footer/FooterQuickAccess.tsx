import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'

function FooterQuickAccess() {
    return (
        <div
            className={
                cn(
                    "xl:col-span-3 md:col-span-4 col-span-6",
                    "fcol gap-10",
                )
            }
        >
            <div>
                <h5 className='font-semibold md:text-lg '>
                    Quick Access
                </h5>
            </div>
            <div>
                <ul className='fcol gap-4 md:text-[16px] text-sm'>
                    <li
                    >
                        <AppLink
                            href='#hero'
                            className='transition-all hover:opacity-50'
                        >
                            Home Page
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='#about'
                            className='transition-all hover:opacity-50'
                        >
                            About Museum
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='#museums'
                            className='transition-all hover:opacity-50'
                        >
                            Museum
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='/shop'
                            className='transition-all hover:opacity-50'
                        >
                            Shop
                        </AppLink>
                    </li>
                    <li
                    >
                        <AppLink
                            href='/virtual-tour'
                            className='transition-all hover:opacity-50'
                        >
                            Virtual Tour
                        </AppLink>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default FooterQuickAccess