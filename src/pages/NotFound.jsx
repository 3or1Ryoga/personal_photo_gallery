import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center">
            <Icon name="ImageOff" size={48} className="text-accent" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-xl font-heading font-semibold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to your photo gallery.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/photo-gallery-homepage"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-accent text-white rounded-gallery font-medium transition-gallery hover:bg-accent/90 hover:shadow-gallery focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <Icon name="Home" size={20} />
            <span>Back to Gallery</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 border border-border text-primary rounded-gallery font-medium transition-gallery hover:bg-background hover:shadow-gallery focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 text-secondary/50">
          <Icon name="Camera" size={32} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;