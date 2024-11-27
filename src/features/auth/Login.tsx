import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authState } from './authState';
import { useSetRecoilState } from 'recoil';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const API_URL = 'https://gymofart.azurewebsites.net/api';

  // Kiểm tra trạng thái đăng nhập khi tải lại trang
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setAuthState({ isAuthenticated: true });
      navigate('/'); // Điều hướng đến trang chính nếu đã đăng nhập
    }
  }, [navigate, setAuthState]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/Auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Login step 1 successful:', response.data);
      localStorage.setItem('accountId', response.data.accountId);
      setStep(2);
      toast.success('OTP sent to your email.');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/Auth/confirm-otp-login?inputOtp=${otp}`,
        {},
        {
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('OTP validation successful:', response.data);
      toast.success('Login successful!');

      // Cập nhật trạng thái đăng nhập
      setAuthState({ isAuthenticated: true });

      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('isAuthenticated', 'true');

      if (response.data.role === 'Admin') {
        navigate('/admin');
      } else {
        // Điều hướng tới trang chính
        navigate('/');
      }
    } catch (error) {
      console.error('OTP validation failed:', error);
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch bg-[#1B2644] rounded-lg overflow-hidden shadow-xl">
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center space-y-8">
        <h2 className="text-4xl font-bold text-[#E73C3C]">Log In</h2>
        {step === 1 ? (
          <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
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
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#E73C3C] hover:bg-[#ff5454] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E73C3C]"
            >
              Log In
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleOtpSubmit}
            className="w-full max-w-md space-y-6"
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-white text-base font-medium mb-2"
              >
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 bg-[#212A47] text-white text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C3C] placeholder-gray-400"
                placeholder="Enter your OTP"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#E73C3C] hover:bg-[#ff5454] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E73C3C]"
            >
              Validate OTP
            </button>
          </form>
        )}
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
