import { useState, useEffect, useCallback } from 'react';
import { searchImages } from '../services/unsplashApi';

export const useImageSearch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const search = useCallback(async (query) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    setPage(1);
    
    try {
      const data = await searchImages(query, 1);
      setImages(data.results);
      setHasMore(data.total_pages > 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async (query) => {
    if (!query || !hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await searchImages(query, nextPage);
      setImages(prev => [...prev, ...data.results]);
      setPage(nextPage);
      setHasMore(nextPage < data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  return {
    images,
    loading,
    error,
    search,
    loadMore,
    hasMore
  };
}; 