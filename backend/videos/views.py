from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Video
from .serializers import VideoSerializer
from .tasks import fetch_youtube_videos
from django.db.models import Q

class VideoFilter(filters.FilterSet):
    keyword = filters.CharFilter(method='filter_keyword')
    min_likes = filters.NumberFilter(field_name='like_count', lookup_expr='gte')
    date_range = filters.DateTimeFromToRangeFilter(field_name='published_date')
    ordering = filters.OrderingFilter(
        fields=(
            ('published_date', 'published_date'),
            ('like_count', 'likes'),
            ('view_count', 'views'),
        )
    )

    def filter_keyword(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(description__icontains=value)
        )

    class Meta:
        model = Video
        fields = ['keyword', 'min_likes', 'date_range']

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filterset_class = VideoFilter
    http_method_names = ['get', 'post']

    @action(detail=False, methods=['post'])
    def search_youtube(self, request):
        query = request.data.get('query')
        if not query:
            return Response(
                {'error': 'Query parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        task = fetch_youtube_videos.delay(query)
        
        return Response({
            'message': 'YouTube search initiated',
            'task_id': task.id
        }, status=status.HTTP_202_ACCEPTED)
