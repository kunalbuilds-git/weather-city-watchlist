import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <Navbar />

      {/* Page content */}
      <main className="max-w-3xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}