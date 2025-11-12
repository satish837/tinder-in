import "./globals.css";
import "./lib/fontawesome";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "School of Swipe — Tinder India",
  description:
    "Crash course in dating smarter, feeling deeper, and keeping your chill — School of Swipe by Tinder.",
  openGraph: {
    title: "School of Swipe — Tinder India",
    description:
      "Crash course in dating smarter, feeling deeper, and keeping your chill — School of Swipe by Tinder.",
    url: "https://yourdomain.com/school-of-swipe",
    siteName: "Tinder",
    images: [
      {
        url: "/images/og-school-of-swipe.jpg",
        width: 1200,
        height: 630,
        alt: "School of Swipe — Tinder",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "School of Swipe — Tinder India",
    description:
      "Crash course in dating smarter, feeling deeper, and keeping your chill — School of Swipe by Tinder.",
    images: ["/images/og-school-of-swipe.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "School of Swipe",
    description:
      "Crash course in dating smarter, feeling deeper, and keeping your chill — School of Swipe by Tinder.",
    publisher: {
      "@type": "Organization",
      name: "Tinder",
      url: "https://www.tinder.com",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col items-center">
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}
