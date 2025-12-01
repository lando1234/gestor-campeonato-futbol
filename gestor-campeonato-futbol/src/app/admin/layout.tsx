import AdminLayout from '@/components/AdminLayout';
import SessionProvider from '@/components/SessionProvider';

/**
 * Admin Section Layout
 * 
 * This layout wraps all pages under /admin route.
 * It applies the AdminLayout component which includes:
 * - Navigation bar with dropdown menus
 * - Main content container
 * - Footer
 * 
 * All pages in /admin/* will automatically use this layout
 * thanks to Next.js App Router's layout system.
 */
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AdminLayout>{children}</AdminLayout>
    </SessionProvider>
  );
}

