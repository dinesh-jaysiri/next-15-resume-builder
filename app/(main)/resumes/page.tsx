import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function page() {
    return (
      <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
        <Button className="mx-auto flex w-fit" asChild>
          <Link href='/editor'>
            <PlusSquare className="size-5" />
            New resume
          </Link>
        </Button>
      </main>
    );
}

export default page;