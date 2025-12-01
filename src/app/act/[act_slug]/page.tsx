
"use client";

import { useState, useMemo, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { legalActs } from '@/lib/legal-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { FileText, Search as SearchIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Chapter, Section, Schedule } from '@/lib/types';
import { slugify } from '@/lib/utils';

export default function ActPage({ params }: { params: { act_slug: string } }) {
  const { act_slug } = params;
  const act = useMemo(() => legalActs.find((a) => slugify(a.act_name) === act_slug), [act_slug]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  if (!act) {
    notFound();
  }

  const hasChapters = act.chapters && act.chapters.length > 0;
  const hasSchedules = act.schedules && act.schedules.length > 0;

  const filterSections = (sections: Section[]) => {
    if (!searchQuery) return sections;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return sections.filter(section => 
      section.section_number.toLowerCase().includes(lowerCaseQuery) ||
      (section.section_title && section.section_title.toLowerCase().includes(lowerCaseQuery)) ||
      section.text.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filteredChapters = useMemo(() => {
    if (!hasChapters || !searchQuery) {
      return act.chapters || [];
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return (act.chapters || [])
      .map(chapter => {
        const filteredSections = filterSections(chapter.sections);
        const chapterTitleMatch = chapter.chapter_title && chapter.chapter_title.toLowerCase().includes(lowerCaseQuery);

        if (chapterTitleMatch || filteredSections.length > 0) {
          return { ...chapter, sections: filteredSections.length > 0 ? filteredSections : chapter.sections };
        }
        
        return null;
      })
      .filter((chapter): chapter is Chapter => chapter !== null)
      .map(chapter => {
         const lowerCaseQuery = searchQuery.toLowerCase();
         if (chapter.chapter_title && chapter.chapter_title.toLowerCase().includes(lowerCaseQuery)) {
            return chapter;
         }
         const filteredSections = filterSections(chapter.sections);
        return {...chapter, sections: filteredSections}
      });
  }, [searchQuery, act, hasChapters]);

  const filteredSchedules = useMemo(() => {
    if (!hasSchedules || !searchQuery) {
        return act.schedules || [];
    }
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (act.schedules || [])
      .map(schedule => {
        const filteredSections = filterSections(schedule.sections);
        const scheduleTitleMatch = schedule.schedule_title && schedule.schedule_title.toLowerCase().includes(lowerCaseQuery);

        if (scheduleTitleMatch || filteredSections.length > 0) {
          return { ...schedule, sections: filteredSections.length > 0 ? filteredSections : schedule.sections };
        }
        
        return null;
      })
      .filter((schedule): schedule is Schedule => schedule !== null)
      .map(schedule => {
         const lowerCaseQuery = searchQuery.toLowerCase();
         if (schedule.schedule_title && schedule.schedule_title.toLowerCase().includes(lowerCaseQuery)) {
            return schedule;
         }
         const filteredSections = filterSections(schedule.sections);
        return {...schedule, sections: filteredSections}
      });
  }, [searchQuery, act, hasSchedules]);

  const filteredDirectSections = useMemo(() => {
    if (hasChapters || hasSchedules || !searchQuery) {
        return act.sections || [];
    }
    return filterSections(act.sections || []);
  }, [searchQuery, act, hasChapters, hasSchedules]);


  useEffect(() => {
    if (searchQuery) {
      const openItems: string[] = [];
      if (hasChapters) {
        openItems.push(...filteredChapters.map(c => `chapter-${c.chapter_number}`));
      }
      if (hasSchedules) {
        openItems.push(...filteredSchedules.map(s => `schedule-${s.schedule_number}`));
      }
      setOpenAccordionItems(openItems);
    } else {
      setOpenAccordionItems([]);
    }
  }, [searchQuery, filteredChapters, filteredSchedules, hasChapters, hasSchedules]);

  const breadcrumbChapter = hasChapters ? { chapter_number: '', chapter_title: ''} : undefined;

  const renderSections = (sections: Section[], isSchedule = false) => (
    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.section_number}>
          <Link
            href={`/act/${slugify(act.act_name)}/section/${section.section_number}`}
            className="flex items-start p-3 rounded-md transition-colors hover:bg-secondary"
          >
            <FileText className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
            <div>
              <p className="font-semibold">{section.section_title ? `${section.section_title}` : `${isSchedule ? '' : 'Section '}${section.section_number}`}</p>
              {section.section_title && <p className="text-sm text-muted-foreground">{!isSchedule && 'Section '}{section.section_number}</p>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <BreadcrumbNav act={act} chapter={breadcrumbChapter}/>
        <header className="my-8">
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-2">{act.act_name}</h1>
        </header>

        <div className="mb-8">
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search within this act..."
                    className="pl-10 h-12 text-base w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        
        <main className="space-y-4">
          {hasChapters && (
            <Accordion 
              type="multiple" 
              className="w-full space-y-2" 
              value={openAccordionItems} 
              onValueChange={setOpenAccordionItems}
            >
              {filteredChapters.map((chapter) => (
                <AccordionItem value={`chapter-${chapter.chapter_number}`} key={`chapter-${chapter.chapter_number}`} className="border-b-0">
                   <Card>
                    <AccordionTrigger className="text-left hover:no-underline p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mr-4">
                        <span className="text-lg font-semibold font-headline text-foreground text-left">
                          Chapter {chapter.chapter_number}{chapter.chapter_title && `: ${chapter.chapter_title}`}
                        </span>
                        {chapter.section_range && (
                          <span className="text-sm text-muted-foreground mt-1 sm:mt-0 text-left sm:text-right shrink-0">
                            Sections: {chapter.section_range}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 sm:p-6 pt-0">
                       <div className="pt-2 border-t">
                        {renderSections(chapter.sections)}
                      </div>
                    </AccordionContent>
                   </Card>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {hasSchedules && (
            <Accordion 
              type="multiple" 
              className="w-full space-y-2" 
              value={openAccordionItems} 
              onValueChange={setOpenAccordionItems}
            >
              <h2 className="text-2xl font-headline font-bold text-primary mt-8 mb-4">Schedules</h2>
              {filteredSchedules.map((schedule) => (
                <AccordionItem value={`schedule-${schedule.schedule_number}`} key={`schedule-${schedule.schedule_number}`} className="border-b-0">
                   <Card>
                    <AccordionTrigger className="text-left hover:no-underline p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mr-4">
                        <span className="text-lg font-semibold font-headline text-foreground text-left">
                          {schedule.schedule_number}{schedule.schedule_title && `: ${schedule.schedule_title}`}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 sm:p-6 pt-0">
                      <div className="pt-2 border-t">
                        {renderSections(schedule.sections, true)}
                      </div>
                    </AccordionContent>
                   </Card>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          
          {!hasChapters && !hasSchedules && (
            <Card>
                <CardContent className="p-4 sm:p-6">
                  {renderSections(filteredDirectSections)}
                </CardContent>
            </Card>
          )}
          
          {searchQuery && filteredChapters.length === 0 && filteredSchedules.length === 0 && filteredDirectSections.length === 0 && (
             <Card>
                <CardHeader>
                    <CardTitle>No Results Found</CardTitle>
                    <CardDescription>Your search for "{searchQuery}" did not return any results within this act.</CardDescription>
                </CardHeader>
             </Card>
          )}
        </main>
      </div>
    </div>
  );
}

    

    