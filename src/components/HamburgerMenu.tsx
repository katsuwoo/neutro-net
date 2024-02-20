"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex relative">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-transform duration-500 ${isOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-opacity duration-500 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black transition-transform duration-500 ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
      </button>
      {isOpen && (
        <div className="absolute top-8 right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl transition-transform duration-500 transform scale-100 z-30">
          <Link href="/profile" 
            className="block px-4 py-2 text-gray-800 hover:bg-main-blue hover:text-white"
            onClick={() => setIsOpen(false)}
          >プロフィール</Link>
          <Link href={`/threads/bookmarked`} 
            className="block px-4 py-2 text-gray-800 hover:bg-main-blue hover:text-white"
            onClick={() => setIsOpen(false)}
          >ブックマーク</Link>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;