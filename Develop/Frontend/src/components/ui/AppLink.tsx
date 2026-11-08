"use client";

import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";
import { CSSProperties, ReactNode } from "react";

interface IAppLinkProps extends Omit<LinkProps, "href"> {
    children?: ReactNode;
    href: string;
    className?: string;
    style?: CSSProperties;
}

function AppLink({
    children,
    href,
    className,
    style,
    ...props
}: IAppLinkProps) {
    const locale = useLocale();

    return (
        <Link
            href={`/${locale}/${href.replace(/^\/+/, "")}`}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </Link>
    );
}

export default AppLink;
