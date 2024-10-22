import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface SignUpPart2Props {
  email: string;
  username: string;
  onSignUp: (password: string) => void;
}

export function SignUpPart2({ email, username, onSignUp }: SignUpPart2Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      password === confirmPassword &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        ) &&
        agreeToTerms &&
        password.length > 0
    );
  }, [password, confirmPassword, agreeToTerms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      password === confirmPassword &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      onSignUp(password);
    } else {
      toast.error('Password mismatch or invalid format.');
    }
  };

  const renderPasswordInput = (
    id: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showPassword: boolean,
    setShowPassword: (show: boolean) => void
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-white text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-[#2a3a5f] text-white placeholder-[#4a5a7f] rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type here..."
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4a5a7f]"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold text-red-500">Sign up</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderPasswordInput(
          'password',
          'Password',
          password,
          (e) => setPassword(e.target.value),
          showPassword,
          setShowPassword
        )}
        {renderPasswordInput(
          'confirmPassword',
          'RE-enter password',
          confirmPassword,
          (e) => setConfirmPassword(e.target.value),
          showConfirmPassword,
          setShowConfirmPassword
        )}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm text-red-500">
            I agree to the{' '}
            <Link to="/terms" className="underline">
              terms of use
            </Link>{' '}
            and Gym of Art's{' '}
            <Link to="/privacy" className="underline">
              privacy policy
            </Link>
          </label>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-lg p-3 mt-4 transition duration-300 ease-in-out transform hover:scale-105 ${
            isFormValid
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[#3a4a6f] text-[#7a8aaf] cursor-not-allowed'
          }`}
        >
          Sign up
        </button>
      </form>
    </>
  );
}
