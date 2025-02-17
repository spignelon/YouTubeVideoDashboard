from django.contrib import admin
from .models import Video

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video_id', 'view_count', 'like_count', 'published_date')
    search_fields = ('title', 'description', 'video_id')
    list_filter = ('published_date',)