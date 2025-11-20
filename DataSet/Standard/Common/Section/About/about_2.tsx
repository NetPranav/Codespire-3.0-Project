//about_2
import React from 'react';
import { Github, Youtube, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: <Github className="w-6 h-6 text-black group-hover:text-gray-800" />, link: "https://github.com/NetPranav", color: "black" },
  { icon: <Youtube className="w-6 h-6 text-red-600 group-hover:text-red-800" />, link: "https://www.youtube.com/channel/UC9Q4Kv7ZL0Zq7l3NR1Z1Q0A", color: "red" },
  { icon: <Instagram className="w-6 h-6 text-pink-500 group-hover:text-pink-700" />, link: "https://www.instagram.com/pranav.dubey_/", color: "pink" },
  { icon: <Linkedin className="w-6 h-6 text-blue-700 group-hover:text-blue-900" />, link: "https://www.linkedin.com/in/pranav-dubey-1b1b3b1b3/", color: "blue" },
  { icon: <Twitter className="w-6 h-6 text-blue-500 group-hover:text-blue-700" />, link: "https://twitter.com/NetPranav", color: "blue" },
  { icon: <Facebook className="w-6 h-6 text-blue-600 group-hover:text-blue-800" />, link: "https://www.facebook.com/pranav.dubey.142", color: "blue" },
];

const About = () => {
  return (
<div className="flex flex-col items-center justify-center w-full min-h-screen px-10 py-10 bg-white overflow-hidden">
<div className="max-w-4xl w-full p-10 bg-gray-100 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-black mb-6">About Me</h1>
        <div className="p-6 bg-white shadow-md rounded-md">
          <p className="text-lg text-black">
            Hi, I’m Pranav Dubey! I’m a third-year student in the Computer Science Engineering branch at Government Polytechnic College, Dewas. 
            I’m passionate about technology and love building projects that merge creativity with functionality. 
            Exploring new technologies and creating useful solutions for the tech world excites me.
          </p>
        </div>
        <div className="mt-6 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">Location</h2>
          <p className="text-lg text-black text-center">Dewas, Madhya Pradesh, India</p>
        </div>
        <div className="mt-6 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">Find Me</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:scale-110 transition-transform duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
