
'use client';

import * as React from 'react';
import { Gift, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Import cn utility

interface LandingPageProps {
  onComplete: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Trigger fade-in animation on mount and step change
    setIsVisible(false); // Reset visibility to trigger transition
    const timer = setTimeout(() => setIsVisible(true), 100); // Short delay allows CSS transition to catch up
    return () => clearTimeout(timer);
  }, [step]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div
            className={cn(
              "text-center transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={handleNextStep} // Click anywhere on text to proceed
            style={{ cursor: 'pointer' }} // Add pointer cursor
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-pulse">
              Hello Maitri <Heart className="inline-block w-8 h-8 fill-current text-accent" />
            </h1>
            <p className="text-lg text-foreground/80">(Tap to continue)</p>
          </div>
        );
      case 1:
        return (
          <div
            className={cn(
              "text-center transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0"
            )}
             onClick={handleNextStep} // Click anywhere on text to proceed
             style={{ cursor: 'pointer' }} // Add pointer cursor
          >
            <Gift className="w-16 h-16 mx-auto mb-6 text-accent animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Click on the surprise box!
            </h2>
            <p className="text-lg text-foreground/80">(Tap to continue)</p>
          </div>
        );
      case 2:
        return (
          <div
            className={cn(
              "text-center transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              size="lg"
              className="animate-pop-in bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200"
              onClick={onComplete} // Trigger the final transition to the main content
            >
              <Gift className="mr-2 h-5 w-5" />
              Piyush has given you something, just open it!
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-md p-8 rounded-xl bg-card shadow-xl">
      {renderStepContent()}
    </div>
  );
};

export default LandingPage;
