'use client';

import type * as React from 'react';
import { Heart } from 'lucide-react';

interface PersonalizedMessageProps {
  girlfriendName: string;
}

const PersonalizedMessage: React.FC<PersonalizedMessageProps> = ({ girlfriendName }) => {
  return (
    <div className="text-center space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-primary-foreground">
        To my dearest {girlfriendName},
      </h2>
      <p className="text-lg leading-relaxed text-foreground/90">
        Happy Birthday! 🎉 On this special day, I just wanted to remind you how incredibly amazing you are and how much joy you bring into my life every single day.
      </p>
      <p className="text-lg leading-relaxed text-foreground/90">
        You make the world a brighter place just by being in it. I cherish every moment we spend together, from the big adventures to the quiet nights in.
      </p>
      <p className="text-lg font-medium text-primary-foreground">
        Wishing you a day filled with love, laughter, and everything that makes you happy.
      </p>
      <div className="flex justify-center items-center space-x-2 text-accent">
         <Heart className="w-6 h-6 animate-pulse fill-current" />
         <span className="text-xl font-semibold">With all my love,</span>
         <Heart className="w-6 h-6 animate-pulse fill-current" />
      </div>
       <p className="text-lg font-medium text-primary-foreground">
         [Your Name] {/* Replace with your actual name */}
       </p>
    </div>
  );
};

export default PersonalizedMessage;
