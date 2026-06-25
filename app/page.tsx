import VideoPlayer from '@/components/VideoPlayer';

const videos = [
  { id: 1, url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 2, url: 'https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30aef6.gif/video.m3u8' },
];

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map(v => (
        <div key={v.id} className="h-screen w-full snap-start flex items-center justify-center">
          <VideoPlayer src={v.url} />
        </div>
      ))}
    </main>
  );
}
