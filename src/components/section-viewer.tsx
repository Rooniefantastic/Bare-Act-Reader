
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { Copy, Share2, Bookmark, Minus, Plus, BookmarkCheck, FileText, MessageSquareQuote } from 'lucide-react';
import type { Section, Act } from '@/lib/types';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { slugify } from '@/lib/utils';

export function SectionViewer({ act, section }: { act: Act; section: Section }) {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(16);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const sectionId = `${slugify(act.act_name)}-${section.section_number}`;
  const isBookmarked = bookmarks.includes(sectionId);

  const handleCopy = () => {
    const textToCopy = `Section ${section.section_number}: ${section.section_title}\n\n${section.text}`;
    navigator.clipboard.writeText(textToCopy);
    toast({ title: "Copied to clipboard!" });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${act.act_name} - Section ${section.section_number}${section.section_title ? `: ${section.section_title}` : ''}`,
      text: `Check out Section ${section.section_number} of the ${act.act_name}:\n\n${section.text}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      handleCopy();
      toast({ title: "Share not available", description: "Content copied to clipboard instead." });
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(sectionId);
      toast({ title: "Bookmark removed" });
    } else {
      addBookmark(sectionId);
      toast({ title: "Bookmark added!" });
    }
  };

  const increaseFontSize = () => setFontSize(size => Math.min(size + 2, 32));
  const decreaseFontSize = () => setFontSize(size => Math.max(size - 2, 12));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
          Section {section.section_number}{section.section_title ? `: ${section.section_title}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant={isBookmarked ? "secondary" : "outline"} size="sm" onClick={toggleBookmark} className={isBookmarked ? 'bg-accent/80 hover:bg-accent' : ''}>
              {isBookmarked ? 
                <BookmarkCheck className="mr-2 h-4 w-4" /> : 
                <Bookmark className="mr-2 h-4 w-4" />
              }
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">Font Size:</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={decreaseFontSize} disabled={fontSize <= 12}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={increaseFontSize} disabled={fontSize >= 32}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
        </div>
        <Separator className="my-6" />
        <div style={{ fontSize: `${fontSize}px` }} className="text-foreground leading-relaxed transition-all duration-200 whitespace-pre-line">
            <div>
              <h3 className="font-headline font-semibold text-lg mb-4 flex items-center text-foreground">
                <FileText className="mr-3 h-5 w-5 text-primary"/>
                Section Text
              </h3>
              <div className="space-y-4">
                 {section.text}
              </div>
            </div>

            {section.explanation && (
              <div className="mt-8">
                <h3 className="font-headline font-semibold text-lg mb-4 flex items-center text-foreground">
                  <MessageSquareQuote className="mr-3 h-5 w-5 text-primary"/>
                  Explanation
                </h3>
                <div className="text-muted-foreground whitespace-pre-line">{section.explanation}</div>
              </div>
            )}
            
            {section.annotations && section.annotations.length > 0 && (
                <div className="pt-4 mt-8 border-t">
                  <h3 className="font-headline font-semibold text-lg mb-4 text-foreground">Annotations</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {section.annotations.map((anno) => (
                      <li key={anno.id} className="flex items-start">
                        <sup className="text-primary font-bold mr-1">{anno.id}</sup>
                        <span>{anno.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  )
}
