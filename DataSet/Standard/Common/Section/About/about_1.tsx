"use client";
import React from 'react';
import { Github, Youtube, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
  label?: string;
}

interface AboutProps {
  name: string;
  description: string;
  education?: string;
  socialLinks?: SocialLink[];
  className?: string;
  textColor?: string;
  cardBgColor?: string;
  cardHoverColor?: string;
}

const defaultSocialLinks: SocialLink[] = [
  { platform: 'github', url: "https://github.com/NetPranav", icon: <Github className="w-6 h-6" />, label: "GitHub" },
  { platform: 'youtube', url: "https://www.youtube.com/channel/UC9Q4Kv7ZL0Zq7l3NR1Z1Q0A", icon: <Youtube className='w-6 h-6'/>, label: "YouTube" },
  { platform: 'instagram', url: "https://www.instagram.com/pranav.dubey_/", icon: <Instagram className='w-6 h-6'/>, label: "Instagram" },
  { platform: 'linkedin', url: "https://www.linkedin.com/in/pranav-dubey-1b1b3b1b3/", icon: <Linkedin className='w-6 h-6'/>, label: "LinkedIn" },
  { platform: 'twitter', url: "https://twitter.com/NetPranav", icon: <Twitter className='w-6 h-6'/>, label: "Twitter" },
  { platform: 'facebook', url: "https://www.facebook.com/pranav.dubey.142", icon: <Facebook className='w-6 h-6'/>, label: "Facebook" },
];

const platformIcons = {
  github: <Github className="w-6 h-6" />,
  youtube: <Youtube className="w-6 h-6" />,
  instagram: <Instagram className="w-6 h-6" />,
  linkedin: <Linkedin className="w-6 h-6" />,
  twitter: <Twitter className="w-6 h-6" />,
  facebook: <Facebook className="w-6 h-6" />,
};

const About: React.FC<AboutProps> = ({
  name,
  description,
  education = "Third-year Computer Science Engineering student at Government Polytechnic College, Dewas",
  socialLinks = defaultSocialLinks,
  className = "",
  textColor = "text-black",
  cardBgColor = "bg-gray-100",
  cardHoverColor = "hover:bg-gray-200",
}) => {
  return (
    <div className={`min-h-screen w-full px-4 sm:px-6 py-10 ${textColor} ${className} bg-white`}>
      {/* About Section */}
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white bg-opacity-90 shadow-md backdrop-blur-sm">
        <h1 className='font-semibold text-4xl mb-6 text-center'>About {name}</h1>
        <p className='mt-2 text-lg text-center'>{description}</p>
        <p className='mt-4 text-lg text-center'>{education}</p>
        <p className='mt-4 text-lg text-center'>
          This website was developed from scratch, applying my knowledge and skills to create a seamless user experience. 
          My goal was to provide an intuitive platform that allows users to build stunning websites without requiring coding expertise.
        </p>
      </div>

      {/* Social Links Section */}
      <div className="mt-12">
        <h2 className='font-semibold text-3xl mb-6 text-center'>Find Me</h2>
        <div className="flex flex-wrap justify-center gap-4 px-2">
          {socialLinks.map((item, index) => (
            <a 
              key={index} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-4 ${cardBgColor} ${cardHoverColor} shadow-sm rounded-xl flex items-center gap-3 transition-all duration-300 ease-in-out w-full max-w-[300px]`}
              aria-label={`${item.platform} profile`}
            >
              {item.icon || platformIcons[item.platform as keyof typeof platformIcons] || (
                <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  {item.platform.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="truncate">{item.label || item.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
