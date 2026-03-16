export default function LibraryLoading() {
    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-[94px] pb-18 overflow-hidden transition-colors duration-300">
            <section className="max-w-7xl px-5 mx-auto w-full mt-10">
                {/* Header skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-indigo-500/30 rounded-full animate-pulse" />
                        <div className="h-10 w-48 bg-secondary rounded-xl animate-pulse" />
                    </div>
                    <div className="w-full sm:w-72 h-12 bg-secondary rounded-xl animate-pulse" />
                </div>

                {/* Quick search tags skeleton */}
                <div className="flex gap-3 mb-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-24 bg-secondary rounded-full animate-pulse" />
                    ))}
                </div>

                {/* Book grid skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="flex flex-col p-4 rounded-2xl bg-card/60 border border-border">
                            <div className="w-full aspect-2/3 mb-5 rounded-xl bg-secondary animate-pulse" />
                            <div className="h-5 w-3/4 bg-secondary rounded animate-pulse mb-2" />
                            <div className="h-4 w-1/2 bg-secondary/60 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
