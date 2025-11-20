"use client";
import React from "react";
import { Youtube, Linkedin, Twitter, Instagram, Github } from "lucide-react"; // Import social media icons

interface SocialMediaLink {
  name: string; // Name of the social media platform
  icon: React.ReactNode; // Icon for the platform
  link: string; // Link to the social media profile
}

interface FooterProps {
  textColor?: string;
  backgroundColor?: string;
  socialMediaLinks?: SocialMediaLink[];
  yourName?: string;
  yourPassion?: string;
}

const Footer: React.FC<FooterProps> = ({
  textColor = "white",
  backgroundColor = "black",
  socialMediaLinks = [
    {
      name: "YouTube",
      icon: <Youtube />,
      link: "https://youtube.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: "https://linkedin.com",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      link: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      link: "https://instagram.com",
    },
    {
      name: "GitHub",
      icon: <Github />,
      link: "https://github.com",
    },
  ],
  yourName = "Pranav",
  yourPassion = "Your Passion",
}) => {
  return (
    <footer
      style={{ backgroundColor, color: textColor }}
      className="w-full py-12 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your Name and Passion */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold hover:scale-105 transition-transform duration-300">
            {yourName}
          </h2>
          <p className="text-lg mt-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
            {yourPassion}
          </p>
        </div>

        {/* Social Media Links Section */}
        <div className="flex justify-center space-x-6">
          {socialMediaLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:rotate-12 hover:scale-110"
              aria-label={social.name} // Accessibility improvement
            >
              <div className="text-xl" style={{ color: backgroundColor }}>
                {social.icon}
              </div>
            </a>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
          © {new Date().getFullYear()} {yourName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;