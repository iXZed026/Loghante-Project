export function getLayoutVisibility(
  pathname: string,
  locale: string,
) {
  const isProfile =
    pathname.includes(`/${locale}/profile`);

  const isLoginOrRegister =
    pathname.includes(`/${locale}/login`) ||
    pathname.includes(`/${locale}/register`);

  return {
    hideHeader: isProfile || isLoginOrRegister,
    hideFooter: isProfile || isLoginOrRegister,
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
    pathname === `/${locale}/cafe-menu`;

  const isCafeOrHome =
    isHome || isCafeMenu;

  if (isHome || isCafeMenu) {
    return isScrolled
      ? "bg-crimson"
      : "bg-transparent";
  }

  return "bg-crimson";
}