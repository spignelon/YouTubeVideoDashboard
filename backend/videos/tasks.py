from celery import shared_task
from googleapiclient.discovery import build
from django.conf import settings
from datetime import datetime
from .models import Video
import isodate

@shared_task
def fetch_youtube_videos(query, max_results=10):
    youtube = build('youtube', 'v3', developerKey=settings.YOUTUBE_API_KEY)
    
    try:
        search_response = youtube.search().list(
            q=query,
            part='id,snippet',
            maxResults=max_results,
            type='video'
        ).execute()

        video_ids = [item['id']['videoId'] for item in search_response['items']]
        
        # Get detailed video information
        videos_response = youtube.videos().list(
            part='statistics,snippet',
            id=','.join(video_ids)
        ).execute()

        for item in videos_response['items']:
            Video.objects.update_or_create(
                video_id=item['id'],
                defaults={
                    'title': item['snippet']['title'],
                    'description': item['snippet']['description'],
                    'url': f'https://www.youtube.com/watch?v={item["id"]}',
                    'thumbnail_url': item['snippet']['thumbnails']['high']['url'],
                    'view_count': int(item['statistics'].get('viewCount', 0)),
                    'like_count': int(item['statistics'].get('likeCount', 0)),
                    'published_date': datetime.strptime(
                        item['snippet']['publishedAt'], 
                        '%Y-%m-%dT%H:%M:%SZ'
                    )
                }
            )

        return {'status': 'success', 'videos_processed': len(video_ids)}
    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
