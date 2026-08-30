export function formatDate(
    date: Date,
    locale: string
): string {

    if (locale === "fa") {
        return new Intl.DateTimeFormat(
            "fa-IR-u-ca-persian",
            {
                day: "numeric",
                month: "long",
            }
        ).format(date);
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            day: "numeric",
            month: "long",
        }
    ).format(date);
}