import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from '@/components/providers/session-provider'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tenet MCN - 블록체인 크리에이터 생태계",
  description: "테넷은 세분화된 시청자의 취향과 가치를 존중하며, 다양한 블록체인 분야의 크리에이터와 함께 성장하는 것을 목표로 합니다.",
  keywords: ["Tenet MCN", "블록체인", "크리에이터", "MCN", "트레이딩", "방송인", "트레이더"],
  authors: [{ name: "Tenet MCN" }],
  creator: "Tenet MCN",
  publisher: "Tenet MCN",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://te-net.com",
    title: "Tenet MCN - 블록체인 크리에이터 생태계",
    description: "테넷은 세분화된 시청자의 취향과 가치를 존중하며, 다양한 블록체인 분야의 크리에이터와 함께 성장하는 것을 목표로 합니다.",
    siteName: "Tenet MCN",
    images: [
      {
        url: "/bull.png",
        width: 1200,
        height: 630,
        alt: "Tenet MCN Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenet MCN - 블록체인 크리에이터 생태계",
    description: "테넷은 세분화된 시청자의 취향과 가치를 존중하며, 다양한 블록체인 분야의 크리에이터와 함께 성장하는 것을 목표로 합니다.",
    images: ["/bull.png"],
    creator: "@TenetMCN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Google Search Console 인증 코드
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
