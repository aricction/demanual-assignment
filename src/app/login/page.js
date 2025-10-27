'use client';
import {auth, provider} from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      setUser(userData);
      console.log("User Info:", userData);
            localStorage.setItem("user", JSON.stringify(userData));

      router.push('/dashboard');
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>

        {!user ? (
          <>
            <div className="flex flex-col space-y-4 mb-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition duration-200">
                Login
              </button>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition duration-200 w-full"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </>
        ) : (
           <div>
            <p className="text-lg text-gray-700 mb-4">Welcome, {user.displayName}!</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
