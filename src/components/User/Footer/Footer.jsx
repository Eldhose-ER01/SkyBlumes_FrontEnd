import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Import icons from react-icons

export default function Footer() {
  return (
    <div className="bg-black text-white py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Side - Copyright Text */}
        <div className="mb-4 sm:mb-0">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} SkyBlumes TravelHub. All rights reserved.
          </p>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition duration-300"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition duration-300"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="mailto:info@skyblunestravelhub.com"
            className="text-white hover:text-red-500 transition duration-300"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}