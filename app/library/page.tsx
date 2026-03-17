import BookCard from "@/components/BookCard";
import {getAllBooks} from "@/lib/actions/book.actions";
import Search from "@/components/Search";
import Link from "next/link";

import { Suspense } from "react";

const BookList = async ({ query }: { query?: string }) => {
    // Fetch books based on the user's search query (or get all if query is empty)
    const bookResults = await getAllBooks(query);
    const books = bookResults.success ? (bookResults.data ?? []) : [];

    if (books.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card/50 backdrop-blur-sm border border-border rounded-3xl mt-10 shadow-(--shadow-soft)">
                <div className="w-24 h-24 mb-6 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
                    <span className="text-4xl">📚</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-3">No Books Found</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    We couldn't find any books matching your search. Try different keywords or add a new book to the library.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
            {books.map((book) => (
                <BookCard 
                    key={book._id} 
                    title={book.title} 
                    author={book.author} 
                    coverURL={book.coverURL} 
                    slug={book.slug} 
                />
            ))}
        </div>
    );
};

const BookListSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-3/4 bg-secondary/20 rounded-2xl animate-pulse" />
        ))}
    </div>
);

const LibraryPage = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    // We await searchParams to extract the search query for the server action
    const { query } = await searchParams;

    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-[94px] pb-18 overflow-hidden transition-colors duration-300">
            {/* Main Library Display Section */}
            <section className="max-w-7xl px-5 mx-auto w-full mt-10 z-10 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        Explore Library
                    </h2>
                    
                    {/* The search component relies on NextJS URL state */}
                    <div className="w-full sm:w-auto relative">
                        <Search />
                        {query && (
                            <p className="absolute -bottom-6 left-0 text-sm text-muted-foreground mt-2">
                                Showing results for "<span className="text-indigo-600 dark:text-indigo-400 font-semibold">{query}</span>"
                            </p>
                        )}
                    </div>
                </div>

                {/* Real Feature: Quick Tags / Analytics Preview */}
                <div className="flex flex-wrap items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mr-2">Quick Search:</span>
                    {['Productivity', 'Finance', 'Fiction', 'Tech', 'Biography'].map((tag) => (
                        <Link 
                            key={tag}
                            href={`/library?query=${tag.toLowerCase()}`}
                            className="px-4 py-1.5 rounded-full bg-secondary border border-border text-sm font-medium hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all whitespace-nowrap"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                {/* Displaying books in a responsive grid layout with Suspense */}
                <Suspense key={query} fallback={<BookListSkeleton />}>
                    <BookList query={query} />
                </Suspense>
            </section>
        </main>
    );
};

export default LibraryPage
