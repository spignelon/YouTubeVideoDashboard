export interface Video {
  id: number;
  video_id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
  view_count: number;
  like_count: number;
  published_date: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Video[];
}

export interface FilterParams {
  keyword?: string;
  min_likes?: number;
  date_range_after?: string;
  date_range_before?: string;
  page?: number;
  ordering?: string;
}