import Navbar from './Navbar';

/**
 * AdminLayout Component
 * 
 * Main layout wrapper for all admin pages.
 * Provides consistent structure with:
 * - Top navigation bar
 * - Main content area for page-specific content
 * 
 * This component uses the children prop to render page content,
 * allowing it to wrap any admin page dynamically.
 * 
 * @param children - The page content to be rendered
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Fixed at top */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 
          This container provides consistent padding and max-width
          for all admin pages while allowing them to control their own content
        */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>

      {/* Footer (Optional - can be added later) */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Sistema de Gestión de Campeonato de Fútbol - Panel de Administración
          </p>
        </div>
      </footer>
    </div>
  );
}

