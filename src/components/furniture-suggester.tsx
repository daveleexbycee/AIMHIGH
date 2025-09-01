"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Sparkles, Sofa, LoaderCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getFurnitureSuggestions } from "@/app/actions";
import type { SuggestFurnitureSetsOutput } from "@/ai/flows/suggest-furniture-sets";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  stylePreferences: z.string().min(1, "Please select a style."),
  budget: z.coerce.number().positive("Budget must be a positive number."),
  roomSize: z.string().min(1, "Please select a room size."),
});

const styleOptions = ["Modern", "Minimalist", "Rustic", "Scandinavian", "Industrial", "Bohemian"];
const roomSizeOptions = [
  { value: "Small", label: "Small (e.g., studio apartment)" },
  { value: "Medium", label: "Medium (e.g., standard bedroom)" },
  { value: "Large", label: "Large (e.g., open-plan living area)" },
];

export function FurnitureSuggester() {
  const [suggestions, setSuggestions] = useState<SuggestFurnitureSetsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stylePreferences: "Modern",
      budget: 1500,
      roomSize: "Medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions(null);

    const result = await getFurnitureSuggestions(values);

    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request.",
      });
    }
    setIsLoading(false);
  }
  
  const SKELETON_COUNT = 3;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 my-12">
      <Card className="bg-card/80 backdrop-blur-sm border-2 border-dashed">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Sparkles className="text-primary" />
            Need Ideas? Try our AI Suggester!
          </CardTitle>
          <CardDescription>Fill out the fields below and our AI will suggest some furniture sets for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="stylePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {styleOptions.map((style) => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomSizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get AI Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-8">
            <h2 className="text-3xl font-headline text-center">Finding your perfect furniture...</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className="h-48 w-full rounded-md" />
                            <CardTitle>
                                <Skeleton className="h-8 w-3/4 mt-4" />
                            </CardTitle>
                            <CardDescription>
                                <Skeleton className="h-4 w-full mt-2" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-5/6" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Skeleton className="h-8 w-1/3" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      )}

      {suggestions && suggestions.suggestedSets.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-3xl font-headline text-center">Here are your AI-powered suggestions!</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {suggestions.suggestedSets.map((set, index) => (
              <Link href={`/shop?q=${encodeURIComponent(set.setName)}`} key={index} className="block hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <div className="relative aspect-square w-full mb-4">
                      <Image src="https://placehold.co/600x400.png" alt={set.setName} fill className="rounded-md object-cover" data-ai-hint="living room furniture"/>
                    </div>
                    <CardTitle className="font-headline">{set.setName}</CardTitle>
                    <CardDescription>{set.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                      <h3 className="font-semibold">Items included:</h3>
                      <div className="flex flex-wrap gap-2">
                          {set.items.map((item, i) => (
                              <Badge key={i} variant="secondary">{item}</Badge>
                          ))}
                      </div>
                  </CardContent>
                  <CardFooter>
                      <p className="text-lg font-semibold text-primary">
                          Est. Price: ${set.estimatedPrice.toLocaleString()}
                      </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {suggestions && suggestions.suggestedSets.length === 0 && !isLoading && (
        <div className="text-center py-12">
            <Sofa className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No suggestions found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                We couldn't find any furniture sets matching your criteria. Try adjusting your budget or preferences.
            </p>
        </div>
      )}

    </div>
  );
}
