"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookMarked, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Add New", href: "/new-book" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user, isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-100 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="wrapper navbar-height py-4 flex justify-between items-center relative">
          {/* Left Side: Logo + Icon */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/" className="flex gap-0.5 items-center shrink-0">
              <Image src="/assets/new-logo.png" alt="TalkBook" width={42} height={26} className="w-8 h-5 sm:w-[42px] sm:h-[26px]" />
              <span className="logo-text text-lg sm:text-xl md:text-2xl">TalkBook</span>
            </Link>
            
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              <div className="h-6 w-px bg-border hidden sm:block mx-1" />
              <ThemeToggle />
              
              {isSignedIn && (
                <Link 
                  href="/my-books" 
                  className={cn(
                    "relative group flex items-center justify-center p-2 rounded-xl transition-all duration-300",
                    pathName === "/my-books" 
                      ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  aria-label="My Books"
                >
                  <BookMarked className="w-5 h-5" />
                  
                  {/* Tooltip - Desktop only */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-foreground text-background text-xs font-semibold rounded-md opacity-0 pointer-events-none md:group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                    My Books
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-foreground" />
                  </span>
                </Link>
              )}
            </div>
          </div>
          
          <nav className="flex items-center justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 mr-6 lg:mr-8">
              {navItems.map(({ label, href }) => {
                const isActive =
                  pathName === href || (href !== "/" && pathName.startsWith(href));

                return (
                  <Link
                    href={href}
                    key={label}
                    className={cn(
                      "nav-link-base text-[15px] font-medium transition-all px-1",
                      isActive ? "nav-link-active" : "text-foreground/80 hover:text-foreground hover:opacity-100"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Utils & Auth & Mobile Toggle */}
            <div className="flex gap-3 sm:gap-4 md:gap-5 items-center pl-3 sm:pl-4 border-l border-border/50">
              {!isSignedIn && (
                 <SignInButton mode="modal">
                   <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity">
                     Sign in
                   </button>
                 </SignInButton>
              )}
              {isSignedIn && (
                <div className="nav-user-link">
                  <UserButton />
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 md:hidden text-foreground hover:bg-secondary rounded-xl transition-colors relative z-1001"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Root Level Structure */}
      <div 
        className={cn(
          "fixed inset-0 z-1000 md:hidden bg-[#f8f4e9] dark:bg-[#0B0E14] transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "translate-y-0 opacity-100 visible" 
            : "-translate-y-full opacity-0 invisible"
        )}
      >
        <div className="flex flex-col h-full pt-[100px] px-8 gap-6 items-center text-center overflow-y-auto">
          <div className="w-full max-w-sm space-y-3">
            {navItems.map(({ label, href }, index) => {
              const isActive =
                pathName === href || (href !== "/" && pathName.startsWith(href));

              return (
                <Link
                  href={href}
                  key={label}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-black tracking-tight transition-all w-full flex items-center justify-center py-6 rounded-3xl border",
                    isActive 
                      ? "text-white bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-500/20" 
                      : "text-foreground/80 bg-white/50 dark:bg-slate-900/50 border-border/50 hover:bg-white dark:hover:bg-slate-900"
                  )}
                  style={{ 
                    transitionDelay: `${index * 40}ms`,
                    transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0.9)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {label}
                </Link>
              );
            })}
            
            {isSignedIn && (
              <Link 
                href="/my-books"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-black tracking-tight transition-all w-full flex items-center justify-center gap-4 py-6 rounded-3xl border mt-4",
                  pathName === "/my-books"
                    ? "text-white bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-500/20"
                    : "text-foreground/80 bg-white/50 dark:bg-slate-900/50 border-border/50"
                )}
                style={{ 
                  transitionDelay: `${navItems.length * 40}ms`,
                  transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0.9)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <BookMarked size={28} />
                My Library
              </Link>
            )}
          </div>

          <div className="mt-auto pb-12">
             <div className="h-1 w-12 bg-indigo-500/30 rounded-full mx-auto mb-4" />
             <p className="text-muted-foreground/60 text-xs font-bold tracking-widest uppercase">TalkBook Premium</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
