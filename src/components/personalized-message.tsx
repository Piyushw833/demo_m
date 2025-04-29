
'use client';

import * as React from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersonalizedMessageProps {
  girlfriendName: string;
  messages: string[]; // Array of message strings for each page
  yourName: string; // Add prop for your name
}

const PersonalizedMessage: React.FC<PersonalizedMessageProps> = ({ girlfriendName, messages, yourName }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = messages.length;

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Add placeholder if messages array is empty or page index is out of bounds
  const currentMessage = messages[currentPage] || "No message provided for this page.";

  return (
    <div className="text-center space-y-6 p-4 flex flex-col justify-between min-h-[300px]">
      <div>
        <h2 className="text-2xl font-semibold text-primary-foreground mb-4">
          To my dearest {girlfriendName},
        </h2>
        {/* Render message content with line breaks */}
        <div className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
          {currentMessage}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
            aria-label="Previous Message"
            className="border-accent text-accent hover:bg-accent/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next Message"
            className="border-accent text-accent hover:bg-accent/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Footer on last page */}
        {currentPage === totalPages - 1 && (
          <div className="flex flex-col items-center space-y-2 text-accent mt-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 animate-pulse fill-current" />
              <span className="text-xl font-semibold">With all my love,</span>
              <Heart className="w-6 h-6 animate-pulse fill-current" />
            </div>
            <p className="text-lg font-medium text-primary-foreground">
              {yourName} {/* Use the yourName prop */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedMessage;
