import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

export default function CommonLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-white">
      <Header />
      <div className="container mx-auto mt-10">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
