
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Act, Chapter, Section } from '@/lib/types';
import { slugify } from '@/lib/utils';

interface BreadcrumbNavProps {
  act: Act;
  chapter?: Chapter;
  section?: Section;
}

export function BreadcrumbNav({ act, chapter, section }: BreadcrumbNavProps) {
  const hasChapters = !!act.chapters && act.chapters.length > 0;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base text-muted-foreground flex-wrap">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 shrink-0" />
            <Link href={`/act/${slugify(act.act_name)}`} className="ml-1 sm:ml-2 hover:text-primary transition-colors">
              {act.act_name}
            </Link>
          </div>
        </li>
        {chapter && !section && hasChapters && (
           <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="ml-1 sm:ml-2 font-semibold text-foreground">Chapters</span>
            </div>
          </li>
        )}
        {chapter && section && hasChapters && (
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="ml-1 sm:ml-2">Chapter {chapter.chapter_number}</span>
            </div>
          </li>
        )}
        {section && (
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="ml-1 sm:ml-2 font-semibold text-foreground">Section {section.section_number}</span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}
