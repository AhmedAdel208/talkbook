export default function Loading() {
    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-[94px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Animated book icon */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
                        <span className="text-3xl">📚</span>
                    </div>
                    <div className="absolute -inset-4 bg-indigo-500/5 rounded-full blur-xl animate-pulse" />
                </div>
                
                {/* Loading text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">Loading</h2>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </main>
    );
}
