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
 * Converts relative time strings (e.g. "3 days ago") to ISO date string (YYYY-MM-DD)
 */
export function parseRelativeDate(timeStr?: string): string {
  const now = new Date();
  if (!timeStr) return now.toISOString().substring(0, 10);

  const lower = timeStr.toLowerCase();
  const numMatch = lower.match(/\d+/);
  const num = numMatch ? parseInt(numMatch[0], 10) : 1;

  if (lower.includes('hour')) {
    now.setHours(now.getHours() - num);
  } else if (lower.includes('day')) {
    now.setDate(now.getDate() - num);
  } else if (lower.includes('week')) {
    now.setDate(now.getDate() - num * 7);
  } else if (lower.includes('month')) {
    now.setMonth(now.getMonth() - num);
  } else if (lower.includes('year')) {
    now.setFullYear(now.getFullYear() - num);
  }

  return now.toISOString().substring(0, 10);
}

/**
 * Fetch latest videos directly from Online Munim YouTube Channel
 */
export async function fetchLatestYouTubeVideos(channelIdOrHandle: string = '@OnlineMunim'): Promise<SyncVideo[]> {
  try {
    // 1. If input is channel ID (starts with UC), try official YouTube RSS feed first
    if (channelIdOrHandle.startsWith('UC')) {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelIdOrHandle}`;
      const response = await fetch(feedUrl, {
        next: { revalidate: 1800 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (response.ok) {
        const xmlText = await response.text();
        const rssVideos = parseYouTubeRssFeed(xmlText);
        if (rssVideos.length > 0) return rssVideos;
      }
    }

    // 2. Fetch directly from YouTube channel videos page using handle or channel ID
    const handle = channelIdOrHandle.startsWith('UC')
      ? `channel/${channelIdOrHandle}`
      : channelIdOrHandle.startsWith('@')
        ? channelIdOrHandle
        : `@${channelIdOrHandle}`;

    const channelUrl = `https://www.youtube.com/${handle}/videos`;

    const response = await fetch(channelUrl, {
      next: { revalidate: 1800 }, // Auto revalidate cache every 30 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const startStr = 'ytInitialData = ';
    const idx = html.indexOf(startStr);

    if (idx === -1) {
      return [];
    }

    const jsonStart = idx + startStr.length;
    let endIdx = html.indexOf(';</script>', jsonStart);
    if (endIdx === -1) endIdx = html.indexOf('</script>', jsonStart);
    let jsonStr = html.substring(jsonStart, endIdx);
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

    const data = JSON.parse(jsonStr);

    const videos: SyncVideo[] = [];
    const seen = new Set<string>();
    let currentId = 500;

    function extractLockupVideos(obj: any) {
      if (!obj || typeof obj !== 'object') return;

      if (obj.lockupViewModel) {
        const lockup = obj.lockupViewModel;
        const contentId = lockup.contentId;
        const title = lockup.metadata?.lockupMetadataViewModel?.title?.content;

        if (contentId && title && !seen.has(contentId)) {
          seen.add(contentId);

          const rows = lockup.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows || [];
          let timeStr = '';
          for (const row of rows) {
            const parts = row.metadataParts || [];
            for (const p of parts) {
              const text = p.text?.content || '';
              if (
                text.includes('ago') ||
                text.includes('Streamed') ||
                text.includes('days') ||
                text.includes('hours') ||
                text.includes('months') ||
                text.includes('weeks')
              ) {
                timeStr = text;
              }
            }
          }

          const isShort = title.toLowerCase().includes('#shorts');
          const category = detectCategory(title, isShort);
          const createdAt = parseRelativeDate(timeStr);

          videos.push({
            id: currentId++,
            title,
            description: title,
            category,
            youtubeUrl: `https://youtu.be/${contentId}`,
            short: isShort,
            duration: isShort ? '00:59' : '10:00',
            difficulty: isShort ? 'Beginner' : 'Intermediate',
            createdAt
          });
        }
      }

      if (Array.isArray(obj)) {
        for (const item of obj) extractLockupVideos(item);
      } else {
        for (const key of Object.keys(obj)) {
          if (key !== 'trackingParams') extractLockupVideos(obj[key]);
        }
      }
    }

    extractLockupVideos(data);
    return videos;
  } catch (error) {
    console.error('YouTube Auto-Sync failed, using cached video dataset:', error);
    return [];
  }
}

