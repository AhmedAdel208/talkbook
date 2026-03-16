export default function NewBookLoading() {
    return (
        <main className="w-full min-h-screen bg-background text-foreground pt-[94px] pb-18">
            <section className="max-w-3xl mx-auto px-5 mt-10">
                <div className="h-10 w-56 bg-secondary rounded-xl animate-pulse mb-8" />
                
                <div className="space-y-6 p-8 rounded-2xl bg-card/60 border border-border">
                    {/* File upload area skeleton */}
                    <div className="w-full h-40 rounded-xl bg-secondary/50 border-2 border-dashed border-border animate-pulse flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-secondary animate-pulse" />
                            <div className="h-4 w-32 bg-secondary rounded animate-pulse" />
                        </div>
                    </div>

                    {/* Form fields skeleton */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-20 bg-secondary rounded animate-pulse" />
                            <div className="h-12 w-full bg-secondary/60 rounded-xl animate-pulse" />
                        </div>
                    ))}

                    {/* Button skeleton */}
                    <div className="h-14 w-full bg-indigo-500/20 rounded-xl animate-pulse" />
                </div>
            </section>
        </main>
    );
}
