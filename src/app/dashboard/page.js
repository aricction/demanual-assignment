"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "@deemlol/next-icons";
import MyCalender from "../components/calender";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // redirect if not logged in
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-gray-700 font-medium">{user.displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
            <LogOut size={12} />
            </button>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center mt-16">
        {user ? (
          <>
            <MyCalender/>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
}
