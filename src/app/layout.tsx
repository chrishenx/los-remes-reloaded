import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StyledAntdComponentsRegistry } from '@/lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LosRemes Reloaded',
  description: 'Los Remedios rock climbing are routes catalog app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledAntdComponentsRegistry>
          {children}
        </StyledAntdComponentsRegistry>
      </body>
    </html>
  );
}
