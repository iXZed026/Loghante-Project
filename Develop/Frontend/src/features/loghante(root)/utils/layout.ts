
export function getLayoutVisibility(
  pathname: string,
  locale: string,
) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  const isProfile =
    normalizedPathname.includes(`/${locale}/profile`);

  const isLoginOrRegister =
    normalizedPathname.includes(`/${locale}/login`) ||
    normalizedPathname.includes(`/${locale}/register`);

  const isPayment =
    normalizedPathname === `/${locale}/payment`;

  const isLoading =
    normalizedPathname.includes("/loading");

  const isShop =
    normalizedPathname.includes("/shop");

  const hideLayout =
    isProfile ||
    isLoginOrRegister ||
    isPayment ||
    isLoading ||
    isShop

  return {
    hideHeader: hideLayout,
    hideFooter: hideLayout,
  };
}


export function getHeaderBackground(
  pathname: string,
  locale: string,
  isScrolled: boolean,
) {
  const isHome =
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  const isCafeMenu =
    pathname.includes(`/${locale}/cafe-menu`);

  const isCafeOrHome =
    isHome || isCafeMenu;

  if (isHome || isCafeMenu) {
    return isScrolled
      ? "bg-crimson"
      : "bg-transparent";
  }

  return "bg-crimson";
}