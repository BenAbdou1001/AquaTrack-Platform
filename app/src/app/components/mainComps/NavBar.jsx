import React from "react";
import { FaUserCircle } from "react-icons/fa";
import notif from "@/ressources/icons/Notification.png"
import Image from "next/image";

export default function NavBar() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <nav className="w-full flex justify-between items-center px-20 py-4">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        Aqua<span className="text-black">Track</span>
      </div>

      {/* Date */}
      <div className="text-gray-600 text-sm w-1/2">
        <div>
            <p>{today}</p>
            <h2  className="font-bold text-2xl text-black">Welcome Back Sir</h2>
        </div>
      </div>

      {/* Right Section: Welcome + Icon */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span><Image src={notif} width={30} height={30} /></span>
        <FaUserCircle className="text-2xl text-blue-600" />
        <span className="text-black text-md" style={{fontWeight: 400}}>Admin</span>
      </div>
    </nav>
  );
}
