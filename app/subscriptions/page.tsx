import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container wrapper relative z-10 mt-[20px]">
        <div className="flex flex-col items-center text-center mb-8 space-y-4">
            <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide backdrop-blur-md">
                Pricing Plans
            </div>
          <h1 className="text-4xl  font-extrabold tracking-tight text-foreground">
            Choose Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">Plan</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Unlock the full potential of your library with advanced AI models, unlimited voice tokens, and priority support.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <PricingTable 
            appearance={{
                variables: {
                    colorPrimary: '#6366f1',
                    borderRadius: '1.5rem',
                },
                elements: {
                    card: 'shadow-2xl border-border/50 bg-card/50 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300',
                    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20',
                    navbar: 'hidden',
                    headerTitle: 'text-2xl font-bold font-sans',
                    headerSubtitle: 'text-muted-foreground font-sans',
                    pricingCardTitle: 'text-xl font-bold text-foreground capitalize font-sans',
                    pricingCardPrice: 'text-4xl font-extrabold text-foreground font-sans',
                    pricingCardFeatureList: 'space-y-4 pt-6',
                    pricingCardFeatureItem: 'text-muted-foreground flex items-center gap-3',
                }
            }}
          />
        </div>
      </div>
    </div>
  );
}