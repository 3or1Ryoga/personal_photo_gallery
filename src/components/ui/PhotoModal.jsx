import React, { useEffect, useCallback } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

function PhotoModal({ 
  photos = [], 
  currentIndex = 0, 
  isOpen = false, 
  onClose, 
  onNext, 
  onPrevious,
  onIndexChange 
}) {
  const currentPhoto = photos[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  // Keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        onClose?.();
        break;
      case 'ArrowLeft':
        if (hasPrevious) {
          onPrevious?.();
        }
        break;
      case 'ArrowRight':
        if (hasNext) {
          onNext?.();
        }
        break;
      default:
        break;
    }
  }, [isOpen, hasPrevious, hasNext, onClose, onPrevious, onNext]);

  // Touch/swipe handling
  const handleTouchStart = useCallback((event) => {
    const touch = event.touches[0];
    event.currentTarget.touchStartX = touch.clientX;
  }, []);

  const handleTouchEnd = useCallback((event) => {
    const touch = event.changedTouches[0];
    const touchStartX = event.currentTarget.touchStartX;
    const touchEndX = touch.clientX;
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold && hasNext) {
      onNext?.();
    } else if (touchEndX - touchStartX > swipeThreshold && hasPrevious) {
      onPrevious?.();
    }
  }, [hasPrevious, hasNext, onNext, onPrevious]);

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !currentPhoto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm z-modal-backdrop animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-modal h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-gallery focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Close photo"
        >
          <Icon name="X" size={24} />
        </button>

        {/* Photo Counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 text-white rounded-full text-fluid-sm font-mono">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-gallery focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Previous photo"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-gallery focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Next photo"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        )}

        {/* Photo Container */}
        <div 
          className="max-w-full max-h-full flex items-center justify-center animate-scale-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={currentPhoto.src || currentPhoto.url}
            alt={currentPhoto.alt || currentPhoto.title || `Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-photo shadow-modal"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          />
        </div>

        {/* Photo Info */}
        {(currentPhoto.title || currentPhoto.description || currentPhoto.date) && (
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white rounded-gallery p-4 max-w-md mx-auto">
            {currentPhoto.title && (
              <h3 className="text-fluid-lg font-heading font-semibold mb-1">
                {currentPhoto.title}
              </h3>
            )}
            {currentPhoto.description && (
              <p className="text-fluid-sm text-gray-200 mb-2">
                {currentPhoto.description}
              </p>
            )}
            {currentPhoto.date && (
              <p className="text-fluid-xs font-mono text-gray-300">
                {currentPhoto.date}
              </p>
            )}
          </div>
        )}

        {/* Thumbnail Navigation */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2 max-w-xs overflow-x-auto">
            {photos.slice(Math.max(0, currentIndex - 2), Math.min(photos.length, currentIndex + 3)).map((photo, index) => {
              const actualIndex = Math.max(0, currentIndex - 2) + index;
              return (
                <button
                  key={actualIndex}
                  onClick={() => onIndexChange?.(actualIndex)}
                  className={`flex-shrink-0 w-12 h-12 rounded-photo overflow-hidden border-2 transition-gallery ${
                    actualIndex === currentIndex 
                      ? 'border-accent' :'border-transparent hover:border-white/50'
                  }`}
                >
                  <Image
                    src={photo.thumbnail || photo.src || photo.url}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoModal;