'use client';

import { useState } from "react";
import Link from "next/link";
import { BookCardProps } from "@/types";
import { Trash2 } from "lucide-react";
import { deleteBook } from "@/lib/actions/book.actions";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface MyBookCardProps extends BookCardProps {
    bookId: string;
}

const MyBookCard = ({ title, author, coverURL, slug, bookId }: MyBookCardProps) => {
    const [imgSrc, setImgSrc] = useState(coverURL || '/assets/default-cover.png');
    const [isDeleting, setIsDeleting] = useState(false);
    const { userId } = useAuth();
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to the book page
        e.stopPropagation();

        if (!userId) return;

        if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        const toastId = toast.loading("Deleting book...");

        try {
            const res = await deleteBook(bookId, userId);
            
            if (res.success) {
                toast.success("Book deleted successfully", { id: toastId });
                router.refresh();
            } else {
                toast.error(res.error as string || "Failed to delete book", { id: toastId });
                setIsDeleting(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting", { id: toastId });
            setIsDeleting(false);
        }
    };

    return (
        <div 
            className={`group relative block w-full h-full ${isDeleting ? 'opacity-50 pointer-events-none grayscale transition-all' : ''}`}
        >
            <article className="relative h-full flex flex-col p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border transition-all duration-300 hover:bg-card hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)]">
                
                {/* Book Cover Container */}
                <div className="relative w-full aspect-2/3 mb-5">
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-screen" />
                    
                    <Link href={`/books/${slug}`} className="relative block w-full h-full rounded-xl overflow-hidden shadow-(--shadow-book) border border-border group-hover:border-indigo-500/50 transition-colors duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imgSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={() => setImgSrc('/assets/default-cover.png')}
                        />
                    </Link>
                    
                    {/* Delete Ribbon/Button overlay - outside the Link to fix browser pointer interpretation */}
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="absolute -top-3 -right-3 p-2.5 rounded-full bg-red-500/90 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600 focus:outline-none z-20 cursor-pointer"
                        title="Delete Book"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Meta Information */}
                <Link href={`/books/${slug}`} className="flex-1 flex flex-col justify-start">
                    <figcaption>
                        <h3 className="font-bold text-foreground text-lg md:text-xl line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-tight mb-1">
                            {title}
                        </h3>
                        <p className="font-medium text-sm md:text-base text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors">
                            {author}
                        </p>
                    </figcaption>
                </Link>
            </article>
        </div>
    );
};

export default MyBookCard;
