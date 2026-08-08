import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

interface IButtonProps {
  className?: string;
  children: ReactNode;
}

function Button({
  children,
  className,
}: IButtonProps) {
  return (
    <button
      className={cn(
        "button click-scale", //utility
        "py-1 px-3",
        "rounded-lg",
        "text-white-utility",
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button