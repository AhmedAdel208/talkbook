# 💳 Subscriptions & Monetization Strategy

TalkBook is built as a scalable SaaS product with a multi-tiered subscription model. This guide explains how we handle billing, usage limits, and plan enforcement.

## 🎯 Architecture Goals

1.  **Usage Safety**: Preventing users from exceeding their technical bandwidth (Vapi minutes, Storage).
2.  **User Experience**: Transparently informing users when they need to upgrade.
3.  **Security**: Ensuring server-side enforcement of all plan limits.

---

## 🏗️ Technical Implementation

### 1. Plan Definitions (`lib/subscription-constants.ts`)

We define our three tiers with specific technical constraints:
- **Free**: 1 Book, 5 Sessions/Mo, 5 Min Duration.
- **Standard**: 10 Books, 100 Sessions/Mo, 15 Min Duration.
- **Pro**: 100 Books, Unlimited Sessions, 60 Min Duration.

### 2. Multi-Layer Limit Enforcement

We enforce limits at multiple stages of the application lifecycle to ensure robustness.

#### A. Client-Side Pre-Validation
Before a user even initiates an upload or a voice call, we check their limits to provide immediate UI feedback.

```tsx
// Example from UploadForm.tsx
const { limits } = useSubscription();
// Disable or show warning if limits.maxBooks is reached
```

#### B. Server-Side Hard Enforcement (Critical)
Every Server Action that performs a mutation or initiates a resource-heavy task (like starting a voice session) performs a fresh, secure check on the server.

```typescript
// Example from lib/actions/session.actions.ts
export const startVoiceSession = async (clerkId: string, bookId: string) => {
    const plan = await getUserPlan(); // Secured server-side utility
    const limits = PLAN_LIMITS[plan];
    
    const sessionCount = await VoiceSession.countDocuments({ clerkId, billingPeriodStart });
    
    if (sessionCount >= limits.maxSessionsPerMonth) {
        return { success: false, error: "Monthly limit reached", isBillingError: true };
    }
    // Proceed to create session...
}
```

#### C. Real-Time Duration Guard
In the `useVapi` hook, we protect the system by automatically ending calls that exceed the user's allocated minutes per session.

```typescript
// hooks/useVapi.ts
if (elapsedSeconds >= maxDurationAllowed) {
    vapi.stop();
    setLimitError("Session time limit reached.");
}
```

---

## ☁️ Integrations

### 🔑 Clerk Pricing Table
We use the `@clerk/nextjs` Pricing Table component for a seamless billing experience. This allows us to:
- Dynamically show "Current Plan" status.
- Trigger checkout flows for Standard and Pro tiers.
- Handle authentication and billing in a single secure context.

---

## 📈 Optimization Strategies

-   **Caching Plan Metadata**: The `getUserPlan` function is a "Heavy Read". We use Next.js `unstable_cache` with a short TTL (Time-to-Live) to avoid redundant Stripe/Database calls on every action.
-   **Billing Period Calculation**: We use a helper `getCurrentBillingPeriodStart()` to reset session counts on the 1st of every month automatically, without needing a CRON job.

This robust subscription architecture ensures that TalkBook remains a sustainable and profitable product.
