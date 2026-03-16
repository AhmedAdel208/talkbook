import HeroSection from "@/components/services/HeroSection";
import FeaturesSection from "@/components/services/FeaturesSection";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Star } from "lucide-react";
import LandingFooter from "@/components/services/LandingFooter";
import FeaturedBooks from "@/components/services/FeaturedBooks";

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-[94px] overflow-hidden transition-colors duration-300">
            {/* Animated background gradient */}
            <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-20" />
            
            <HeroSection />

            <FeaturedBooks />

            <FeaturesSection />

            {/* Content preview section instead of the full library */}
            <section className="max-w-7xl px-5 mx-auto w-full mb-24 relative z-10">
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft-md)]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Transform Your <span className="text-indigo-600 dark:text-indigo-400">Library?</span>
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Join thousands of readers engaging in meaningful, dynamic conversations with their books. Start exploring the collection.
                            </p>
                        </div>
                        
                        <Link 
                            href="/library" 
                            className="btn-primary shrink-0 flex items-center gap-2 group w-full md:w-auto"
                        >
                            Open Full Library
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border/50">
                        {[
                            { icon: BookOpen, label: "Interactive Books", value: "5,000+" },
                            { icon: Clock, label: "Hours of Audio", value: "100k+" },
                            { icon: Star, label: "5-Star Ratings", value: "4.9/5" },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                                <span className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl mb-4">
                                    <stat.icon size={24} />
                                </span>
                                <span className="text-3xl font-bold mb-1">{stat.value}</span>
                                <span className="text-muted-foreground">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LandingFooter />
        </main>
    )
}