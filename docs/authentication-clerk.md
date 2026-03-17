# 🔐 Authentication & Identity with Clerk

TalkBook uses **Clerk** for modern, secure, and hassle-free authentication. This guide explains how Clerk is integrated across the various layers of the application.

## 🚀 Integration Overview

1.  **Identity Management**: Handles Sign Up, Sign In, and Social Auth (Google, GitHub).
2.  **Organization & Billing**: Powers the subscription logic via Clerk's seamless product model.
3.  **Route Protection**: Next.js Middleware ensures that private routes (/my-books, /new-book) are only accessible to authenticated users.

---

## 🏗️ Technical Implementation

### 1. Root Provider Setup (`app/layout.tsx`)

Every page is wrapped in the `<ClerkProvider />`. This initializes the Clerk context, allowing any component in the tree to access user session data.

```tsx
export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### 2. The Middleware Engine (`proxy.ts` / `middleware.ts`)

We use `clerkMiddleware()` to handle session validation at the edge. This provides sub-second protection for your private routes.

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Protect everything except static files and public pages
    '/((?!_next|[^?]*\\.(?:html?|css|js)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### 3. Client-Side Authentication (`hooks/useVapi.ts`)

On the client, we use the `useAuth()` hook to retrieve the current `userId`. This is essential for:
-   Authorizing voice calls.
-   Displaying user-specific book libraries.

```tsx
const { userId } = useAuth();

if (!userId) {
    toast.error("Please login to upload books");
    return;
}
```

### 4. Server-Side Hard-Secured Actions (`lib/actions/book.actions.ts`)

For critical operations like creating or deleting a book, we verify identity on the server using `auth()`. This prevents unauthorized API calls from malignant actors.

```typescript
import { auth } from "@clerk/nextjs/server";

export const deleteBook = async (bookId: string) => {
    const { userId } = await auth(); // Verify identity securely on the server
    
    if (!userId) {
        return { success: false, error: "Unauthorized" };
    }
    
    // Proceed with deletion...
}
```

---

## 🎨 UI Components

We utilize Clerk's high-fidelity pre-built components to maintain a premium feel:
-   `<UserButton />`: A specialized profile menu in the navbar.
-   `<PricingTable />`: A unified checkout and plan management UI used in `/subscriptions`.

---

## 📈 Security Best Practices

-   **Environment Variables**: All Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) are stored purely in `.env.local` and never committed to version control.
-   **Session TTL**: We maintain short-lived sessions to minimize the risk of cookie-jacking.
-   **Role-Based Access**: Limits are enforced based on the `plan` metadata synced within the Clerk session context.

This robust Clerk integration ensures TalkBook is as secure as any enterprise-grade application.
