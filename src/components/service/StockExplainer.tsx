import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { StockDashboard } from "@/components/storyboard/stock";
import type { Interest } from "@/lib/lead";

/**
 * Short explainer for /services/stock-management: what AI stock management is, the stock
 * dashboard, and two honest notes. Sample visuals only.
 */
export default function StockExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="What is AI stock management?"
      intro="It's a smart stock list that updates itself as you sell, tells you what's running low, and answers questions about your shop in plain words."
      blocks={[
        {
          title: "What it does",
          text: 'Tracks every product, shows your best and slowest sellers, suggests how much to reorder, and answers questions like "What sold most this week?"',
          icon: (
            <ExplainerIcon>
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 7v10l9 4 9-4V7" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "All the time. Every sale updates your stock, and you get an alert before an item runs out, not after.",
          icon: (
            <ExplainerIcon>
              <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16zM10 21h4" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "An empty shelf is a lost sale, and too much stock locks up your money. Knowing exactly what to reorder helps you sell more and waste less.",
          icon: (
            <ExplainerIcon>
              <path d="M4 20V10M10 20V4M16 20v-8M20 20H4" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for retail shops, electronics stores, pharmacies, grocery stores, boutiques and distributors."
      visual={<StockDashboard />}
      caption="See your whole shop in seconds."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M9 8h6M9 12h6M9 16h3" />
            </ExplainerIcon>
          ),
          text: "Works with most billing software, or a simple sheet to start.",
        },
        {
          icon: (
            <ExplainerIcon>
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 7v10l9 4 9-4V7" />
            </ExplainerIcon>
          ),
          text: "Count your stock once at the start. After that, it updates as you sell.",
        },
      ]}
      interests={interests}
    />
  );
}
