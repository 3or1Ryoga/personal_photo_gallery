import React, { useState, useEffect, useMemo } from 'react';
import Header from 'components/ui/Header';
import PhotoModal from 'components/ui/PhotoModal';
import PhotoGrid from './components/PhotoGrid';
import LoadingGrid from './components/LoadingGrid';
import Icon from 'components/AppIcon';

function PhotoGalleryHomepage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'

  // Mock photo data - simulating photos from public/images directory
  const mockPhotos = useMemo(() => [
    {
      id: 1,
      filename: '01.jpg',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      alt: 'Mountain landscape with lake reflection',
      title: 'Serene Mountain Lake',
      description: 'A peaceful mountain lake reflecting the surrounding peaks during golden hour.',
      date: 'March 15, 2024',
      width: 800,
      height: 600
    },
    {
      id: 2,
      filename: '02.jpg',
      src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?w=800&h=1200&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?w=400&h=600&fit=crop',
      alt: 'Forest path through tall trees',
      title: 'Forest Pathway',
      description: 'A winding path through ancient forest trees creating natural archways.',
      date: 'March 12, 2024',
      width: 800,
      height: 1200
    },
    {
      id: 3,
      filename: '03.jpg',
      src: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=800&h=600&fit=crop',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=400&h=300&fit=crop',
      alt: 'Starry night sky over mountains',
      title: 'Starlit Mountains',
      description: 'Milky Way galaxy visible over mountain silhouettes on a clear night.',
      date: 'March 10, 2024',
      width: 800,
      height: 600
    },
    {
      id: 4,
      filename: '04.jpg',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=800&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop',
      alt: 'Ocean waves at sunset',
      title: 'Ocean Sunset',
      description: 'Gentle waves rolling onto shore during a vibrant sunset.',
      date: 'March 8, 2024',
      width: 800,
      height: 800
    },
    {
      id: 5,
      filename: '05.jpg',
      src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=800&h=1000&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=400&h=500&fit=crop',
      alt: 'Desert landscape with cacti',
      title: 'Desert Bloom',
      description: 'Colorful wildflowers blooming among desert cacti after spring rain.',
      date: 'March 5, 2024',
      width: 800,
      height: 1000
    },
    {
      id: 6,
      filename: '06.jpg',
      src: 'https://images.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg?w=800&h=600&fit=crop',
      thumbnail: 'https://images.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg?w=400&h=300&fit=crop',
      alt: 'Misty forest with sunbeams',
      title: 'Enchanted Forest',
      description: 'Sunbeams filtering through misty forest creating magical atmosphere.',
      date: 'March 3, 2024',
      width: 800,
      height: 600
    },
    {
      id: 7,
      filename: '07.jpg',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=900&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop',
      alt: 'Alpine meadow with wildflowers',
      title: 'Alpine Meadow',
      description: 'Colorful wildflowers carpeting a high alpine meadow in summer.',
      date: 'March 1, 2024',
      width: 800,
      height: 900
    },
    {
      id: 8,
      filename: '08.jpg',
      src: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?w=800&h=600&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?w=400&h=300&fit=crop',
      alt: 'Coastal cliffs and ocean',
      title: 'Dramatic Coastline',
      description: 'Rugged coastal cliffs meeting the endless ocean horizon.',
      date: 'February 28, 2024',
      width: 800,
      height: 600
    },
    {
      id: 9,
      filename: '09.jpg',
      src: 'https://images.pixabay.com/photo/2016/11/21/16/05/landscape-1846734_1280.jpg?w=800&h=1100&fit=crop',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/21/16/05/landscape-1846734_1280.jpg?w=400&h=550&fit=crop',
      alt: 'Autumn forest reflection',
      title: 'Autumn Reflections',
      description: 'Fall foliage reflected perfectly in a calm forest lake.',
      date: 'February 25, 2024',
      width: 800,
      height: 1100
    },
    {
      id: 10,
      filename: '10.jpg',
      src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      alt: 'Snowy mountain peaks',
      title: 'Winter Peaks',
      description: 'Snow-capped mountain peaks gleaming in morning sunlight.',
      date: 'February 22, 2024',
      width: 800,
      height: 600
    },
    {
      id: 11,
      filename: '11.jpg',
      src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=800&h=800&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=400&h=400&fit=crop',
      alt: 'Tropical beach paradise',
      title: 'Tropical Paradise',
      description: 'Crystal clear waters and white sand beach surrounded by palm trees.',
      date: 'February 20, 2024',
      width: 800,
      height: 800
    },
    {
      id: 12,
      filename: '12.jpg',
      src: 'https://images.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg?w=800&h=950&fit=crop',
      thumbnail: 'https://images.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg?w=400&h=475&fit=crop',
      alt: 'Waterfall in tropical jungle',
      title: 'Hidden Waterfall',
      description: 'A secluded waterfall cascading through lush tropical vegetation.',
      date: 'February 18, 2024',
      width: 800,
      height: 950
    },
    {
      id: 13, // ユニークなIDを設定
      filename: 'woman.png',
      src: '/assets/images/woman.png', // publicディレクトリからの相対パス
      thumbnail: '/assets/images/woman.png', // 同じくサムネイルも相対パス
      alt: 'Portrait of a woman',
      title: 'Woman Portrait',
      description: 'A stylish portrait of a woman.',
      date: 'June 24, 2025', // 今日の日付などに更新
      width: 1000, // 画像の実際の幅を設定
      height: 1000 // 画像の実際の高さを設定
    },
    {
      id: 14, // ユニークなIDを設定
      filename: 'miselive.jpg',
      src: '/assets/images/miselive.jpg', // publicディレクトリからの相対パス
      thumbnail: '/assets/images/miselive.jpg', // 同じくサムネイルも相対パス
      alt: 'Miselive',
      title: 'Miselive',
      description: 'A stylish portrait of a woman.',
      date: 'June 24, 2025', // 今日の日付などに更新
      width: 1000, // 画像の実際の幅を設定
      height: 1000 // 画像の実際の高さを設定
    },
  ], []);

  // Simulate loading photos from directory
  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sort photos by filename (01.jpg, 02.jpg format)
      const sortedPhotos = [...mockPhotos].sort((a, b) => {
        const aNum = parseInt(a.filename.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.filename.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
      
      setPhotos(sortedPhotos);
      setLoading(false);
    };

    loadPhotos();
  }, [mockPhotos]);

  // Photo modal handlers
  const openPhotoModal = (index) => {
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setSelectedPhotoIndex(null);
  };

  const goToNextPhoto = () => {
    if (selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const goToPreviousPhoto = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const goToPhotoIndex = (index) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-gray-50/50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-primary mb-4">
              Personal Photo Gallery
            </h1>
            <p className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto mb-8">
              A curated collection of moments captured through my lens. Each image tells a story of adventure, beauty, and discovery.
            </p>
            
            {/* Gallery Stats */}
            <div className="flex items-center justify-center space-x-8 text-sm lg:text-base">
              <div className="flex items-center space-x-2">
                <Icon name="Image" size={20} className="text-accent" />
                <span className="text-secondary">
                  {loading ? '...' : photos.length} Photos
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={20} className="text-accent" />
                <span className="text-secondary">Updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Controls */}
        <section className="py-6 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-heading font-semibold text-primary">
                  Gallery View
                </h2>
                {!loading && (
                  <span className="text-sm text-secondary">
                    {photos.length} images
                  </span>
                )}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-gallery p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-gallery transition-gallery ${
                    viewMode === 'grid' ?'bg-white text-accent shadow-sm' :'text-secondary hover:text-primary'
                  }`}
                  aria-label="Grid view"
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-gallery transition-gallery ${
                    viewMode === 'masonry' ?'bg-white text-accent shadow-sm' :'text-secondary hover:text-primary'
                  }`}
                  aria-label="Masonry view"
                >
                  <Icon name="LayoutGrid" size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <LoadingGrid />
            ) : (
              <PhotoGrid
                photos={photos}
                viewMode={viewMode}
                onPhotoClick={openPhotoModal}
              />
            )}
          </div>
        </section>

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <section className="py-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Icon name="ImageOff" size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                No Photos Found
              </h3>
              <p className="text-secondary">
                Add some photos to your gallery to get started.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Photo Modal */}
      <PhotoModal
        photos={photos}
        currentIndex={selectedPhotoIndex}
        isOpen={isModalOpen}
        onClose={closePhotoModal}
        onNext={goToNextPhoto}
        onPrevious={goToPreviousPhoto}
        onIndexChange={goToPhotoIndex}
      />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Personal Photo Gallery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PhotoGalleryHomepage;