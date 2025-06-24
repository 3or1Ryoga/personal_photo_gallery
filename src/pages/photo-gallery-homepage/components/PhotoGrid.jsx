import React from 'react';
import PhotoCard from './PhotoCard';

function PhotoGrid({ photos = [], viewMode = 'grid', onPhotoClick }) {
  const gridClasses = {
    grid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6',
    masonry: 'columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 lg:gap-6 space-y-4 lg:space-y-6'
  };

  if (viewMode === 'masonry') {
    return (
      <div className={gridClasses.masonry}>
        {photos.map((photo, index) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoCard
              photo={photo}
              index={index}
              onClick={() => onPhotoClick(index)}
              viewMode={viewMode}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={gridClasses.grid}>
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          index={index}
          onClick={() => onPhotoClick(index)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;