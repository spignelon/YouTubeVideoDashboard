# YouTube Video Dashboard

A full-stack web application that allows you to search, fetch, and manage YouTube videos. Built with Django REST Framework and React.

![image](https://github.com/user-attachments/assets/8fd41b53-b468-4618-a131-28062723e9b9)


## Features

- 🎥 Search and fetch videos from YouTube
- 📊 Track video metrics (views, likes)
- 🔍 Advanced filtering and sorting options
- 📱 Responsive design for all devices
- ⚡ Real-time YouTube data fetching
- 🎯 Efficient caching with Redis

## Tech Stack

### Backend
- Django & Django REST Framework
- Celery for async tasks
- Redis for caching
- SQLite for database
- YouTube Data API v3

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8+
- Node.js 16+
- Redis Server
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/spignelon/YouTubeVideoDashboard.git
cd YouTubeVideoDashboard
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```bash
YOUTUBE_API_KEY=your_youtube_api_key
DJANGO_SECRET_KEY=your_django_secret_key
REDIS_URL=redis://localhost:6379/0
```
To create Django Secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

To get a YouTube API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the YouTube Data API v3
4. Create credentials (API key)
5. Copy the API key to your `.env` file

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Start the Redis server:
```bash
# On Linux/macOS
redis-server

# On Windows
# Start Redis server through Windows Subsystem for Linux (WSL) or using the Windows Redis installer
```

7. Start Celery worker:
```bash
celery -A youtubeapi worker --loglevel=info
```

8. Run the Django development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Use the search bar to search for existing videos in the database
3. Click "Search YouTube" to fetch new videos from YouTube
4. Use filters to narrow down results:
   - Set minimum likes
   - Filter by date range
   - Sort by various metrics
5. Click on video titles to open them on YouTube

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/videos/`: List all videos with pagination and filtering
- `POST /api/videos/search_youtube/`: Trigger YouTube video search

Query Parameters for `/api/videos/`:
- `keyword`: Search in title and description
- `min_likes`: Filter by minimum likes
- `date_range_after`: Filter by publish date (start)
- `date_range_before`: Filter by publish date (end)
- `ordering`: Sort by fields (prefix with `-` for descending)
- `page`: Page number for pagination

## License

This project is licensed under the AGPL-3.0 license - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
