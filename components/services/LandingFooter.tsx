import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const LandingFooter = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "/subscriptions" },
                { label: "Library", href: "/library" },
                { label: "Add Book", href: "/new-book" },
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
            ]
        }
    ];

    return (
        <footer className="w-full bg-card/30 backdrop-blur-md border-t border-border pt-20 pb-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex gap-2 items-center mb-6">
                            <Image src="/assets/talkbook-logo.png" alt="TalkBook" width={40} height={24} />
                            <span className="text-2xl font-bold tracking-tight text-foreground">TalkBook</span>
                        </Link>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
                            The future of interactive reading. Transform static PDFs into dynamic personal AI conversations with hyper-realistic voices.
                        </p>
                        <div className="flex gap-5">
                            <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-indigo-500/10 hover:text-indigo-600 transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-indigo-500/10 hover:text-indigo-600 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-indigo-500/10 hover:text-indigo-600 transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h4 className="text-foreground font-bold text-lg mb-6">{column.title}</h4>
                            <ul className="space-y-4">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href} 
                                            className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground text-sm">
                        &copy; {currentYear} TalkBook AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail size={16} className="text-indigo-500" />
                        <span>support@talkbook.ai</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
