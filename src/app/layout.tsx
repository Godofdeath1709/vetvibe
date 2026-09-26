import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CampusProvider } from '@/context/CampusContext';

export const metadata: Metadata = {
  title: 'CampusOne: Unified Digital Campus Platform',
  description: 'Centralized institutional portal for students, faculty, and administrators.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'CampusOne: Unified Digital Campus Platform',
    description: 'Centralized institutional portal for students, faculty, and administration.',
    siteName: 'CampusOne',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f4f6f8] text-[#0f172a]">
        <AuthProvider>
          <CampusProvider>
            {children}
          </CampusProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
