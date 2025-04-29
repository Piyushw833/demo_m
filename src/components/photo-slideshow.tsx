
'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface PhotoSlideshowProps {
  photos: string[];
  musicUrl: string;
}

const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({ photos, musicUrl }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error)); // Basic error handling
      }
      setIsPlaying(!isPlaying);
    }
  };

   const toggleMute = () => {
     if (audioRef.current) {
       audioRef.current.muted = !audioRef.current.muted;
       setIsMuted(audioRef.current.muted);
     }
   };

   React.useEffect(() => {
     // Clean up audio element when component unmounts
     return () => {
       if (audioRef.current) {
         audioRef.current.pause();
         // eslint-disable-next-line react-hooks/exhaustive-deps
         audioRef.current.src = ''; // Release audio resource
       }
     };
   }, []);


  return (
    <div className="space-y-4">
       <p className="text-center text-muted-foreground text-sm italic">A few of our cherished moments...</p>
      <Card className="overflow-hidden shadow-lg rounded-lg border-accent">
        <CardContent className="p-0 relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {photos.map((photo, index) => (
                <div className="flex-[0_0_100%] min-w-0 relative aspect-video bg-black" key={index}> {/* Added black background */}
                  <Image
                    src={photo}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="contain" // Changed from "cover" to "contain"
                    className="transition-opacity duration-500 ease-in-out"
                    priority={index === 0} // Prioritize loading the first image
                    unoptimized // Added this to potentially help with local images if optimization is causing issues
                  />
                </div>
              ))}
            </div>
          </div>
           {/* Carousel Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Audio Element (Hidden) */}
          <audio ref={audioRef} src={musicUrl} loop preload="metadata" />

        </CardContent>
      </Card>

       {/* Music Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
         <Button variant="outline" size="icon" onClick={togglePlayPause} aria-label={isPlaying ? "Pause music" : "Play music"} className="rounded-full border-accent text-accent hover:bg-accent/10">
           {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
         </Button>
         <Button variant="outline" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute music" : "Mute music"} className="rounded-full border-accent text-accent hover:bg-accent/10">
           {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
         </Button>
      </div>
    </div>
  );
};

export default PhotoSlideshow;

