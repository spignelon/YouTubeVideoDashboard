import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { VideoTable } from './components/VideoTable';
import { Pagination } from './components/Pagination';
import { getVideos, searchYouTube } from './api';
import { FilterParams, Video, ApiResponse } from './types';
import { Youtube } from 'lucide-react';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({});
  const [searchMessage, setSearchMessage] = useState('');

  const fetchVideos = async (params: FilterParams) => {
    try {
      setIsLoading(true);
      const response = await getVideos(params);
      setVideos(response.results);
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos({ ...filters, page: currentPage });
  }, [currentPage, filters]);

  const handleSearch = (query: string) => {
    setFilters({ ...filters, keyword: query });
    setCurrentPage(1);
  };

  const handleYouTubeSearch = async (query: string) => {
    try {
      setSearchMessage('Searching YouTube...');
      const response = await searchYouTube(query);
      setSearchMessage('YouTube search initiated! Results will appear soon.');
      setTimeout(() => {
        fetchVideos({ ...filters, page: 1 });
        setSearchMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      setSearchMessage('Error searching YouTube. Please try again.');
    }
  };

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Youtube className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            YouTube Video Dashboard
          </h1>
        </div>

        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} onYouTubeSearch={handleYouTubeSearch} />
          
          {searchMessage && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">{searchMessage}</p>
            </div>
          )}

          <Filters filters={filters} onFilterChange={handleFilterChange} />

          <div className="bg-white shadow rounded-lg">
            <VideoTable videos={videos} isLoading={isLoading} />
            <Pagination
              currentPage={currentPage}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;