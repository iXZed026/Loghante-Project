import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? "en";

    const header = (
        await import(`../messages/${locale}/Loghante/header.json`)
    ).default;

    const hero = (
        await import(`../messages/${locale}/Loghante/hero.json`)
    ).default;

    const about = (
        await import(`../messages/${locale}/Loghante/about.json`)
    ).default;

    return {
        locale,
        messages: {
            header,
            hero,
            about,
        },
    };
});