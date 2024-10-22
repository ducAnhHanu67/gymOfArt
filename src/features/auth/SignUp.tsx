import { useState } from 'react';
import { SignUpPart1 } from './components/SignUpFirstInfo';
import { SignUpPart2 } from './components/SignUpPasswordInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPart2, setShowPart2] = useState(false);

  const handleNext = (email: string, username: string) => {
    setEmail(email);
    setUsername(username);
    setShowPart2(true);
  };

  const handleSignUp = async (password: string) => {
    try {
      const formData = new FormData();
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('Role', 'Admin');

      const response = await axios.post(
        'https://gym-of-art.azurewebsites.net/api/Auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Sign up successful:', response.data);
      toast.success('Sign up successful!');
      // Handle successful sign up, e.g., redirect to login page
    } catch (error) {
      console.error('Sign up failed:', error);
      toast.error('Sign up failed. Please try again.');
      // Handle sign up error, e.g., display error message
    }
  };

  return (
    <div className="w-full max-w-md bg-[#1e2c4f] rounded-[40px] p-8 space-y-6 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      {!showPart2 ? (
        <SignUpPart1 onNext={handleNext} />
      ) : (
        <SignUpPart2
          email={email}
          username={username}
          onSignUp={handleSignUp}
        />
      )}
    </div>
  );
}
