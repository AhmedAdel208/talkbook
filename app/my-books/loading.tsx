export default function Loading() {
    return (
        <section className="wrapper py-10 mt-[80px] min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-4 pt-12 animate-pulse">
                    <div className="h-12 w-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-xl border border-border/50" />
                    <div className="h-6 w-96 bg-secondary rounded-md" />
                </div>
                <div className="animate-pulse">
                    <div className="h-14 w-40 bg-secondary rounded-full" />
                </div>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col h-full space-y-4 animate-pulse">
                        <div className="aspect-2/3 w-full bg-indigo-500/10 dark:bg-indigo-500/5 border border-border/50 rounded-2xl" />
                        <div className="space-y-2">
                            <div className="h-5 w-3/4 bg-secondary rounded-md" />
                            <div className="h-4 w-1/2 bg-secondary rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
