import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import {getAllBooks} from "@/lib/actions/book.actions";
import Search from "@/components/Search";
import FeaturesSection from "@/components/FeaturesSection"; // NEW PORTFOLIO FEATURE

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    // We await searchParams to extract the search query for the server action
    const { query } = await searchParams;

    // Fetch books based on the user's search query (or get all if query is empty)
    const bookResults = await getAllBooks(query);
    const books = bookResults.success ? bookResults.data ?? [] : [];

    return (
        <main className="w-full min-h-screen bg-[#0B0E14] text-white pt-[94px] pb-18 overflow-hidden">
            {/* Added a premium animated background gradient element for overall app glow */}
            <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-[#151A24] to-transparent pointer-events-none -z-20" />
            
            <HeroSection />

            <FeaturesSection />

            {/* Main Library Display Section */}
            <section className="max-w-7xl px-5 mx-auto w-full mt-10 z-10 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                        Explore Library
                    </h2>
                    
                    {/* The search component relies on NextJS URL state */}
                    <Search />
                </div>

                {/* Displaying books in a responsive grid layout */}
                {books.length > 0 ? (
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
                ) : (
                    // Empty state fallback for portfolio completeness
                    <div className="flex flex-col items-center justify-center p-20 text-center bg-[#151A24]/50 border border-white/5 rounded-3xl mt-10">
                        <div className="w-20 h-20 mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <span className="text-3xl">📚</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Books Found</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                            We couldn't find any books matching your search. Try different keywords or add a new book.
                        </p>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Page