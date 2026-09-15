/**
 * Formats a date based on the given locale.
 *
 * en:
 * Example: October 5, 2026
 *
 * fa:
 * Returns date using the Persian calendar.
 * Example: ۱۳ مهر ۱۴۰۵
 */
export function formatMonthDay(
    date: Date,
    locale: string
): string {

    return new Intl.DateTimeFormat(
        locale === "fa"
            ? "fa-IR-u-ca-persian"
            : "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date)
}


/**
 * Formats the month and year based on the given locale.
 *
 * en:
 * Example: October 2026
 *
 * fa:
 * Example: مهر ۱۴۰۵
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


/**
 * Formats time based on the given locale.
 *
 * en:
 * Example: 12:40 PM
 *
 * fa:
 * Example: ۱۲:۴۰
 */
export function formatTime(
    date: Date,
    locale: string
): string {

    return new Intl.DateTimeFormat(
        locale === "fa"
            ? "fa-IR"
            : "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: locale !== "fa",
        }
    ).format(date)
}