
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="container mx-auto text-center">

        <p className="text-lg font-semibold mb-4">Get the latest weather information, wherever you are!</p>

        <div className="flex justify-center space-x-6 mb-4 p-3">
          <a
            href="https://github.com/zprakash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/prakash-acharya-78a7532a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className="text-xs mt-4">© 2024 Prakash. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
