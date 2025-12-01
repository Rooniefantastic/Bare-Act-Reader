
"use client";

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { legalActs } from '@/lib/legal-data';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { SectionViewer } from '@/components/section-viewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Section, Chapter, Act } from '@/lib/types';
import { slugify } from '@/lib/utils';

type SectionWithChapter = {section: Section, chapter?: Chapter};

function getSectionDetails(act_slug: string, section_number: string) {
  const act = legalActs.find((a) => slugify(a.act_name) === act_slug);
  if (!act) return null;

  const allSections: SectionWithChapter[] = act.chapters 
    ? act.chapters.flatMap(chapter => 
        chapter.sections.map(section => ({section, chapter}))
      )
    : (act.sections || []).map(section => ({section}));
  
  const globalSectionIndex = allSections.findIndex(s => s.section.section_number === section_number);

  if (globalSectionIndex === -1) return null;

  const { section, chapter } = allSections[globalSectionIndex];
  
  const prevDetails = globalSectionIndex > 0 ? allSections[globalSectionIndex - 1] : null;
  const nextDetails = globalSectionIndex < allSections.length - 1 ? allSections[globalSectionIndex + 1] : null;

  return {
    act,
    chapter,
    section,
    prevSection: prevDetails ? prevDetails.section : null,
    nextSection: nextDetails ? nextDetails.section : null,
  };
}


export default function SectionPage({ params }: { params: { act_slug: string; section_number: string } }) {
  const { act_slug, section_number } = params;
  const details = getSectionDetails(act_slug, section_number);

  if (!details) {
    notFound();
  }

  const { act, chapter, section, prevSection, nextSection } = details;
  const actSlug = slugify(act.act_name);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <BreadcrumbNav act={act} chapter={chapter} section={section} />
        
        <main className="mt-8">
            <SectionViewer act={act} section={section} />
        </main>

        <nav className="flex justify-between items-center mt-8">
          {prevSection ? (
            <Button asChild variant="outline" className="flex items-center">
              <Link href={`/act/${actSlug}/section/${prevSection.section_number}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Prev: </span> Sec {prevSection.section_number}
              </Link>
            </Button>
          ) : <div />}
          {nextSection ? (
            <Button asChild variant="outline" className="flex items-center">
              <Link href={`/act/${actSlug}/section/${nextSection.section_number}`}>
                <span className="hidden sm:inline">Next: </span> Sec {nextSection.section_number}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : <div />}
        </nav>
      </div>
    </div>
  );
}
