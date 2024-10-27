import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

export default function CommonLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-white">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <div className="mt-10" style={{ width: '80%', margin: '0 auto' }}>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-200px)]" style={{ width: '80%', margin: '0 auto' }}>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
