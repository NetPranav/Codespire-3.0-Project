"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Navbar() {
  //   const { data: session} = useSession();
  const [isHovered,setIsHovered] = useState(false);
  const session = {
    user: {
      name: "Pranav",
      email: "chotu@gmail.com",
      image: "",
    },
  };
  const data = {
    data: session,
  };

  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };


  useEffect(() => {
    if (session) {
      console.log("USER LOGGED IN:", session.user);
    }
  }, [session]);

  return (
    <>
    <header className="flex justify-between items-center px-6 py-1 border-b border-gray-200 shrink-0 bg-white z-10">
      <div className="flex items-center space-x-4">
        <div className="text-xs font-bold uppercase tracking-widest text-black"
       >
          <img src="/logo.png" alt="WebGen" className="w-48 invert" />
        </div>
      </div>
    
      <div className="flex items-center space-x-2 pr-8" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        {session.user.image ? (
            <div  onClick={handleLogin} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-solid border-black border-2"></div>
        ):(
            <div  onClick={handleLogin} className="w-8 h-8 rounded-full border-solid border-2 transition-transform hover:border-gray-200 delay-200 bg-gray-100  flex items-center justify-center text-xs font-medium text-gray-600  border-black">
          {session.user.name.charAt(0).toUpperCase()}
        </div>
        )}
        
      </div>
      </header>
    </>
  );
}