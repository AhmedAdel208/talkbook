import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="wrapper py-10 mt-[80px] min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-4 pt-12">
                    <Skeleton className="h-12 w-64 rounded-xl" />
                    <Skeleton className="h-6 w-96 rounded-md" />
                </div>
                <div>
                    <Skeleton className="h-14 w-40 rounded-full" />
                </div>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col h-full space-y-4">
                        <Skeleton className="aspect-2/3 w-full rounded-2xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
