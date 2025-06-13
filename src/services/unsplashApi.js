import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

if (!API_KEY) {
  console.error('Unsplash API key is missing. Please create a .env file with VITE_UNSPLASH_API_KEY=your_api_key');
}

const unsplashApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});

export const searchImages = async (query, page = 1) => {
  if (!API_KEY) {
    throw new Error('Unsplash API key is missing. Please add your API key to the .env file.');
  }

  try {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query,
        page,
        per_page: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const getImageDetails = async (id) => {
  if (!API_KEY) {
    throw new Error('Unsplash API key is missing. Please add your API key to the .env file.');
  }

  try {
    const response = await unsplashApi.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image details:', error);
    throw error;
  }
}; 