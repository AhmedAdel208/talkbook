
import { getAllBooks } from '@/lib/actions/book.actions';
import BookCard from '@/components/BookCard';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';

const FeaturedBooks = async () => {
    const results = await getAllBooks();
    
    if (!results.success) {
        console.error("FeaturedBooks: Failed to fetch books", results.error);
    }

    const books = results.success ? (results.data?.slice(0, 4) ?? []) : [];
    console.log(books)

    if (books.length === 0) {
        console.warn("FeaturedBooks: No books found in database");
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto px-5 mb-24 relative">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <TrendingUp size={24} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Trending Now</h2>
                </div>
                
                <Link 
                    href="/library" 
                    className="group flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                    View All
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {books.map((book: any) => (
                    <div key={book._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BookCard 
                            title={book.title}
                            author={book.author}
                            coverURL={book.coverURL}
                            slug={book.slug}
                        />
                    </div>
                ))}
            </div>

            {/* Background decoration */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        </section>
    );
};

export default FeaturedBooks;
