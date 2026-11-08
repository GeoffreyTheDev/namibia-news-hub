import { useState } from 'react';
import { signInWithGoogle, registerWithEmail, loginWithEmail } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaNewspaper } from 'react-icons/fa'; // New Icon

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false); // Toggle state

  const handleGoogleAuth = async () => {
    const user = await signInWithGoogle();
    if (user) onLogin(user);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      const user = await loginWithEmail(email, password);
      if (user) onLogin(user);
    } else {
      const user = await registerWithEmail(email, password);
      if (user) onLogin(user);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-white to-green-500 p-4">
      {/* Yellow overlay gradient for the final Namibian flag color */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/40 to-transparent pointer-events-none"></div>

      {/* Floating Background Images */}
      <img 
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80" 
        alt="News Desk" 
        className="absolute top-10 left-10 w-32 md:w-56 rounded-xl shadow-xl opacity-70 animate-float pointer-events-none hidden sm:block" 
      />
      <img 
        src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80" 
        alt="Newspaper" 
        className="absolute bottom-10 right-10 w-32 md:w-52 rounded-xl shadow-xl opacity-70 animate-float-reverse pointer-events-none hidden sm:block" 
      />
      <img 
        src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80" 
        alt="Articles" 
        className="absolute top-20 right-20 w-24 md:w-40 rounded-xl shadow-xl opacity-50 animate-float pointer-events-none hidden md:block" 
      />

      <div className="z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-fade-in border border-white">
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaNewspaper className="text-blue-600 text-4xl drop-shadow-sm" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Namib News Hub</h1>
        </div>
        
        <button 
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 bg-white rounded-xl p-3 hover:bg-gray-50 hover:border-blue-300 transition-all mb-6"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">Continue with Google</span>
        </button>

        <div className="relative flex items-center py-2 mb-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">
            Or {isLoginMode ? 'login' : 'sign up'} with email
          </span>
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
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Switch */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 font-bold hover:underline focus:outline-none"
          >
            {isLoginMode ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </div>
  );
}