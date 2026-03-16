import React from 'react';
import { Bot, Headphones, FileText, Zap } from 'lucide-react';

/**
 * FeaturesSection Component
 * 
 * Added specifically to showcase the app capabilities on the landing page, 
 * impressing employers by demonstrating an understanding of product marketing 
 * UI patterns. It splits complex features into easily readable, small items.
 */
const FeaturesSection = () => {
    // Array of feature objects makes the code more readable and easy to maintain
    const features = [
        {
            icon: <Bot className="w-8 h-8 text-indigo-500" />,
            title: "Advanced AI Persona",
            description: "Interact with an intelligent persona that actually understands the context, nuances, and themes of your loaded PDF."
        },
        {
            icon: <Headphones className="w-8 h-8 text-fuchsia-500" />,
            title: "Ultra-Realistic Voices",
            description: "Powered by ElevenLabs, our voices sound indistinguishable from human narrators, with emotional pacing."
        },
        {
            icon: <FileText className="w-8 h-8 text-sky-500" />,
            title: "Large PDF Support",
            description: "Seamlessly upload and process massive books or research papers up to 50MB using Next.js streaming."
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            title: "Real-time Processing",
            description: "Experience ultra-low latency conversational AI with real-time transcriptions and instant document retrieval."
        }
    ];

    return (
        <section id="features" className="w-full max-w-7xl mx-auto px-5 mb-24 scroll-mt-32">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                    A Next-Generation <span className="text-indigo-600 dark:text-indigo-400">Reading</span> Experience
                </h2>
                <p className="text-muted-foreground text-lg">
                    We combine vector databases, large language models, and cutting-edge voice synthesis to redefine how you consume literature.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    // Hover effects and glassmorphic styling applied to each card
                    <div 
                        key={index}
                        className="group bg-card/60 backdrop-blur-sm border border-border hover:border-indigo-500/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-secondary/80 shadow-[var(--shadow-soft)] hover:shadow-lg"
                    >
                        {/* the icon container with a soft glowing background */}
                        <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            {feature.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                            {feature.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Subtle separator line to bridge to the next section */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mt-24" />
        </section>
    );
};

export default FeaturesSection;
