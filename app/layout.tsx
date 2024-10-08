import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from './_components/footer';
import { AuthProvider } from './_providers/auth';
import { Toaster } from './_components/ui/sonner';

export const metadata: Metadata = {
  title: 'Agendamento Barbearia',
  description: 'Agende já seu horário!',
};

const inter_font = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter_font.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
