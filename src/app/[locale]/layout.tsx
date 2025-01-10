import { CommonProvider } from '@/contexts/CommonProvider';
import { routing } from '@/libs/i18nNavigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/styles/global.css';
import '@/css/satoshi.css';

import '@/css/style.css';

// import { request } from '@playwright/test';

// export function generateStaticParams() {
//   return routing.locales.map(locale => ({ locale }));
// }

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <CommonProvider>
            {props.children}
          </CommonProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
