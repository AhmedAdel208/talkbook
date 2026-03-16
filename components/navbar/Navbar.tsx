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
    <header className="w-full fixed z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center mr-6">
          <Image src="/assets/talkbook-logo.png" alt="TalkBook" width={42} height={26} />
          <span className="logo-text">TalkBook</span>
        </Link>
        
        <nav className="flex-1 flex justify-end gap-7 md:gap-8 items-center">
          {/* Internal Pages */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            {isSignedIn && (
              <Link 
                href="/my-books" 
                className={cn(
                  "relative group flex items-center justify-center transition-colors",
                  pathName === "/my-books" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-indigo-500"
                )}
                aria-label="My Books"
              >
                <BookMarked className="w-[1.125rem] h-[1.125rem]" />
                <span className="absolute -bottom-8 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none z-50">
                  My Books
                </span>
              </Link>
            )}

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
