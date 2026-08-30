import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? "en";

    //Global
    const common = (
        await import(`../messages/${locale}/common.json`)
    ).default;

    const footer = (
        await import(`../messages/${locale}/footer.json`)
    ).default;

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

    const LoghantehMuseums = (
        await import(`../messages/${locale}/Loghante/museums.json`)
    ).default;

    const LoghantehShop = (
        await import(`../messages/${locale}/Loghante/shop.json`)
    ).default;

    const LoghantehEventsAndCourses = (
        await import(`../messages/${locale}/Loghante/events-and-courses.json`)
    ).default;

    const LoghantehCinemaAndTheaters = (
        await import(`../messages/${locale}/Loghante/cinema-and-theaters.json`)
    ).default;
    const LoghantehConferenceHall = (
        await import(`../messages/${locale}/Loghante/conference-hall.json`)
    ).default;
    const LoghantehVirtualTour = (
        await import(`../messages/${locale}/Loghante/virtual-tour.json`)
    ).default;

    //Auth
    const authRegister = (
        await import(`../messages/${locale}/auth/register.json`)
    ).default;

    const authLogin = (
        await import(`../messages/${locale}/auth/login.json`)
    ).default;

    const authShared = (
        await import(`../messages/${locale}/auth/shared.json`)
    ).default;

    const authRoutes = (
        await import(`../messages/${locale}/auth/routes.json`)
    ).default;

    const authForgotPassword = (
        await import(`../messages/${locale}/auth/forgot-password.json`)
    ).default;

    const authVerify = (
        await import(`../messages/${locale}/auth/verify.json`)
    ).default;
    const authNewPassword = (
        await import(`../messages/${locale}/auth/new-password.json`)
    ).default;

    //Profile
    const profileDashboard = (
        await import(`../messages/${locale}/profile/dashboard-links.json`)
    ).default;

    const profileDashboardPage = (
        await import(`../messages/${locale}/profile/profile-dashboard-page.json`)
    ).default;

    const profileEdit = (
        await import(`../messages/${locale}/profile/edit-profile-page.json`)
    ).default;

    //Museums Tour
    const museumsTour = (
        await import(`../messages/${locale}/museums-tour/museums-tour.json`)
    ).default;

    return {
        locale,
        messages: {
            common,
            footer,
            //Loghanteh-root
            LoghantehHeader,
            LoghantehHero,
            LoghantehAbout,
            LoghantehMuseums,
            LoghantehShop,
            LoghantehEventsAndCourses,
            LoghantehCinemaAndTheaters,
            LoghantehConferenceHall,
            LoghantehVirtualTour,
            //Auth
            authRegister,
            authShared,
            authRoutes,
            authLogin,
            authForgotPassword,
            authVerify,
            authNewPassword,
            //Profile
            profileDashboard,
            profileDashboardPage,
            profileEdit,
            //Museums Tour
            museumsTour
        },
    };
});