import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        to="/"
        className="bg-[#f5a97f] text-primary px-6 py-3 rounded-full text-base font-medium transition duration-300 ease-in-out hover:bg-[#f7c5a5]"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
