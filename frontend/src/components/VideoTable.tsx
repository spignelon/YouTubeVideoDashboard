import React from 'react';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Video } from '../types';

interface VideoTableProps {
  videos: Video[];
  isLoading: boolean;
}

export const VideoTable: React.FC<VideoTableProps> = ({ videos, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <img 
                  src={video.thumbnail_url} 
                  alt={video.title}
                  className="h-20 w-36 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <a 
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    {video.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {video.like_count.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {video.view_count.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(video.published_date), 'MMM d, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};