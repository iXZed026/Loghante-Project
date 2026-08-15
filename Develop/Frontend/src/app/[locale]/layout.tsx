import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/app/globals.css";
import { poppins, rozname, wulkan } from "@/font";


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  const messages = await getMessages();


  const direction = locale === "fa" ? "rtl" : "ltr";
  const font = locale === "fa"
    ? `${rozname.variable} text-lg font-semibold`
    : `${poppins.variable} ${wulkan.variable}`
  // ${ordibehesht.variable}
  return (
    <html
      lang={locale}
      dir={direction}
    >
      <body
        className={`${font}`}
        cz-shortcut-listen="true"
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



