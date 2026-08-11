/**
 * YouTube Auto-Sync Utility for Online Munim Academy
 * Automatically fetches & parses newly uploaded videos from Online Munim YouTube Channel.
 */

export interface SyncVideo {
  id: number;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  featured?: boolean;
  short?: boolean;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
}

/**
 * Auto-detect category based on video title keywords
 */
export function detectCategory(title: string, isShort: boolean): string {
  const lowerTitle = title.toLowerCase();

  if (isShort) return 'Shorts';
  if (lowerTitle.includes('rfid')) return 'RFID';
  if (lowerTitle.includes('bill') || lowerTitle.includes('invoice') || lowerTitle.includes('pos')) return 'Billing';
  if (lowerTitle.includes('stock') || lowerTitle.includes('inventory')) return 'Inventory';
  if (lowerTitle.includes('karigar') || lowerTitle.includes('wastage') || lowerTitle.includes('worker')) return 'Karigar Module';
  if (lowerTitle.includes('loan') || lowerTitle.includes('girvi') || lowerTitle.includes('pawn')) return 'Gold Loan / Girvi';
  if (lowerTitle.includes('app') || lowerTitle.includes('mobile') || lowerTitle.includes('online')) return 'Mobile App';
  if (lowerTitle.includes('setup') || lowerTitle.includes('firm') || lowerTitle.includes('install')) return 'Software Setup';

  return 'Tips & Tricks';
}

/**
 * Parses YouTube XML RSS feed items into Video objects
 */
export function parseYouTubeRssFeed(xmlText: string, startId: number = 100): SyncVideo[] {
  const videos: SyncVideo[] = [];
  try {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    let currentId = startId;

    while ((match = entryRegex.exec(xmlText)) !== null) {
      const entryContent = match[1];

      const titleMatch = entryContent.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = entryContent.match(/<link rel="alternate" href="([\s\S]*?)"\/>/);
      const pubDateMatch = entryContent.match(/<published>([\s\S]*?)<\/published>/);
      const mediaDescMatch = entryContent.match(/<media:description>([\s\S]*?)<\/media:description>/);

      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
      const rawUrl = linkMatch ? linkMatch[1].trim() : '';
      const published = pubDateMatch ? pubDateMatch[1].substring(0, 10) : new Date().toISOString().substring(0, 10);
      const description = mediaDescMatch ? mediaDescMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : title;

      if (title && rawUrl) {
        const isShort = rawUrl.includes('/shorts/') || title.toLowerCase().includes('#shorts');
        const category = detectCategory(title, isShort);

        videos.push({
          id: currentId++,
          title,
          description: description.substring(0, 160) + (description.length > 160 ? '...' : ''),
          category,
          youtubeUrl: rawUrl,
          short: isShort,
          duration: isShort ? '00:59' : '10:00',
          difficulty: isShort ? 'Beginner' : 'Intermediate',
          createdAt: published
        });
      }
    }
  } catch (err) {
    console.error('Error parsing YouTube RSS feed:', err);
  }

  return videos;
}

/**
 * Fetch latest videos directly from Online Munim YouTube Channel
 */
export async function fetchLatestYouTubeVideos(channelIdOrHandle: string = '@OnlineMunim'): Promise<SyncVideo[]> {
  try {
    // YouTube RSS feed endpoint
    const feedUrl = channelIdOrHandle.startsWith('UC')
      ? `https://www.youtube.com/feeds/videos.xml?channel_id=${channelIdOrHandle}`
      : `https://www.youtube.com/feeds/videos.xml?user=${channelIdOrHandle.replace('@', '')}`;

    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 }, // Auto revalidate cache every 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return [];
    }

    const xmlText = await response.text();
    return parseYouTubeRssFeed(xmlText);
  } catch (error) {
    console.error('YouTube Auto-Sync failed, using cached video dataset:', error);
    return [];
  }
}
