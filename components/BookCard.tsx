'use client';

import { useState } from "react";
import Link from "next/link";
import { BookCardProps } from "@/types";

/**
 * BookCard Component
 * 
 * Uses a plain <img> tag instead of next/image to avoid the /_next/image proxy
 * which returns 503 errors when fetching from Vercel Blob storage.
 */
const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    const [imgSrc, setImgSrc] = useState(coverURL || '/assets/default-cover.png');

    return (
        <Link href={`/books/${slug}`} className="group relative block w-full h-full">
            <article className="relative h-full flex flex-col p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border transition-all duration-300 hover:bg-card hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)]">
                
                {/* Book Cover */}
                <div className="relative w-full aspect-2/3 mb-5">
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-screen" />
                    
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-(--shadow-book) border border-border group-hover:border-indigo-500/50 transition-colors duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imgSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={() => setImgSrc('/assets/default-cover.png')}
                        />
                    </div>
                </div>

                {/* Meta Information */}
                <figcaption className="flex-1 flex flex-col justify-start">
                    <h3 className="font-bold text-foreground text-lg md:text-xl line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-tight mb-1">
                        {title}
                    </h3>
                    <p className="font-medium text-sm md:text-base text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors">
                        {author}
                    </p>
                </figcaption>
            </article>
        </Link>
    );
};

export default BookCard;