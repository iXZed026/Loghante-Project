/**
 * Formats a date based on the given locale.
 *
 * en:
 * Returns day and month.
 * Example: "October 5"
 *
 * fa:
 * Returns day and month using the Persian calendar.
 * Example: "۵ مهر"
 */
export function formatMonthDay(
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
        ).format(date)
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            day: "numeric",
            month: "long",
        }
    ).format(date)
}


/**
 * Formats the month and year based on the given locale.
 *
 * en:
 * Example: "October 2026"
 *
 * fa:
 * Returns month and year using the Persian calendar.
 * Example: "مهر ۱۴۰۵"
 */
export function formatMonthYear(
    date: Date,
    locale: string
): string {

    return new Intl.DateTimeFormat(
        locale === "fa"
            ? "fa-IR-u-ca-persian"
            : "en-US",
        {
            month: "long",
            year: "numeric",
        }
    ).format(date)
}
