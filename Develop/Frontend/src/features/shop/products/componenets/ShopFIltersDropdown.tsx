'use client'

import { IMuseumPart } from '@/features/loghante(root)/data/museumParts'
import { IProductCategory } from '../../data/productCategories'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale } from 'next-intl'
import { FaAngleDown } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import useActive from '@/hooks/useActive'
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import Button from '@/components/ui/Button'

interface IShopFIltersDropdown {
  title: string
  items: IProductCategory[] | IMuseumPart[]
  selectedIds: string[]
  onToggle: (id: string | number) => void
}

function ShopFIltersDropdown({
  title,
  items,
  selectedIds,
  onToggle,
}: IShopFIltersDropdown) {
  const locale = useLocale()
  const [isOpen, , , toggleOpen] = useActive(true)

  return (
    <div>
      {/* Header */}
      <Button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between',
          'text-black-utility',
          'text-left',
          'border border-[var(--black-color)]/25',
          'p-5',

        )}
      >
        <span className="font-wulkan text-2xl font-bold">
          {title}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex shrink-0"
        >
          <FaAngleDown size={22} />
        </motion.span>
      </Button>

      {/* Options */}
      <AnimatePresenceWrapper isActive={isOpen}>
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.25, ease: 'easeInOut' },
            opacity: { duration: 0.2, ease: 'easeInOut' },
          }}
          className="fcol gap-y-4 overflow-hidden px-6 py-5"
        >
          {items.map((item) => {
            const id = String(item.id)
            const isChecked = selectedIds.includes(id)

            return (
              <li key={item.id}>
                <label
                  className={cn(
                    'flex cursor-pointer items-center gap-3',
                    'select-none',
                    'transition-transform duration-150',
                    'active:scale-[0.99]',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(item.id)}
                    className={cn(
                      'size-5 shrink-0 cursor-pointer',
                      'appearance-none rounded border border-black/40',
                      'bg-white',
                      'transition-colors duration-150',
                      'checked:border-[var(--blue-color)]',
                      'checked:bg-[var(--blue-color)]',
                      'checked:after:flex',
                      'checked:after:h-full',
                      'checked:after:items-center',
                      'checked:after:justify-center',
                      "checked:after:content-['✓']",
                      'checked:after:text-sm',
                      'checked:after:font-bold',
                      'checked:after:text-white',
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-[var(--blue-color)]',
                      'focus-visible:ring-offset-2',
                    )}
                  />

                  <span className="font-600">
                    {getLocalizedValue(item.name, locale)}
                  </span>
                </label>
              </li>
            )
          })}
        </motion.ul>
      </AnimatePresenceWrapper>
    </div>
  )
}

export default ShopFIltersDropdown
