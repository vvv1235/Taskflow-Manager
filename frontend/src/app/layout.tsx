import type { Metadata } from 'next';
import { Caveat, Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/layout/Sidebar';

// Tipografia cursiva/desenhada para títulos e anotações estilo diário
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' });
// Tipografia limpa para boa legibilidade em blocos grandes de texto
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });

export const metadata: Metadata = {
  title: 'TaskFlow Notebook',
  description: 'Manage your tasks efficiently with an elegant interface.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} ${caveat.variable} font-sans bg-notebook-paper text-[#2C3E50] overflow-hidden`}>
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1 h-full overflow-y-auto w-full p-4 md:p-8 notebook-lines relative">
            <div className="max-w-7xl mx-auto relative z-10">
              {children}
            </div>
          </main>
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFDF9',
              color: '#334155',
              border: '2px solid #E2E8F0',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', // Efeito desenhado à mão
              boxShadow: '2px 4px 10px rgba(0,0,0,0.05)',
              fontFamily: 'var(--font-nunito)'
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#FFFDF9' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#FFFDF9' },
            }
          }}
        />
      </body>
    </html>
  );
}
