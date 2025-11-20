"use client"
import React,{useState, useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register(){
    const router = useRouter();
    const [authState,setauthState] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    });

    const [loading,setLoading] = useState<boolean>(false);
    const [errors,setErrors] = useState<registerErrorType>({});
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

    const submitForm =async ()=>{
        setLoading(true);
        setIsLeaving(true);
        console.log("the auth state is ",authState);
        axios.post("/api/auth/register",authState)
        .then((res)=>{setLoading(false);
            const response = res.data;
            if(response.status===200){
                setTimeout(() => {
                    router.push(`/login?message=${response.message}`);
                }, 800);
            }else if (response?.status == 400){
                setErrors(response?.errors);
                setIsLeaving(false);
            }
        })
        .catch((err)=>{
            setLoading(false);
            setIsLeaving(false);
            console.log("Something went Wrong,the error is ",err);
        })
    }

    const handleSocialSignIn = (provider: string) => {
        setIsLeaving(true);
        setTimeout(() => {
            signIn(provider, {
                callbackUrl: "/",
                redirect: true,
            });
        }, 600);
    };

   return (
    <>
        {/* Page Transition Overlay - Fixed the issue */}
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
            <div className={`absolute bottom-28 left-8 transition-all duration-500 delay-100 ${
                isLeaving ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
            }`}>
                <div className="transform -rotate-90 origin-left whitespace-nowrap text-gray-400 text-sm tracking-widest">
                    CREATE YOUR STORY
                </div>
            </div>

            {/* Vertical Text - Right Top */}
            <div className={`absolute top-64 right-8 transition-all duration-500 delay-75 ${
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
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Sign Up</h1>
                    <p className="text-gray-600 text-lg">
                        Already have an account?{" "}
                        <Link 
                            href="/login" 
                            className="text-black font-semibold underline hover:text-gray-800 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation('/login');
                            }}
                        >
                            Log In
                        </Link>
                    </p>
                </div>

                {/* CONTENT SECTION */}
                <div className={`w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-20 transition-all duration-500 delay-200 ${
                    isLeaving ? 'opacity-0' : 'opacity-100'
                }`}>

                    {/* LEFT SIDE FORM */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <div className="space-y-8">
                            {/* Username */}
                            <div className="relative group">
                                <input
                                    placeholder="Username"
                                    className="w-full text-amber-950 bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500 relative overflow-hidden"
                                    onChange={(e) =>
                                        setauthState({ ...authState, name: e.target.value })
                                    }
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
                                <span className="text-red-500 text-sm mt-2 block">{errors?.name}</span>
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <input
                                    placeholder="Email"
                                    className="w-full text-amber-950 bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500 relative overflow-hidden"
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
                                    className="w-full text-amber-950 bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500"
                                    onChange={(e) =>
                                        setauthState({ ...authState, password: e.target.value })
                                    }
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
                                <span className="text-red-500 text-sm mt-2 block">{errors?.password}</span>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative group">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="w-full text-amber-950 bg-transparent p-4 outline-none border-b-2 border-gray-200 focus:border-black transition-all duration-500"
                                    onChange={(e) =>
                                        setauthState({
                                            ...authState,
                                            password_confirmation: e.target.value,
                                        })
                                    }
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={submitForm}
                            className={`w-full bg-black text-white py-4 rounded-lg font-semibold text-lg relative overflow-hidden group
                            transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        >
                            <span className="relative z-10">{loading ? "Processing..." : "Create Account"}</span>
                            <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-black transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
                        </button>
                    </div>

                    {/* CENTER DIVIDER */}
                    <div className="hidden md:flex flex-col justify-center items-center">
                        <div className="h-48 w-px bg-gray-300" />
                        <div className="my-4 text-gray-400 text-sm">OR</div>
                        <div className="h-48 w-px bg-gray-300" />
                    </div>

                    {/* RIGHT SOCIAL LOGIN SECTION */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 pt-8">
                        <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Continue with</h3>
                        
                        {/* Google */}
                        <button 
                            onClick={() => handleSocialSignIn('google')}
                            className="relative group flex items-center justify-center gap-4 p-4 text-black overflow-hidden border border-gray-300 rounded-lg hover:border-black transition-all duration-300"
                        >
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></div>
                            <img src="/google.png" className="w-6 h-6 relative z-10" alt="Google" />
                            <span className="font-medium relative z-10">Continue with Google</span>
                        </button>

                        {/* GitHub */}
                        <button
                            onClick={() => handleSocialSignIn('github')}
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
                                <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5 24 5.9 18.6.5 12 .5z" />
                            </svg>
                            <span className="font-medium relative z-10">Continue with GitHub</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};