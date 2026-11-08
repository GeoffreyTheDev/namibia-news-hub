import { useState } from 'react';
import { signInWithGoogle, registerWithEmail } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaGlobeAfrica } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleAuth = async () => {
    const user = await signInWithGoogle();
    if (user) onLogin(user);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    const user = await registerWithEmail(email, password);
    if (user) onLogin(user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 animate-gradient p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 animate-fade-in">
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaGlobeAfrica className="text-blue-600 text-4xl" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">News Hub</h1>
        </div>
        
        <button 
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl p-3 hover:bg-gray-50 hover:border-blue-300 transition-all mb-6"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">Continue with Google</span>
        </button>

        <div className="relative flex items-center py-2 mb-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or sign up with email</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}