import { useEffect } from 'react';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          src={image.urls.full}
          alt={image.alt_description || 'Full size image'}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>Photo by {image.user.name}</h2>
          {image.description && <p>{image.description}</p>}
          <div className={styles.stats}>
            <span>❤️ {image.likes}</span>
            <span>👁️ {image.views}</span>
            <span>⬇️ {image.downloads}</span>
          </div>
          <a
            href={image.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 