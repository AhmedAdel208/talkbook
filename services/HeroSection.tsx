import React from 'react';
import Link from 'next/link';

/**
 * HeroSection Component
 * 
 * This is the main landing area of the application. It serves as the gateway
 * to impress employers with a premium "Glassmorphism" design, which uses
 * semi-transparent backgrounds and blurred gradients to create a modern feel.
 */
const HeroSection = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-5 mb-16 mt-10">
            
            {/* 1. Background Glow Effects */}
            {/* These divs create the blurred neon glow behind the hero card */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            {/* 2. Main Hero Glass Card */}
            {/* Using backdrop-blur and semi-transparent borders to achieve the glass effect */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl shadow-[var(--shadow-soft)] p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 transition-colors duration-300">
                
                {/* 3. Text Content Container */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full relative">
                    
                    {/* An eye-catching badge above the title */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Next-Gen AI Voice Interaction
                    </div>

                    {/* Main Title with Gradient Text */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                        Talk To Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x">
                            Library
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
                        Upload any PDF and instantly convert it into a dynamic, intelligent voice conversation. Listen, learn, and engage with your favorite books like never before.
                    </p>
                    
                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link 
                            href="/new-book" 
                            className="btn-primary group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all duration-300 w-full sm:w-auto overflow-hidden shadow-[0_4px_14px_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-1 block"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <span className="text-2xl font-light mb-1">+</span>
                            <span>Add New Book</span>
                        </Link>

                        <a 
                            href="#features" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-xl font-medium text-lg transition-all duration-300 w-full sm:w-auto hover:-translate-y-1"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* 4. 3D Floating Steps Card (Right Side) */}
                {/* This visually replaces the image with an interactive-looking UI component */}
                <div className="relative w-full max-w-[340px] perspective-1000 hidden md:block">
                    {/* Decorative floating elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                    
                    <div className="relative bg-secondary/80 backdrop-blur-md border border-border rounded-2xl p-6 shadow-lg transform transition-transform duration-500 hover:rotate-2 hover:scale-105">
                        <h3 className="text-foreground font-semibold text-xl mb-6 flex items-center gap-2">
                            <span className="w-8 h-px bg-indigo-500/50" />
                            How it works
                        </h3>
                        
                        <ul className="space-y-6">
                            {[
                                { step: '1', title: 'Upload PDF', desc: 'Securely add your book' },
                                { step: '2', title: 'AI Processing', desc: 'Vectorizing the knowledge' },
                                { step: '3', title: 'Voice Chat', desc: 'Realtime interactive audio' }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
                                        {item.step}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-foreground font-medium text-lg leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm mt-1 group-hover:text-foreground/80 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;