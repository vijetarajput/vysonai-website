import Image from "next/image";

/**
 * Founder photo from /public/founder.jpg (720x720 source), optimised by next/image.
 * Cropped to a portrait frame; object-position keeps the face centred.
 */
export default function FounderPhoto({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-violet-tint shadow-soft ring-1 ring-border ${className}`}
    >
      <Image
        src="/founder.jpg"
        alt="Viijeta R, founder of VYSON-AI"
        fill
        priority
        sizes="(min-width: 768px) 320px, 240px"
        className="object-cover object-[52%_22%]"
      />
    </div>
  );
}
