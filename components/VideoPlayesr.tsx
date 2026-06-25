'use client'
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState('9 / 16');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      if (ratio > 0.9 && ratio < 1.1) setAspectRatio('1 / 1');
      else if (ratio < 0.6) setAspectRatio('9 / 16');
      else setAspectRatio('16 / 9');
    };
    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30, enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else { video.src = src; }
  }, [src]);

  return (
    <div className="relative w-full bg-black" style={{ aspectRatio: aspectRatio }}>
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
    </div>
  );
}
