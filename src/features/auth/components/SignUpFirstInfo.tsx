import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  emailState,
  usernameState,
} from '../../../shared/components/atoms/authState';

interface SignUpPart1Props {
  onNext: () => void;
}

export function SignUpPart1({ onNext }: SignUpPart1Props) {
  const [email, setEmail] = useRecoilState(emailState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      /^[A-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/i.test(email) && username !== ''
    );
  }, [email, username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-red-500 font-bold text-xl">GoA</span>
          <span className="text-[#7dd3fc] text-sm">Gym of Art</span>
        </div>
        <h2 className="text-5xl font-bold text-red-500">Sign up</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="username" className="block text-white text-sm">
            User name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full bg-[#2a3a5f] text-white placeholder-[#4a5a7f] rounded-lg p-3 focus:outline-none"
            placeholder="Type here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-white text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-[#2a3a5f] text-white placeholder-[#4a5a7f] rounded-lg p-3 focus:outline-none"
            placeholder="Type here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full text-white rounded-lg p-3 mt-4 ${isFormValid
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-500 cursor-not-allowed'
            }`}
        >
          Next
        </button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#3a4a6f]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1e2c4f] text-white">Sign up with</span>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-[#1e2c4f] font-bold text-2xl">G</span>
        </button>
        <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-[#1e2c4f] font-bold text-2xl">f</span>
        </button>
      </div>
      <p className="text-center text-sm text-[#7a8aaf]">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-red-500 hover:underline">
          Log in here
        </Link>
      </p>
    </>
  );
}
