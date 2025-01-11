import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { FaGooglePlay, FaApple, FaWindows } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto text-center">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500"
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* App Store Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-500 flex items-center space-x-2"
          >
            <FaGooglePlay size={20} />
            <span className="text-sm">Google Play</span>
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-200 flex items-center space-x-2"
          >
            <FaApple size={20} />
            <span className="text-sm">App Store</span>
          </a>
          <a
            href="https://www.microsoft.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-300 flex items-center space-x-2"
          >
            <FaWindows size={20} />
            <span className="text-sm">Microsoft Store</span>
          </a>
        </div>

        {/* Links */}
        <div className="text-sm space-x-4">
          <a href="/about" className="hover:text-gray-100">
            About Us
          </a>
          <a href="/privacy-policy" className="hover:text-gray-100">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-gray-100">
            Terms of Service
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} YourAppName. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;