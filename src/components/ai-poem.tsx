'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { generatePoem, type GeneratePoemInput } from '@/ai/flows/generate-poem'; // Correct import path
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

interface AiPoemProps {
  girlfriendName: string;
}

const AiPoem: React.FC<AiPoemProps> = ({ girlfriendName }) => {
  const [poem, setPoem] = React.useState<string | null>(null);
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
    setPoem(null); // Clear previous poem

    const inputData: GeneratePoemInput = {
      girlfriendName,
      relationshipDetails: values.relationshipDetails,
    };

    try {
      const result = await generatePoem(inputData);
      setPoem(result.poem);
       toast({
         title: '✨ Poem Generated!',
         description: 'Your personalized poem is ready below.',
         variant: 'default', // Or use a custom success variant if defined
       });
    } catch (error) {
      console.error('Error generating poem:', error);
      toast({
        title: '😔 Oh no!',
        description: 'Something went wrong while creating the poem. Please try again.',
        variant: 'destructive',
      });
       setPoem("Sorry, I couldn't create a poem right now. Maybe tell me something different?");
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
            Share a few details or memories, and I'll write a special poem for {girlfriendName}.
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
                    Conjuring Poem...
                  </>
                ) : (
                  <>
                   <Wand2 className="mr-2 h-4 w-4" />
                    Generate Poem
                  </>
                )}
              </Button>
             </CardFooter>
          </form>
        </Form>
      </Card>

      {poem && (
        <Card className="mt-6 bg-secondary shadow-inner animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-secondary-foreground">Your Custom Poem:</CardTitle>
          </CardHeader>
          <CardContent>
             <ScrollArea className="h-48 w-full rounded-md border border-primary/30 p-4 bg-card">
               <pre className="whitespace-pre-wrap text-sm font-serif leading-relaxed text-card-foreground">
                 {poem}
               </pre>
             </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AiPoem;
