from django.db import models

class Video(models.Model):
    video_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    url = models.URLField()
    thumbnail_url = models.URLField()
    view_count = models.BigIntegerField(default=0)
    like_count = models.BigIntegerField(default=0)
    published_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_date']
