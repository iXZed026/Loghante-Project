import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? "en";

    //Loghanteh(root)
    const LoghantehHeader = (
        await import(`../messages/${locale}/Loghante/header.json`)
    ).default;

    const LoghantehHero = (
        await import(`../messages/${locale}/Loghante/hero.json`)
    ).default;

    const LoghantehAbout = (
        await import(`../messages/${locale}/Loghante/about.json`)
    ).default;

    return {
        locale,
        messages: {
            LoghantehHeader,
            LoghantehHero,
            LoghantehAbout,
        },
    };
});