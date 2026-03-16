'use client';

import  {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Search as SearchIcon} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const Search = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [query, setQuery] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (query) {
                params.set('query', query);
            } else {
                params.delete('query');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, pathname, router]);

    return (
        <div className="relative group w-full sm:w-80 md:w-96">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-md group-focus-within:bg-indigo-500/20 transition-all duration-300" />
            <div className="relative flex items-center bg-card/60 backdrop-blur-md border border-border group-focus-within:border-indigo-500/50 rounded-xl overflow-hidden shadow-[var(--shadow-soft)] transition-all duration-300">
                <div className="pl-4">
                    <SearchIcon
                        size={20}
                        className="text-muted-foreground group-focus-within:text-indigo-500 transition-colors"
                    />
                </div>
                <Input
                    type="text"
                    placeholder="Search books by title or author..."
                    className="flex-1 py-6 px-4 bg-transparent text-foreground placeholder:text-muted-foreground border-none shadow-none focus-visible:ring-0 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;