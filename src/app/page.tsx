'use client';

import * as React from 'react';
import { MessageCircleHeart, Images, Feather } from 'lucide-react';
import PersonalizedMessage from '@/components/personalized-message';
import PhotoSlideshow from '@/components/photo-slideshow';
import AiPoem from '@/components/ai-poem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster

// Define girlfriend's name here or fetch from an environment variable/config
const GIRLFRIEND_NAME = 'My Love'; // Replace with actual name

// Define photos for the slideshow
const photos = [
  'https://picsum.photos/seed/gf1/600/400',
  'https://picsum.photos/seed/gf2/600/400',
  'https://picsum.photos/seed/gf3/600/400',
  'https://picsum.photos/seed/gf4/600/400',
  'https://picsum.photos/seed/gf5/600/400',
];

// Placeholder background music URL (replace with an actual audio file URL)
const backgroundMusicUrl = '/background-music.mp3'; // Ensure you have this file in /public

export default function SweetSurprisePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-background to-secondary">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden animate-fade-in">
          <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Happy Birthday, {GIRLFRIEND_NAME}! &#x1F382; {/* Cake Emoji */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="message" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none">
                <TabsTrigger value="message" className="flex items-center gap-2 py-3 text-sm md:text-base">
                  <MessageCircleHeart className="w-5 h-5" /> Message
                </TabsTrigger>
                <TabsTrigger value="slideshow" className="flex items-center gap-2 py-3 text-sm md:text-base">
                  <Images className="w-5 h-5" /> Photos
                </TabsTrigger>
                <TabsTrigger value="poem" className="flex items-center gap-2 py-3 text-sm md:text-base">
                  <Feather className="w-5 h-5" /> Poem
                </TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="message" className="animate-slide-in">
                  <PersonalizedMessage girlfriendName={GIRLFRIEND_NAME} />
                </TabsContent>
                <TabsContent value="slideshow" className="animate-slide-in">
                  <PhotoSlideshow photos={photos} musicUrl={backgroundMusicUrl} />
                </TabsContent>
                <TabsContent value="poem" className="animate-slide-in">
                  <AiPoem girlfriendName={GIRLFRIEND_NAME} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Toaster /> {/* Add Toaster component here */}
    </>
  );
}

// Add simple animations in globals.css or tailwind.config.js if needed
// e.g., in globals.css:
/*
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes slide-in {
 from { opacity: 0; transform: translateX(20px); }
 to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in {
 animation: slide-in 0.4s ease-out forwards;
}
*/
