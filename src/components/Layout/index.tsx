import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow z-10">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="cursor:pointer">
            Registration System
          </Link>
        </h1>
      </header>
      <main className="flex-grow">
        {children} 
      </main>
    </div>
  );
};

export default Layout;
