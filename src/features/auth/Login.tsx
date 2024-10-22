import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch bg-[#1B2644] rounded-lg overflow-hidden shadow-xl">
      {/* Login Form Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center space-y-8">
        <h2 className="text-4xl font-bold text-[#E73C3C]">Log In</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-white text-base font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-[#212A47] text-white text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C3C] placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-white text-base font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 bg-[#212A47] text-white text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C3C] placeholder-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#E73C3C] focus:ring-[#E73C3C] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-base text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-base">
              <Link
                to="/forgot-password"
                className="font-medium text-[#E73C3C] hover:text-[#ff5454]"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#E73C3C] hover:bg-[#ff5454] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E73C3C]"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-base">
              <span className="px-4 bg-[#1B2644] text-gray-400">
                Or log in with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <button className="w-full flex items-center justify-center px-6 py-3 border border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-400 bg-[#212A47] hover:bg-[#2A375C]">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="#4285F4"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>
            </div>
            <div>
              <button className="w-full flex items-center justify-center px-6 py-3 border border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-400 bg-[#212A47] hover:bg-[#2A375C]">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-base text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/auth/sign-up"
            className="font-medium text-[#E73C3C] hover:text-[#ff5454]"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Logo Section */}
      <div className="w-full md:w-1/2 bg-[#212A47] flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto bg-[#37B6BD] rounded-full flex items-center justify-center">
            <div className="w-36 h-36 bg-[#FFF3E0] rounded-full"></div>
          </div>
          <h2 className="mt-8 text-6xl font-bold">
            <span className="text-[#E73C3C]">Go</span>
            <span className="text-[#37B6BD]">A</span>
          </h2>
          <p className="text-[#37B6BD] text-3xl">Gym of Art</p>
        </div>
      </div>
    </div>
  );
}
