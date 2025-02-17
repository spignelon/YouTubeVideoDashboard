import axios from 'axios';
import { FilterParams, ApiResponse } from './types';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getVideos = async (params: FilterParams): Promise<ApiResponse> => {
  const { data } = await api.get('/videos/', { params });
  return data;
};

export const searchYouTube = async (query: string): Promise<{ task_id: string }> => {
  const { data } = await api.post('/videos/search_youtube/', { query });
  return data;
};