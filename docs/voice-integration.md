# 🎙️ Deep Dive: Voice & AI Interaction Layer

The AI voice interaction layer is the most sophisticated part of TalkBook's user experience. It bridges natural human speech with structured document data.

## 🔌 The Communication Pipeline

TalkBook uses a complex, real-time pipeline to ensure sub-second response times:
1.  **Vapi SDK**: Manages the WebRTC connection for low-latency audio.
2.  **OpenAI GPT-4o**: Acts as the cognitive engine.
3.  **ElevenLabs**: Provides the realistic voice synthesis.
4.  **Custom Server Actions**: Provide the "Tooling" that lets the AI search the book.

---

## 🛠️ The `useVapi` Hook Implementation

This hook manages the entire lifecycle of a voice session. It handles everything from connection states to duration tracking.

### 1. Managing Call Lifecycle State

We use a custom `CallStatus` type to drive the UI animations (e.g., the glowing chat bubble).

```typescript
export type CallStatus = 'idle' | 'connecting' | 'starting' | 'listening' | 'thinking' | 'speaking';

// Mapping Vapi events to our local state
vapiInstance.on('speech-start', () => setStatus('speaking'));
vapiInstance.on('speech-end', () => setStatus('listening'));
vapiInstance.on('call-start', () => setStatus('starting'));
vapiInstance.on('call-end', () => setStatus('idle'));
```

### 2. Precise Duration Enforcement

To protect business limits, we track the session duration on both the client and server.

```typescript
useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
        startTimeRef.current = Date.now();
        interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setDuration(elapsed);

            // Force stop if they exceed their plan limit (e.g., 15 mins)
            if (elapsed >= maxDurationRef.current) {
                vapi.stop();
                setLimitError("Session limit reached.");
            }
        }, 1000);
    }
    return () => clearInterval(interval);
}, [isActive]);
```

### 3. Handling Krisp WASM Errors

A common issue with Vapi is `WASM_OR_WORKER_NOT_READY` errors in browsers that don't support SIMD or have strict worker policies. We implement a global suppressor:

```typescript
useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
        if (event.reason?.toString().includes('krisp')) {
            event.preventDefault(); // Silently handle Krisp noise-cancellation errors
        }
    };
    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
}, []);
```

---

## 🔍 Contextual Intelligence (RAG)

How does the AI "know" what's in the book?

1.  **Tool Injection**: When we start a call, we pass the `bookId` as a variable.
2.  **Function Calling**: Vapi is configured to call our `searchBookSegments` tool when it needs more info.
3.  **Vector Fallback**: Our server action searches the MongoDB text index:

```typescript
export const searchBookSegments = async (bookId: string, query: string) => {
    // Finds the top 5 most relevant 500-word chunks
    const segments = await BookSegment.find({
        bookId: new mongoose.Types.ObjectId(bookId),
        $text: { $search: query },
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(5)
    .lean();

    return serializeData(segments);
};
```

This RAG (Retrieval-Augmented Generation) flow ensures the AI never hallucinates and always provides page-accurate information.
