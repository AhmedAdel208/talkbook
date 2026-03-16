import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserBooks } from "@/lib/actions/book.actions";
import MyBookCard from "@/components/MyBookCard";
import React from "react";
import { BookMarked, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function MyBooksPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/');
    }

    const { data: books, success, error } = await getUserBooks(userId);

    if (!success) {
        return (
            <div className="wrapper py-10 mt-[80px] min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-red-500">Error Loading Your Books</h2>
                    <p className="text-muted-foreground">{String(error)}</p>
                </div>
            </div>
        )
    }

    // Safely structure data
    const myBooks = books && Array.isArray(books) ? books : [];

    return (
        <section className="wrapper py-10 mt-[80px] min-h-screen relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            {/* Header Section */}
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <BookMarked className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Books</span>
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground w-full md:max-w-xl leading-relaxed">
                        Manage all the books you've synthesized. Delete those you no longer need to free up your library and plan limits.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <Link href="/new-book">
                        <Button className="form-btn py-6 px-8 rounded-full shadow-lg hover:shadow-indigo-500/25 group">
                            <Plus className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />
                            Add New Book
                        </Button>
                    </Link>
                </div>
            </header>

            {myBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {myBooks.map((book: any) => (
                        <div key={book._id} className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                            <MyBookCard
                                bookId={book._id}
                                slug={book.slug}
                                title={book.title}
                                author={book.author}
                                coverURL={book.coverURL}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-card/30 rounded-3xl border border-dashed border-border text-center">
                    <div className="p-6 bg-secondary/50 rounded-full mb-6">
                        <BookMarked className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">No books found in your library</h2>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        You haven't uploaded any books yet. Start synthesizing your first PDFs now!
                    </p>
                    <Link href="/new-book">
                        <Button variant="outline" className="border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 shadow-lg">
                            Upload a Book
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
}
