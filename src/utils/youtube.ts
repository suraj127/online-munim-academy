/**
 * Extract YouTube Video ID from standard and short YouTube URLs
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  // Short URL: https://youtu.be/VIDEO_ID
  // Embed URL: https://www.youtube.com/embed/VIDEO_ID
  // Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Get high resolution thumbnail URL for a YouTube video
 */
export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  if (!id) return '/api/placeholder/480/270';
  
  // Max resolution default thumbnail
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

/**
 * Get embed URL for YouTube player iframe
 */
export function getYouTubeEmbedUrl(url: string, autoplay: boolean = false): string {
  const id = getYouTubeId(url);
  if (!id) return '';
  
  const autoplayParam = autoplay ? '?autoplay=1&mute=0' : '?autoplay=0';
  const divider = autoplayParam.includes('?') ? '&' : '?';
  
  // Disable related videos from other channels (rel=0)
  return `https://www.youtube.com/embed/${id}${autoplayParam}${divider}rel=0&enablejsapi=1`;
}
