import { useEffect, useRef } from 'react';
import styles from './ImageGrid.module.css';

const ImageGrid = ({ images, onImageClick, onLoadMore, hasMore, loading }) => {
  const observerRef = useRef(null);
  const lastImageRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    if (lastImageRef.current) {
      observerRef.current.observe(lastImageRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [images, loading, hasMore, onLoadMore]);

  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={index === images.length - 1 ? lastImageRef : null}
          className={styles.imageContainer}
          onClick={() => onImageClick(image)}
        >
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash image'}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.overlay}>
            <p className={styles.photographer}>
              Photo by {image.user.name}
            </p>
          </div>
        </div>
      ))}
      {loading && (
        <div className={styles.loading}>
          Loading more images...
        </div>
      )}
    </div>
  );
};

export default ImageGrid; 