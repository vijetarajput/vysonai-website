import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { OutreachDashboard } from "@/components/storyboard/linkedin";
import type { Interest } from "@/lib/lead";

const steps = ["1 Find ideal clients", "2 Connect", "3 Personal message", "4 Follow up & book"];

/**
 * Short explainer for /services/linkedin-outreach: how the in-house outreach system works, this
 * month's pipeline dashboard, and two honest notes. Sample visuals only. No LinkedIn logo.
 */
export default function LinkedInExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="How does LinkedIn outreach work?"
      intro="We run our in-house LinkedIn outbound system for you. It finds the people most likely to need your service, talks to them in a personal way, and turns interested ones into meetings on your calendar."
      afterIntro={
        <nav aria-label="Outreach in four steps" className="mt-6">
          <ol className="flex flex-wrap items-center gap-1.5">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-charcoal shadow-soft">
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="text-sm text-brand-violet">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      }
      blocks={[
        {
          title: "What it does",
          text: "Identifies your ideal client type, sends connection requests and messages, follows up, and explains your business or service in a way that matches each person's profile.",
          icon: (
            <ExplainerIcon>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "Every weekday, quietly in the background. You don't chase anyone, you just show up to the meetings.",
          icon: (
            <ExplainerIcon>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "Decision-makers spend time on LinkedIn. Personal messages based on their role and company get far more replies than cold emails or generic posts, so your sales calendar fills up steadily.",
          icon: (
            <ExplainerIcon>
              <path d="M4 20V10M10 20V4M16 20v-8M20 20H4" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for coaches, consultants, agencies, B2B services, recruiters and software companies."
      visual={<OutreachDashboard />}
      caption="Watch your pipeline grow, week by week."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </ExplainerIcon>
          ),
          text: "We aim for 10–20 sales meetings a month. Results depend on your offer, market and profile.",
        },
        {
          icon: (
            <ExplainerIcon>
              <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
            </ExplainerIcon>
          ),
          text: "Outreach runs from your LinkedIn profile within careful daily limits, to help protect your account.",
        },
      ]}
      interests={interests}
    />
  );
}
