'use client';

import * as React from 'react';
import { MessageCircleHeart, Images, Feather } from 'lucide-react';
import PersonalizedMessage from '@/components/personalized-message';
import PhotoSlideshow from '@/components/photo-slideshow';
import AiShayari from '@/components/ai-shayari'; // Renamed import
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';

// Define girlfriend's name here or fetch from an environment variable/config
const GIRLFRIEND_NAME = 'Maitri Babyyy ❤️'; // Updated girlfriend's name with heart emoji

// Define photos for the slideshow (now 10 photos)
const photos = [
  'https://picsum.photos/seed/gf1/600/400',
  'https://picsum.photos/seed/gf2/600/400',
  'https://picsum.photos/seed/gf3/600/400',
  'https://picsum.photos/seed/gf4/600/400',
  'https://picsum.photos/seed/gf5/600/400',
  'https://picsum.photos/seed/gf6/600/400',
  'https://picsum.photos/seed/gf7/600/400',
  'https://picsum.photos/seed/gf8/600/400',
  'https://picsum.photos/seed/gf9/600/400',
  'https://picsum.photos/seed/gf10/600/400',
];

// Define the multi-page message content
const messages = [
  // Page 1
  "Happy Birthday! 🎉 On this special day, I just wanted to remind you how incredibly amazing you are and how much joy you bring into my life every single day.",
  // Page 2
  "You make the world a brighter place just by being in it. I cherish every moment we spend together, from the big adventures to the quiet nights in.",
  // Page 3
  "Remember that time we [insert shared memory]? Thinking about it always brings a smile to my face. Moments like those are treasures.",
  // Page 4
  "I love your [mention a specific quality, e.g., kindness, laugh, determination]. It's one of the many things that make you uniquely you.",
  // Page 5
  "Thank you for your patience, your understanding, and for always being there for me. You're my rock and my best friend.",
  // Page 6
  "Looking ahead, I'm so excited for all the adventures still to come and the memories we'll create together.",
  // Page 7
  "Your dreams are important, and I'll always be here cheering you on every step of the way. Never stop reaching for the stars.",
  // Page 8
  "Every day with you feels like a gift. You've added so much color and happiness to my world.",
  // Page 9
  "May your birthday be filled with everything you wish for – laughter, love, cake, and maybe a little bit of sparkle!",
  // Page 10
  "Wishing you the happiest of birthdays, my love. May this year be your best one yet. I love you more than words can say."
];


// Placeholder background music URL (replace with an actual audio file URL)
const backgroundMusicUrl = '/background-music.mp3'; // Ensure you have this file in /public

export default function SweetSurprisePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-background to-secondary">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden animate-fade-in">
          <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
            {/* Updated CardTitle to use the GIRLFRIEND_NAME variable */}
            <CardTitle className="text-3xl font-bold tracking-tight">
              Happy Birthday, {GIRLFRIEND_NAME}!
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
                <TabsTrigger value="shayari" className="flex items-center gap-2 py-3 text-sm md:text-base"> {/* Renamed value and text */}
                  <Feather className="w-5 h-5" /> Shayari {/* Renamed text */}
                </TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="message" className="animate-slide-in">
                   {/* Pass messages array */}
                  <PersonalizedMessage girlfriendName={GIRLFRIEND_NAME} messages={messages} />
                </TabsContent>
                <TabsContent value="slideshow" className="animate-slide-in">
                  <PhotoSlideshow photos={photos} musicUrl={backgroundMusicUrl} />
                </TabsContent>
                <TabsContent value="shayari" className="animate-slide-in"> {/* Renamed value */}
                  <AiShayari girlfriendName={GIRLFRIEND_NAME} /> {/* Renamed component */}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Toaster />
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
