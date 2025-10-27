"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { LogOut } from "@deemlol/next-icons";
import MyCalender from "../components/calender";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return null; // prevent flashing of dashboard before redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

        <div className="flex items-center space-x-4">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          )}
          <span className="text-gray-700 font-medium">
            {user.displayName || user.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            <LogOut size={12} />
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center mt-16">
        <MyCalender />
      </main>
    </div>
  );
}
