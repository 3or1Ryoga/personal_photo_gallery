import React from 'react';

function LoadingGrid() {
  // Create array of skeleton items with varying heights for masonry effect
  const skeletonItems = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    height: Math.floor(Math.random() * 200) + 200 // Random height between 200-400px
  }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
      {skeletonItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200 rounded-gallery animate-pulse aspect-square"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;