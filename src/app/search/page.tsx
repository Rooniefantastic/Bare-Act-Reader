
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { legalActs } from '@/lib/legal-data';
import type { Act, Chapter, Section } from '@/lib/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { Skeleton } from '@/components/ui/skeleton';
import { slugify } from '@/lib/utils';

interface SearchResult {
  act: Act;
  chapter: Chapter;
  section: Section;
}

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const newResults: SearchResult[] = [];

      for (const act of legalActs) {
        for (const chapter of act.chapters) {
          for (const section of chapter.sections) {
            if (
              act.act_name.toLowerCase().includes(lowerCaseQuery) ||
              (chapter.chapter_title && chapter.chapter_title.toLowerCase().includes(lowerCaseQuery)) ||
              (section.section_title && section.section_title.toLowerCase().includes(lowerCaseQuery)) ||
              `section ${section.section_number}`.toLowerCase().includes(lowerCaseQuery) ||
              section.text.toLowerCase().includes(lowerCaseQuery)
            ) {
              newResults.push({ act, chapter, section });
            }
          }
        }
      }
      setResults(newResults);
    } else {
      setResults([]);
    }
    // Artificial delay to show loading state
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <header className="mb-8">
          <Link href="/"><h1 className="text-4xl font-headline font-bold text-primary mb-2">Search</h1></Link>
          <div className="w-full max-w-2xl mt-4">
             <SearchForm />
          </div>
        </header>

        <main>
          {loading ? (
             <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
             </div>
          ) : query ? (
            <div>
              <p className="text-muted-foreground mb-4">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for <span className="text-foreground font-semibold">"{query}"</span>
              </p>
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map(({ act, chapter, section }) => (
                    <Link key={`${act.act_name}-${section.section_number}`} href={`/act/${slugify(act.act_name)}/section/${section.section_number}`}>
                      <Card className="hover:bg-secondary transition-colors hover:border-primary">
                        <CardHeader>
                          <CardTitle className="text-lg">Section {section.section_number}{section.section_title && `: ${section.section_title}`}</CardTitle>
                          <CardDescription>{act.act_name} &rarr; Chapter {chapter.chapter_number}{chapter.chapter_title && `: ${chapter.chapter_title}`}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Results Found</CardTitle>
                    <CardDescription>Your search for "{query}" did not return any results. Please try a different term.</CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          ) : (
             <Card>
                <CardHeader>
                  <CardTitle>Search the Legal Library</CardTitle>
                  <CardDescription>Enter a term in the search bar above to find relevant sections, chapters, or acts.</CardDescription>
                </CardHeader>
              </Card>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageSkeleton />}>
            <SearchPageComponent />
        </Suspense>
    )
}

function SearchPageSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
                <header className="mb-8">
                    <Skeleton className="h-10 w-48 mb-2" />
                    <div className="w-full max-w-2xl mt-4">
                        <Skeleton className="h-12 w-full" />
                    </div>
                </header>
                <main>
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </main>
            </div>
        </div>
    )
}
