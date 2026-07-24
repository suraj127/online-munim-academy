import VideoPlayerClient from './VideoPlayerClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params;
  const initialId = parseInt(id, 10);
  
  return <VideoPlayerClient initialId={initialId} />;
}
