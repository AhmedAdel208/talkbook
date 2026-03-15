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
            icon: <Bot className="w-8 h-8 text-indigo-400" />,
            title: "Advanced AI Persona",
            description: "Interact with an intelligent persona that actually understands the context, nuances, and themes of your loaded PDF."
        },
        {
            icon: <Headphones className="w-8 h-8 text-fuchsia-400" />,
            title: "Ultra-Realistic Voices",
            description: "Powered by ElevenLabs, our voices sound indistinguishable from human narrators, with emotional pacing."
        },
        {
            icon: <FileText className="w-8 h-8 text-sky-400" />,
            title: "Large PDF Support",
            description: "Seamlessly upload and process massive books or research papers up to 50MB using Next.js streaming."
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-400" />,
            title: "Real-time Processing",
            description: "Experience ultra-low latency conversational AI with real-time transcriptions and instant document retrieval."
        }
    ];

    return (
        <section id="features" className="w-full max-w-7xl mx-auto px-5 mb-24 scroll-mt-32">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    A Next-Generation <span className="text-indigo-400">Reading</span> Experience
                </h2>
                <p className="text-slate-400 text-lg">
                    We combine vector databases, large language models, and cutting-edge voice synthesis to redefine how you consume literature.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    // Hover effects and glassmorphic styling applied to each card
                    <div 
                        key={index}
                        className="group bg-[#151A24]/50 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-[#1E2532]/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.15)]"
                    >
                        {/* the icon container with a soft glowing background */}
                        <div className="w-16 h-16 rounded-2xl bg-[#0B0E14] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            {feature.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                            {feature.title}
                        </h3>
                        
                        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Subtle separator line to bridge to the next section */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-24" />
        </section>
    );
};

export default FeaturesSection;
