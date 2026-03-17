# 🗄️ Deep Dive: Database Strategy & Schema Design

TalkBook's data layer is optimized for high-speed retrieval of document metadata and real-time AI context lookup.

## 🎯 Architecture Goals

1.  **Multi-tenancy**: Strict isolation of user data using Clerk IDs.
2.  **RAG-Ready**: Designing segments specifically for Large Language Model context windows.
3.  **High Availability**: Hybrid search logic that works even if specialized indices are failing.

---

## 📐 Data Models in Detail

### 1. The Book Model (`database/models/book.model.ts`)

This model acts as the "Source of Truth" for any book in the system.

```typescript
const BookSchema = new Schema<IBook>({
    clerkId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // URL-friendly ID
    persona: { type: String }, // Voice configuration
    fileURL: { type: String, required: true },
    coverURL: { type: String },
    totalSegments: { type: Number, default: 0 },
}, { timestamps: true });

// Compound index for fast user library sorting
BookSchema.index({ clerkId: 1, createdAt: -1 });
```

### 2. The Segment Model (`database/models/book-segment.model.ts`)

Segments are the "Atoms" of the book. We break a book into roughly 500-word chunks.

```typescript
const BookSegmentSchema = new Schema<IBookSegment>({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
    content: { type: String, required: true },
    segmentIndex: { type: Number, required: true },
    pageNumber: { type: Number },
});

// CRITICAL: Text index for the RAG engine
BookSegmentSchema.index({ content: 'text' });
```

---

## ⚡ Hybrid Search Implementation

A major engineering challenge was ensuring the AI always has content, even if the user provides a very specific or "noisy" query. We solve this with a **Two-Tier Search Pattern**:

### Tier 1: Weighted Text Search
Uses MongoDB's built-in text engine to calculate a "Relevance Score".

```typescript
segments = await BookSegment.find({
    bookId: bookObjectId,
    $text: { $search: query }
})
.select({ score: { $meta: 'textScore' } }) // Get the relevance weight
.sort({ score: { $meta: 'textScore' } })
.limit(5);
```

### Tier 2: Keyword Regex Fallback
If Tier 1 returns 0 results (common with obscure names or typos), we trigger a regex fallback.

```typescript
const keywords = query.split(/\s+/).filter(k => k.length > 2);
const pattern = keywords.map(escapeRegex).join('|'); // OR search

segments = await BookSegment.find({
    bookId: bookObjectId,
    content: { $regex: pattern, $options: 'i' }
}).limit(5);
```

---

## 🔒 Security & Performance

-   **Mongoose Middleware**: We use pre-save hooks to automatically generate slugs and clean filenames.
-   **Connection Pooling**: Next.js 15 Server Actions can spawn many concurrent requests. We use a global `mongoose` connection cache to prevent "Too many connections" errors in MongoDB Atlas.

This architecture ensures that whether a user has 10 books or 10,000, the search remains sub-second and accurate.
