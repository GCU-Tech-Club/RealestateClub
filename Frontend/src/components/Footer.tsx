import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-screen border-t bg-gray-50 text-black py-6">
      <div className="container mx-auto text-center md:flex md:justify-between">
        {/* Logo or Brand Name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Real Estate Club</h1>
        </div>

        {/* Links */}
        <div className="flex justify-center space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-gray-400 hover:text-white">Grand </a>
          <a href="#" className="text-gray-400 hover:text-white">Canyon</a>
          <a href="#" className="text-gray-400 hover:text-white">University</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
