'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { generateShayari, type GenerateShayariInput } from '@/ai/flows/generate-shayari'; // Updated import path and types
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  relationshipDetails: z.string().min(10, {
    message: 'Please share a bit more about your relationship (at least 10 characters).',
  }).max(500, { message: 'Details cannot exceed 500 characters.' }),
});

interface AiShayariProps {
  girlfriendName: string;
}

const AiShayari: React.FC<AiShayariProps> = ({ girlfriendName }) => {
  const [shayari, setShayari] = React.useState<string | null>(null); // Renamed state variable
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relationshipDetails: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setShayari(null); // Clear previous shayari

    const inputData: GenerateShayariInput = { // Use updated input type
      girlfriendName,
      relationshipDetails: values.relationshipDetails,
    };

    try {
      const result = await generateShayari(inputData); // Call updated function
      setShayari(result.shayari); // Use updated output field name
       toast({
         title: '✨ Shayari Generated!', // Updated toast title
         description: 'Your personalized shayari is ready below.', // Updated toast description
         variant: 'default',
       });
    } catch (error) {
      console.error('Error generating shayari:', error); // Updated error message
      toast({
        title: '😔 Oh no!',
        description: 'Something went wrong while creating the shayari. Please try again.', // Updated toast description
        variant: 'destructive',
      });
       setShayari("Sorry, I couldn't create a shayari right now. Maybe tell me something different?"); // Updated fallback message
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent shadow-md">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary-foreground">
             <Wand2 className="w-5 h-5" /> A Little Magic Just For You
           </CardTitle>
           <CardDescription className="text-muted-foreground">
            Share a few details or memories, and I'll write a special shayari for {girlfriendName}. {/* Updated description */}
          </CardDescription>
         </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
             <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="relationshipDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Tell me something special:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`e.g., "Remember our first date at the coffee shop?" or "I love how we laugh together..."`}
                        className="resize-none bg-card border-primary/50 focus:ring-accent"
                        rows={4}
                        {...field}
                        aria-describedby="details-description"
                      />
                    </FormControl>
                     <p id="details-description" className="text-xs text-muted-foreground pt-1">Share a cherished memory, a special inside joke, or something you love about her.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </CardContent>
             <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conjuring Shayari... {/* Updated button text */}
                  </>
                ) : (
                  <>
                   <Wand2 className="mr-2 h-4 w-4" />
                    Generate Shayari {/* Updated button text */}
                  </>
                )}
              </Button>
             </CardFooter>
          </form>
        </Form>
      </Card>

      {shayari && ( // Use updated state variable
        <Card className="mt-6 bg-secondary shadow-inner animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-secondary-foreground">Your Custom Shayari:</CardTitle> {/* Updated card title */}
          </CardHeader>
          <CardContent>
             <ScrollArea className="h-48 w-full rounded-md border border-primary/30 p-4 bg-card">
               {/* Consider using a font better suited for Hindi/Urdu if needed */}
               <pre className="whitespace-pre-wrap text-sm font-serif leading-relaxed text-card-foreground">
                 {shayari} {/* Use updated state variable */}
               </pre>
             </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiShayari; // Renamed export
