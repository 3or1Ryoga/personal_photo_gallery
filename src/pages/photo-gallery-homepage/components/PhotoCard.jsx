import React, { useState } from 'react';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

function PhotoCard({ photo, index, onClick, viewMode = 'grid' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleClick = () => {
    if (!imageError) {
      onClick();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-gallery overflow-hidden shadow-gallery transition-gallery hover:shadow-modal hover:scale-hover cursor-pointer focus-within:ring-2 focus-within:ring-accent/50 ${
        viewMode === 'masonry' ? 'mb-4 lg:mb-6' : 'aspect-square'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${photo.title || `photo ${index + 1}`} in full size`}
    >
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${
          viewMode === 'grid' ? 'aspect-square' : ''
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Image" size={32} className="text-gray-400" />
          </div>
        </div>
      )}

      {/* Photo Image */}
      <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : ''} overflow-hidden`}>
        <Image
          src={photo.thumbnail || photo.src}
          alt={photo.alt || photo.title || `Photo ${index + 1}`}
          className={`w-full h-full object-cover transition-gallery group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-gallery opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-gallery">
              <Icon name="ZoomIn" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Photo Number Badge */}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-mono px-2 py-1 rounded-gallery opacity-0 group-hover:opacity-100 transition-gallery">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Photo Info Overlay */}
      {(photo.title || photo.date) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-gallery">
          {photo.title && (
            <h3 className="text-white text-sm font-medium truncate mb-1">
              {photo.title}
            </h3>
          )}
          {photo.date && (
            <p className="text-white/80 text-xs font-mono">
              {photo.date}
            </p>
          )}
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
          <Icon name="ImageOff" size={32} className="mb-2" />
          <span className="text-xs">Failed to load</span>
        </div>
      )}
    </div>
  );
}

export default PhotoCard;