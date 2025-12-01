import Link from 'next/link';
import { legalActs } from '@/lib/legal-data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronRight } from 'lucide-react';
import { SearchForm } from '@/components/search-form';
import { slugify } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-2">
          Bare Act Reader
        </h1>
        <p className="text-muted-foreground text-lg">
          Your offline-first guide to Indian Legal Bare Acts.
        </p>
      </header>

      <div className="w-full max-w-2xl mb-8">
        <SearchForm />
      </div>

      <main className="w-full max-w-4xl">
        <div className="space-y-4">
          {legalActs.map((act) => (
            <Link key={act.act_name} href={`/act/${slugify(act.act_name)}`} className="group block">
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-4 text-primary" />
                    <CardTitle className="font-headline text-lg leading-tight">{act.act_name}</CardTitle>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="w-full max-w-4xl mt-12 text-center text-muted-foreground text-sm">
        <p>All legal data is provided for informational purposes only. Consult with a legal professional for advice.</p>
        <p>&copy; {new Date().getFullYear()} Bare Act Reader. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
