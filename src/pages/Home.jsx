import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import ImageModal from '../components/ImageModal/ImageModal';
import { useImageSearch } from '../hooks/useImageSearch';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { images, loading, error, search, loadMore, hasMore } = useImageSearch();

  const handleSearch = (query) => {
    setSearchQuery(query);
    search(query);
  };

  const handleLoadMore = () => {
    loadMore(searchQuery);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const isApiKeyMissing = error?.includes('API key is missing');

  return (
    <div className="page-container" style={{width: '100%', maxWidth: '100vw', margin: 0, padding: '2rem 1rem', boxSizing: 'border-box'}}>
      <h1>Поиск изображений Unsplash</h1>
      <SearchBar onSearch={handleSearch} />
      {isApiKeyMissing ? (
        <div className="error">
          <h2>Setup Required</h2>
          <p>To use this application, you need to:</p>
          <ol>
            <li>Create a free account at <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer">Unsplash Developers</a></li>
            <li>Create a new application to get your API key</li>
            <li>Create a <code>.env</code> file in the project root</li>
            <li>Add your API key: <code>VITE_UNSPLASH_API_KEY=your_api_key_here</code></li>
          </ol>
        </div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : images.length > 0 ? (
        <ImageGrid
          images={images}
          onImageClick={handleImageClick}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
        />
      ) : !loading && searchQuery && (
        <div className="noResults">
          No images found for "{searchQuery}"
        </div>
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
