import React from 'react';
import { FilterParams } from '../types';

interface FiltersProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Likes
        </label>
        <input
          type="number"
          value={filters.min_likes || ''}
          onChange={(e) => onFilterChange({ ...filters, min_likes: Number(e.target.value) || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter minimum likes"
        />
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From Date
        </label>
        <input
          type="date"
          value={filters.date_range_after || ''}
          onChange={(e) => onFilterChange({ ...filters, date_range_after: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To Date
        </label>
        <input
          type="date"
          value={filters.date_range_before || ''}
          onChange={(e) => onFilterChange({ ...filters, date_range_before: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          value={filters.ordering || ''}
          onChange={(e) => onFilterChange({ ...filters, ordering: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="published_date">Date (Ascending)</option>
          <option value="-published_date">Date (Descending)</option>
          <option value="likes">Likes (Ascending)</option>
          <option value="-likes">Likes (Descending)</option>
          <option value="views">Views (Ascending)</option>
          <option value="-views">Views (Descending)</option>
        </select>
      </div>
    </div>
  );
};