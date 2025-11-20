"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const [authState, setauthState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});
  const [isLeaving, setIsLeaving] = useState(false);

  // Page enter animation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1000);
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const handleNavigation = (url: string) => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push(url);
    }, 600);
  };

  // User credentials Login
  const submitForm = () => {
    setLoading(true);
    setIsLeaving(true);
    console.log(authState);
    axios
      .post("/api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        console.log("the response is ", response);
        if (response.status === 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response?.status == 400) {
          setErrors(response?.errors);
          setIsLeaving(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setIsLeaving(false);
        console.log("Something went Wrong,the error is ", err);
      });
  };

  // Github Login
  const guthubSignIn = () => {
    setIsLeaving(true);
    setTimeout(() => {
      signIn("github", {
        callbackUrl: "/",
        redirect: true,
      });
    }, 600);
  };

  return (
    <>
      {/* Page Transition Overlay */}
      <div className={`fixed inset-0 z-50 pointer-events-none transition-all duration-600 ease-in-out ${
        isLeaving ? 'opacity-100 bg-black' : 'opacity-0'
      }`}></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full transition-all duration-1000 ${
          isLeaving ? 'opacity-0 scale-0' : 'opacity-5 scale-100'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-1 h-1 bg-gray-400 rounded-full transition-all duration-1200 delay-200 ${
          isLeaving ? 'opacity-0 scale-0' : 'opacity-10 scale-100'
        }`}></div>
        <div className={`absolute top-1/2 right-1/4 w-3 h-3 bg-black rounded-full transition-all duration-1400 delay-400 ${
          isLeaving ? 'opacity-0 scale-0' : 'opacity-3 scale-100'
        }`}></div>
      </div>

      <div className={`min-h-screen bg-white flex items-center justify-center px-6 py-12 relative z-10 transition-all duration-500 ${
        isLeaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        
        {/* Webgen Logo - Top Left */}
        <div className={`absolute top-8 left-8 transition-all duration-500 ${
          isLeaving ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'
        }`}>
          <img src="/logo.png" alt="WebGen" className="w-48 invert"/>
        </div>

        {/* Vertical Text - Left Bottom */}
        <div className={`absolute bottom-8 left-8 transition-all duration-500 delay-100 ${
          isLeaving ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
        }`}>
          <div className="transform -rotate-90 origin-left whitespace-nowrap text-gray-400 text-sm tracking-widest">
            CREATE YOUR STORY
          </div>
        </div>

        {/* Vertical Text - Right Top */}
        <div className={`absolute top-60 right-8 transition-all duration-500 delay-75 ${
          isLeaving ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
        }`}>
          <div className="transform rotate-90 origin-right whitespace-nowrap text-gray-400 text-sm tracking-widest">
            INNOVATE DESIGN BUILD
          </div>
        </div>

        <div className="w-full max-w-4xl flex flex-col">
          
          {/* HEADER SECTION - CENTERED */}
          <div className={`text-center mb-16 transition-all duration-500 delay-150 ${
            isLeaving ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Log In</h1>
            <p className="text-gray-600 text-lg">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="text-black font-semibold underline hover:text-gray-800 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/register');
                }}
              >
                Create an account
              </Link>
            </p>
          </div>

          {params.get("message") ? (
            <p className="bg-green-400 font-bold rounded-md p-4 text-center mb-8">
              {params.get("message")}
            </p>
          ) : (
            <></>
          )}

          {/* CONTENT SECTION */}
          <div className={`w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-20 transition-all duration-500 delay-200 ${
            isLeaving ? 'opacity-0' : 'opacity-100'
          }`}>

            {/* LEFT SIDE FORM */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-8">
                {/* Email */}
                <div className="relative group">
                  <input
                    placeholder="Email"
                    className="w-full bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500 relative overflow-hidden"
                    onChange={(e) =>
                      setauthState({ ...authState, email: e.target.value })
                    }
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
                  <span className="text-red-500 text-sm mt-2 block">{errors?.email}</span>
                </div>

                {/* Password */}
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500"
                    onChange={(e) =>
                      setauthState({ ...authState, password: e.target.value })
                    }
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
                  <span className="text-red-500 text-sm mt-2 block">{errors?.password}</span>
                </div>

                {/* Remember me & Forgot password */}
                <div className="inline-flex w-full items-center justify-between">
                  <div className="mr-4 flex items-center">
                    <input
                      type="checkbox"
                      id="checkbox-1"
                      name="checkbox-1"
                      className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-black [&:checked+div_svg]:block"
                    />
                    <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-300 bg-transparent focus-within:border-black transition-colors duration-300">
                      <svg
                        className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                        version="1.1"
                        viewBox="0 0 17 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g
                            transform="translate(-9 -11)"
                            fill="#ffffff"
                            fillRule="nonzero"
                          >
                            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor="checkbox-1"
                        className="text-sm font-medium text-black"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <p className="cursor-pointer text-sm text-black hover:underline">
                    Forgot password?
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={submitForm}
                  className={`w-full bg-black text-white py-4 rounded-lg font-semibold text-lg relative overflow-hidden group
                  transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"}`}
                  disabled={loading}
                >
                  <span className="relative z-10">{loading ? "Processing..." : "Log In"}</span>
                  <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-black transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
                </button>
              </div>
            </div>

            {/* CENTER DIVIDER */}
            <div className="hidden md:flex flex-col justify-center items-center">
              <div className="h-32 w-px bg-gray-300" />
              <div className="my-4 text-gray-400 text-sm">OR</div>
              <div className="h-32 w-px bg-gray-300" />
            </div>

            {/* RIGHT SOCIAL LOGIN SECTION */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 pt-8">
              <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Continue with</h3>
              
              {/* Google */}
              <button 
                onClick={() => signIn('google', { callbackUrl: "/", redirect: true })}
                className="relative group flex items-center justify-center gap-4 p-4 text-black overflow-hidden border border-gray-300 rounded-lg hover:border-black transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></div>
                <img src="/google.png" className="w-6 h-6 relative z-10" alt="Google" />
                <span className="font-medium relative z-10">Continue with Google</span>
              </button>

              {/* GitHub */}
              <button
                onClick={guthubSignIn}
                className="relative group flex items-center justify-center gap-4 p-4 text-black overflow-hidden border border-gray-300 rounded-lg hover:border-black transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="black"
                  viewBox="0 0 24 24"
                  className="relative z-10"
                >
                  <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.3.726-4-1.416-4-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-medium relative z-10">Continue with GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}