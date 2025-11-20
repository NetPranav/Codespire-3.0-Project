//contact_2
import React from 'react';

const Contact = () => {

  return (
    <div className="flex flex-col items-start justify-start w-full min-h-screen p-10 bg-white mt-10">
      <h1 className="text-4xl font-bold text-left text-black mb-6">Contact Us</h1>
      
      <p className="text-lg text-black ml-6">Have any questions or inquiries? Feel free to reach out to us!</p>
      
      <div className="mt-6 text-left hover:bg-gray-100 p-4 rounded-lg transition-all duration-300">
        <p className="text-lg text-black ml-6"><strong>Email:</strong> contact@example.com</p>
        <p className="text-lg text-black mt-2 ml-6"><strong>Phone:</strong> +123 456 7890</p>
      </div>

      <div className="mt-6 text-left hover:bg-gray-100 p-4 rounded-lg transition-all duration-300">
        <h2 className="text-2xl font-semibold text-black mb-2">Our Office</h2>
        <p className="text-lg text-black ml-6">123 Main Street, City, Country</p>
      </div>

      <div className="mt-6 text-left hover:bg-gray-100 p-4 rounded-lg transition-all duration-300">
        <h2 className="text-2xl font-semibold text-black mb-2">Business Hours</h2>
        <p className="text-lg text-black ml-6">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="text-lg text-black ml-6">Saturday - Sunday: Closed</p>
      </div>
    </div>
  );
};

export default Contact;
