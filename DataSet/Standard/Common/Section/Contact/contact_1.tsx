//contact_1
import React from 'react';

    const Contact = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-10 bg-white">
      <div className="max-w-4xl w-full p-10 bg-gray-100 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-black mb-6">Contact Us</h1>
        
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">Get in Touch</h2>
          <p className="text-lg text-black text-center">Have any questions or inquiries? Feel free to reach out to us!</p>
          <p className="text-lg text-black text-center mt-4"><strong>Email:</strong> contact@example.com</p>
          <p className="text-lg text-black text-center mt-2"><strong>Phone:</strong> +123 456 7890</p>
        </div>

        <div className="mt-6 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">Our Office</h2>
          <p className="text-lg text-black text-center">123 Main Street, City, Country</p>
        </div>

        <div className="mt-6 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">Business Hours</h2>
          <p className="text-lg text-black text-center">Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p className="text-lg text-black text-center">Saturday - Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
