import { useLocale } from 'next-intl';
import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface IAppLinkProps extends LinkProps {
    children?: ReactNode;
    href: string;
}

function AppLink({
    children,
    href,
    ...props
}: IAppLinkProps) {

    const locale = useLocale() 

    return <Link
        href={`/${locale}/${href}`}
        {...props}
    >
        {children}
    </Link>


}

export default AppLink