import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "@/context/ReactQueryContext";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/authProvider";
import { ChakraUiProvider } from "@/components/ui/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Layout");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ChakraUiProvider>
            <NextIntlClientProvider>
              <AuthProvider>
                <Toaster position="bottom-center" />
                {children}
              </AuthProvider>
            </NextIntlClientProvider>
          </ChakraUiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
