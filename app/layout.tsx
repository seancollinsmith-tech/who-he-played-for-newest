import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who He Played For | SpannerSports",
  description:
    "A daily NBA career-path guessing game from SpannerSports. Guess every franchise a player appeared for.",
  applicationName: "Who He Played For",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/branding/favicon-512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Who He Played For | SpannerSports",
    description: "A daily NBA career-path guessing game from SpannerSports.",
    images: ["/branding/spanner-sports-logo-black-bg.jpeg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a14"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <p className="mx-auto max-w-2xl px-4 pb-8 text-center text-[10px] uppercase tracking-widest text-[#c7c6e0]/40">
          Who He Played For is an independent SpannerSports production and is not
          affiliated with, endorsed by, or sponsored by the NBA or any NBA team.
        </p>
      </body>
    </html>
  );
}
