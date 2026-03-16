export default function BookDetailLoading() {
    return (
        <div className="book-page-container">
            <div className="max-w-4xl mx-auto flex flex-col gap-8 pt-28 px-5">
                {/* Header card skeleton */}
                <div className="flex gap-6 p-6 rounded-2xl bg-card/60 border border-border">
                    {/* Cover skeleton */}
                    <div className="w-[120px] h-[180px] rounded-xl bg-secondary animate-pulse shrink-0" />
                    
                    {/* Info skeleton */}
                    <div className="flex flex-col gap-4 flex-1 justify-center">
                        <div className="h-8 w-3/4 bg-secondary rounded-lg animate-pulse" />
                        <div className="h-5 w-1/3 bg-secondary/60 rounded animate-pulse" />
                        <div className="flex gap-3 mt-2">
                            <div className="h-8 w-28 bg-secondary rounded-full animate-pulse" />
                            <div className="h-8 w-28 bg-secondary rounded-full animate-pulse" />
                            <div className="h-8 w-28 bg-secondary rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Transcript skeleton */}
                <div className="p-6 rounded-2xl bg-card/60 border border-border min-h-[400px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
                            <span className="text-2xl">🎙️</span>
                        </div>
                        <p className="text-muted-foreground text-sm">Loading voice assistant...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
