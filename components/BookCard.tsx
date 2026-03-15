import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

/**
 * BookCard Component
 * 
 * Represents a single book in the library grid.
 * It uses a sleek dark mode Glassmorphism style with hover effects and glowing borders
 * to give it a premium "frontend portfolio" look.
 */
const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`} className="group relative block w-full h-full">
            {/* The outer glowing hover effect container */}
            <article className="relative h-full flex flex-col p-4 rounded-2xl bg-[#151A24]/40 border border-white/5 transition-all duration-300 hover:bg-[#151A24]/80 hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)]">
                
                {/* Book Cover Container with perspective for 3D feel */}
                <div className="relative w-full aspect-[2/3] mb-5 perspective-1000">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen" />
                    
                    {/* The physical book cover wrapper */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-indigo-500/50 transition-colors duration-300 transform group-hover:rotate-y-6">
                        <Image 
                            src={coverURL} 
                            alt={title} 
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            priority={false}
                        />
                    </div>
                </div>

                {/* Meta Information Container */}
                <figcaption className="flex-1 flex flex-col justify-start">
                    {/* Book Title with line clamping to keep grid uniform */}
                    <h3 className="font-bold text-white text-lg md:text-xl line-clamp-1 group-hover:text-indigo-300 transition-colors leading-tight mb-1">
                        {title}
                    </h3>
                    
                    {/* 
                      Book Author 
                      We use a muted text color to establish visual hierarchy 
                    */}
                    <p className="font-medium text-sm md:text-base text-slate-400 line-clamp-1 group-hover:text-slate-300 transition-colors">
                        {author}
                    </p>
                </figcaption>
            </article>
        </Link>
    );
};

export default BookCard;