import Image from "next/image";
import BrandName from "@/components/BrandName";
import { siteConfig } from "@/config/site";

/**
 * Founder photo (/public/founder.jpg): a clean circle, a 6px white gap, then a 3px ring in the
 * brand gradient, with a soft violet shadow and a small "Founder, VYSON-AI" badge on the bottom
 * edge. No glows, rays or animation.
 */
export default function FounderPhoto() {
  return (
    <div className="mx-auto flex shrink-0 flex-col items-center pb-4">
      <div className="relative">
        <div
          className="rounded-full p-[3px] shadow-[0_20px_40px_rgba(124,58,237,0.15)]"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED, #C026D3)" }}
        >
          <div className="rounded-full bg-white p-[6px]">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full bg-violet-tint md:h-[260px] md:w-[260px]">
              {/* Oversized frame positioned so the face sits in the centre of the circle */}
              <div className="absolute left-[-48.8%] top-[-15%] h-[190%] w-[190%]">
                <Image
                  src="/founder.jpg"
                  alt={`${siteConfig.founder}, founder of ${siteConfig.name}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 500px, 380px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full border border-brand-violet bg-white px-3.5 py-1 text-xs font-semibold text-brand-violet">
          Founder, <BrandName />
        </span>
      </div>
    </div>
  );
}
