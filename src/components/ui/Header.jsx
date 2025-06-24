import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Site Title/Logo */}
          <div className="flex items-center">
            <Link 
              to="/photo-gallery-homepage"
              className="group flex items-center space-x-3 transition-gallery hover:opacity-80"
            >
              {/* Logo Icon */}
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-accent to-accent/80 rounded-gallery flex items-center justify-center">
                <svg 
                  className="w-5 h-5 lg:w-6 lg:h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              
              {/* Site Title */}
              <div className="flex flex-col">
                <h1 className="text-fluid-lg lg:text-fluid-xl font-heading font-semibold text-primary group-hover:text-accent transition-gallery">
                  Gallery
                </h1>
                <span className="text-fluid-xs text-secondary font-caption hidden sm:block">
                  Personal Photo Collection
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Actions */}
          <nav className="flex items-center space-x-4">
            {/* Upload Button - Future Enhancement */}
            <button 
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-gallery font-medium text-fluid-sm transition-gallery hover:bg-accent/90 hover:shadow-gallery"
              onClick={() => {
                // Future upload functionality
                console.log('Upload clicked');
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload</span>
            </button>

            {/* Mobile Menu Button - Future Enhancement */}
            <button 
              className="sm:hidden p-2 rounded-gallery text-secondary hover:text-primary hover:bg-background transition-gallery"
              onClick={() => {
                // Future mobile menu functionality
                console.log('Mobile menu clicked');
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;