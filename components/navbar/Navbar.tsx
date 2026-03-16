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
import { BookMarked } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Add New", href: "/new-book" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user, isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        {/* Left Side: Logo + Icon */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex gap-0.5 items-center">
            <Image src="/assets/talkbook-logo.png" alt="TalkBook" width={42} height={26} />
            <span className="logo-text">TalkBook</span>
          </Link>
          
          {isSignedIn && (
            <>
              <div className="h-6 w-px bg-border hidden md:block" />
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
                
                {/* Tooltip */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-foreground text-background text-xs font-semibold rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                  My Books
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-foreground" />
                </span>
              </Link>
            </>
          )}
        </div>
        
        <nav className="flex-1 flex justify-end gap-7 md:gap-8 items-center">
          {/* Internal Pages */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            {navItems.map(({ label, href }) => {
              const isActive =
                pathName === href || (href !== "/" && pathName.startsWith(href));

              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "nav-link-base text-[15px] font-medium transition-all",
                    isActive ? "nav-link-active" : "text-foreground/80 hover:text-foreground hover:opacity-100"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Utils & Auth */}
          <div className="flex gap-4 md:gap-5 items-center pl-4 border-l border-border/50">
            <ThemeToggle />
            {!isSignedIn && (
              <SignInButton mode="modal" />
            )}
            {isSignedIn && (
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
