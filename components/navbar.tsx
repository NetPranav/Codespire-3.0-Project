"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bell, Menu, X, ChevronRight } from "lucide-react";
import SignOutButton from "./signOutButton";
import { useRouter, redirect } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [showNotification, setShowNotification] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const navItems = [
    { label: "Products", path: "/products" },
  { label: "Template", path: "/Template" },
  { label: "Pricing", path: "/pricing" },
  ]


  const getBtn = useRef<HTMLDivElement>(null);
  const spotBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = getBtn.current;
    const spot = spotBg.current;

    if (!btn || !spot) return;

    const speed = 1.8;

    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xFast = (x - rect.width / 2) * speed + rect.width / 2;
      const yFast = (y - rect.height / 2) * speed + rect.height / 2;

      const spotR = parseInt(window.getComputedStyle(spot).width);
      const offset = 100;

      spot.style.right = `${spotR - xFast + offset}px`;
      spot.style.top = `${yFast}px`;

      // Trigger the expansion and color flip
      if (
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
      ) {
        spot.style.transform = `scale(4)`;
        btn.style.color = "black"; // This flips the text color
      }
    };

    const mouseLeaveHandler = () => {
      spot.style.transform = `scale(1)`;
      btn.style.color = "white"; // Resets text color
    };

    btn.addEventListener("mousemove", mouseMoveHandler);
    btn.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      btn.removeEventListener("mousemove", mouseMoveHandler);
      btn.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  const router = useRouter();

  // Lock Scroll on Mobile Menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleLogin = () => router.push("/login");
  const handleNotificationClick = () => setShowNotification(!showNotification);

  // Scroll Background Effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("navBar");
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.background = "rgba(0, 0, 0, 0.8)";
          nav.style.backdropFilter = "blur(12px)";
        } else {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="navBar"
        className="w-full h-20 flex justify-between items-center px-6 md:px-12 text-white fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent hover:bg-black/20"
      >
        {/* --- LOGO --- */}
        <div className="flex items-center z-50">
          <Link href="/">
            <img src="/logo.png" alt="LazyLayout Logo" className="w-32 md:w-40 object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex h-full items-center gap-12">
          {navItems.map((item) => (
            <div key={item.label}
            onClick={()=>{
              router.push(item.path)
            }}
            className="group relative cursor-pointer py-2">
              <span className="text-sm font-medium text-white hover:text-white transition-colors tracking-wide">
                {item.label.toUpperCase()}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>

        {/* --- DESKTOP AUTH --- */}
        <div className="hidden md:flex items-center gap-8">
          {session?.user ? (
            <div className="flex items-center gap-6">
              <button onClick={handleNotificationClick} className="relative opacity-70 hover:opacity-100 transition-opacity">
                <Bell size={18} />
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                 <span className="text-sm font-medium">{session.user.name}</span>
                 <div className="h-8 w-8 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                    {session.user.image && <img src={session.user.image} className="w-full h-full object-cover"/>}
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <button onClick={handleLogin} className="text-sm font-medium text-white hover:text-white transition-colors">Sign In</button>
              
              {/* --- RESTORED GET STARTED BUTTON --- */}
              <div
                ref={getBtn}
                onClick={() => redirect("/userPref")}
                className="relative flex justify-center items-center py-4 px-8 cursor-pointer overflow-hidden border border-white/20 transition-colors"
                // Removed 'rounded-full' to match original rectangular feel, or keep 'rounded-md' if you prefer
                // IMPORTANT: Removed bg-transparent to allow default behavior
              >
                {/* z-10 ensures text sits ON TOP of the spot */}
                <p className="z-10 relative text-sm font-bold tracking-widest uppercase pointer-events-none">
                  Get Started
                </p>
                
                {/* The Spot: Solid white, no blur, exact inline styles from your original code */}
                <div
                  ref={spotBg}
                  id="bgSpot"
                  style={{
                    transition: "top 0s linear, right 0s linear, transform 0.2s ease-in-out",
                    top: "200px", // Initial position off-center
                    right: "50px",
                  }}
                  className="absolute h-[50px] w-[50px] bg-white pointer-events-none rounded-full z-0"
                ></div>
              </div>

            </div>
          )}
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none transition-transform duration-300"
          >
            {isMobileMenuOpen ? <X size={24} className="opacity-70" /> : <Menu size={24} className="opacity-100" />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY (Kept the Classy Version) --- */}
      <div 
        className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-40 transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="h-full w-full flex flex-col pt-32 px-8 pb-12">
            
            {/* MENU LINKS */}
            <div className="flex-1 flex flex-col gap-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-semibold">Menu</p>

                {[
                  { name: "Products", href: "#" }, 
                  { name: "Template", href: "/Template" },
                  { name: "Pricing", href: "#" },
                  { name: "Community", href: "/community" }
                ].map((item, i) => (
                  <Link 
                    key={i}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center justify-between text-2xl font-light text-gray-300 hover:text-white transition-all duration-500 transform ${
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${100 + (i * 50)}ms` }}
                  >
                    {item.name}
                    <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-500" />
                  </Link>
                ))}
            </div>

            {/* FOOTER / AUTH AREA */}
            <div 
                className={`border-t border-white/10 pt-8 transition-all duration-700 delay-300 ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
                {session?.user ? (
                   <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {session.user.image ? (
                                <img src={session.user.image} className="w-10 h-10 rounded-full grayscale opacity-80" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold">U</div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-white">{session.user.name}</p>
                                <Link href="/profile" className="text-xs text-gray-500 hover:text-white transition-colors">View Profile</Link>
                            </div>
                        </div>
                        <div onClick={() => { setIsMobileMenuOpen(false); }}>
                            <SignOutButton /> 
                        </div>
                   </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <button
                          onClick={() => { setIsMobileMenuOpen(false); handleLogin(); }}
                          className="w-full py-4 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all"
                        >
                          Sign In to Account
                        </button>
                        <button
                           onClick={() => { setIsMobileMenuOpen(false); redirect("/userPref"); }}
                          className="w-full py-4 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Get Started
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
}



// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { Bell } from "lucide-react";
// import SignOutButton from "./signOutButton";
// import { useRouter, redirect } from "next/navigation";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const [showNotification, setShowNotification] = useState(false);

//   const getBtn = useRef<HTMLDivElement>(null);
//   const spotBg = useRef<HTMLDivElement>(null);

//  useEffect(() => {
//   const btn = getBtn.current;
//   const spot = spotBg.current;

//   if (!btn || !spot) return;

//   const speed = 1.8;

//   const mouseMoveHandler = (e: MouseEvent) => {
//     const rect = btn.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const xFast = (x - rect.width / 2) * speed + rect.width / 2;
//     const yFast = (y - rect.height / 2) * speed + rect.height / 2;

//     const spotR = parseInt(window.getComputedStyle(spot).width);
//     const offset = 100;

//     spot.style.right = `${spotR - xFast + offset}px`;
//     spot.style.top = `${yFast}px`;

//     if (
//       e.clientX > rect.left &&
//       e.clientX < rect.right &&
//       e.clientY > rect.top &&
//       e.clientY < rect.bottom
//     ) {
//       spot.style.transform = `scale(4)`;
//       btn.style.color = "black";
//     }
//   };

//   const mouseLeaveHandler = () => {
//     spot.style.transform = `scale(1)`;
//     btn.style.color = "white";
//   };

//   btn.addEventListener("mousemove", mouseMoveHandler);
//   btn.addEventListener("mouseleave", mouseLeaveHandler);

//   return () => {
//     btn.removeEventListener("mousemove", mouseMoveHandler);
//     btn.removeEventListener("mouseleave", mouseLeaveHandler);
//   };
// }, []);



//   const router = useRouter();

//   const handleLogin = () => {
//     router.push("/login");
//   };

//   const handleNotificationClick = () => {
//     setShowNotification(!showNotification);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (showNotification) {
//         setShowNotification(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showNotification]);

//   useEffect(() => {
//     if (session) {
//       console.log("USER LOGGED IN:", session.user);
//     }
//   }, [session]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const nav = document.getElementById("navBar");

//       if (window.scrollY > 50) {
//         nav!.style.background = "rgba(0, 0, 0)"; // Dark background when scrolled
//       } else {
//         nav!.style.background = "transparent"; // Transparent at top
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial call

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       id="navBar"
//       className={`w-full h-18 flex justify-around text-white fixed z-99`}
//     >
//       <div
//         className="h-full pl-[2%] w-[18%] flex justify-center items-center -mt-1"
//         id="logo"
//       >
//         <img src="/logo.png" alt="LazyLayout Logo" className="w-48" />
//       </div>
//       <div
//         className="h-full w-[60%] flex justify-center gap-[25px]"
//         id="navOps"
//       >
//         <div
//           className="h-full w-[10%] flex justify-center items-center"
//           id="op1"
//         >
//           PRODUCTS
//           <img src="/chevron-down.png" className="h-[15px]" />
//         </div>
//         <div className="h-full w-[10%] flex justify-end  items-center" id="op2">
//           RESOURCES
//           <img src="/chevron-down.png" className="h-[15px]" />
//         </div>
//       </div>

//       {session && session?.user ? (
//         <>
//           <div className="h-full w-[8%]"></div>
//           <div
//             className="h-full w-[10%] pr-[2%] flex items-center"
//             id="signInUp"
//           >
//             {" "}
//             {/* Changed from 18% to 5% */}
//             <div className="h-[full] w-full flex justify-center items-center">
//               {" "}
//               {/* Changed width to full */}
//               <div className="flex justify-evenly items-center w-full h-full">
//                 {/* Notification Panel  */}
//                 <button
//                   className="p-2 text-white hover:bg-white- rounded-[50%] transisiton-colors duration-200 relative"
//                   onClick={handleNotificationClick}
//                 >
//                   <Bell />
//                   <span className="absolute top-0 right-1 w-2 h-2 bg-yellow-500 rounded-[50%]"></span>
//                 </button>

//                 {/* notification */}
//                 {showNotification && <div id="" className=""></div>}

//                 {/* profile dropdown */}
//                 <div className="relative group flex justify-center items-center ml-2">
//                   <button className="hover:scale-105 duration transition-transform">
//                     <div
//                       id="User"
//                       className="flex items-center rounded-lg font-medium text-sm text-black justify-center mx-2 bg-gray-200 h-13 w-13 border-2 border-white"
//                     >
//                       {session?.user?.image ? (
//                         <img
//                           src={session?.user?.image}
//                           alt="Profile"
//                           className="h-full w-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         session?.user?.name?.charAt(0).toUpperCase() || "U"
//                       )}
//                     </div>
//                   </button>

//                   {/* DropDown Menu */}
//                   <div className="absolute right-0 top-full mt-2 w-64 bg-black backdrop-blur-lg border border-gray-300 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <div className="p-4 border-b border-gray-300">
//                       <div className="font-semibold text-white">
//                         {session.user.name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {session.user.email}
//                       </div>
//                     </div>
//                     <div className="p-2">
//                       <Link
//                         href="/community"
//                         className="flex items-center px-3 py-2 text-gray-100 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
//                       >
//                         Profile
//                       </Link>
//                       <Link
//                         href="/community"
//                         className="flex items-center px-3 py-2 text-gray-100 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
//                       >
//                         Community
//                       </Link>
//                       <Link
//                         href="/help"
//                         className="flex items-center px-3 py-2 text-gray-100 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
//                       >
//                         Help Center
//                       </Link>
//                       <SignOutButton />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="h-full w-[18%] pr-[2%] flex items-center" id="signInUp">
//           {" "}
//           {/* Keep 18% when no session */}
//           <div className="h-[full] w-[50%] flex justify-center items-center">
//             <div className="flex justify-evenly items-center w-full h-full">
//               <button className="" onClick={handleLogin}>
//                 Sign In
//               </button>
//               <div
//                 ref={getBtn}
//                 onClick={() => redirect("/userPref")}
//                 className=" absolute right-2 flex justify-center items-center bg-[#ffffff00] text-white py-5 px-8 cursor-pointer overflow-hidden"
//               >
//                 <p className="z-1">GET STARTED</p>
//                 <div
//                   ref={spotBg}
//                   id="bgSpot"
//                   style={{
//                     transition: "top 0s linear, right 0s linear, transform 0.2s ease-in-out",
//                     top: "200px",
//                   }}
//                   className="absolute h-[50px] w-[50px] bg-[white] top-[50px] right-[50px] pointer-events-none rounded-[50%] z-0"
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



