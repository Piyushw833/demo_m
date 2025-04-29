'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Feather } from 'lucide-react';

interface StaticShayariProps {
  shayariText: string;
}

const StaticShayari: React.FC<StaticShayariProps> = ({ shayariText }) => {
  return (
    <div className="space-y-6">
      <Card className="border-accent shadow-md">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary-foreground">
             <Feather className="w-5 h-5" /> A Few Words From The Heart
           </CardTitle>
         </CardHeader>
         <CardContent>
           <ScrollArea className="h-48 w-full rounded-md border border-primary/30 p-4 bg-card">
             {/* Render the static text preserving line breaks */}
             <pre className="whitespace-pre-wrap text-sm font-serif leading-relaxed text-card-foreground">
               {shayariText}
             </pre>
           </ScrollArea>
         </CardContent>
      </Card>
    </div>
  );
};

export default StaticShayari;
