"use client";
import React from "react";
import { Youtube, Linkedin, Twitter, Instagram, Github } from "lucide-react";

interface SocialMediaLink {
  platform: string; // Changed from 'name' to 'platform' to match your use case
  icon?: React.ReactNode; // Made optional with default icons provided
  url: string; // Changed from 'link' to 'url' to match your use case
}

interface FooterProps {
  textColor?: string;
  backgroundColor?: string;
  socialMediaLinks?: SocialMediaLink[];
  copyrightText?: string;
  iconSize?: number;
  iconColor?: string;
  hoverEffect?: "scale" | "rotate" | "color-change";
  className?: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  youtube: <Youtube />,
  linkedin: <Linkedin />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  github: <Github />,
};

const Footer: React.FC<FooterProps> = ({
  textColor = "white",
  backgroundColor = "#1a1a1a",
  socialMediaLinks = [
    {
      platform: "youtube",
      url: "https://youtube.com",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com",
    },
    {
      platform: "twitter",
      url: "https://twitter.com",
    },
    {
      platform: "instagram",
      url: "https://instagram.com",
    },
    {
      platform: "github",
      url: "https://github.com",
    },
  ],
  copyrightText = "© 2024 MyApp",
  iconSize = 20,
  iconColor = "currentColor",
  hoverEffect = "scale",
  className = "",
}) => {
  const getHoverClass = () => {
    switch (hoverEffect) {
      case "rotate":
        return "hover:rotate-12 transition-transform duration-300";
      case "color-change":
        return "hover:text-blue-400 transition-colors duration-300";
      default: // scale
        return "hover:scale-110 transition-transform duration-300";
    }
  };

  return (
    <footer
      style={{ backgroundColor, color: textColor }}
      className={`w-full py-8 border-t border-gray-800 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Links Section */}
        <div className="flex justify-center space-x-6">
          {socialMediaLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${getHoverClass()} flex items-center`}
              aria-label={social.platform}
              style={{ color: iconColor }}
            >
              {social.icon || 
                (platformIcons[social.platform.toLowerCase()] || 
                  <span className="text-sm">{social.platform}</span>)}
            </a>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm opacity-80">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;