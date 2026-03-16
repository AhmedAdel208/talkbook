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
        <div className="flex items-center gap-6">
          <Link href="/" className="flex gap-0.5 items-center">
            <Image src="/assets/talkbook-logo.png" alt="TalkBook" width={42} height={26} />
            <span className="logo-text">TalkBook</span>
          </Link>
          
          {isSignedIn && (
            <Link 
              href="/my-books" 
              className="relative group p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center mt-0.5"
              aria-label="My Books"
            >
              <BookMarked className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
              <span className="absolute -bottom-8 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none z-50">
                My Books
              </span>
            </Link>
          )}
        </div>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-foreground hover:opacity-70"
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex gap-4 md:gap-7 items-center">
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
