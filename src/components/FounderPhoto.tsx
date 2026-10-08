import Image from "next/image";

/**
 * Founder photo (/public/founder.jpg) in a circle with a glowing brand halo behind it.
 * Layers, back to front: dark violet glow, slowly rotating light rays, 3px gradient ring, photo.
 * The page background stays light; only the halo is dark. Rays stop rotating when the
 * visitor prefers reduced motion (see .founder-rays in globals.css).
 */
export default function FounderPhoto() {
  return (
    <div className="relative mx-auto flex h-[300px] w-[300px] shrink-0 items-center justify-center md:h-[400px] md:w-[400px]">
      {/* Layer 1: soft dark-violet glow */}
      <div
        aria-hidden="true"
        className="absolute inset-[4%] rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(closest-side, #7C3AED 0%, #7C3AED 66%, #4C1D95 84%, rgba(76,29,149,0) 100%)",
        }}
      />

      {/* Layer 2: rotating rays, faded out away from the photo */}
      <div
        aria-hidden="true"
        className="founder-rays absolute inset-0 rounded-full blur-[2px]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(124,58,237,0.6) 0deg 8deg, rgba(124,58,237,0) 8deg 18deg, rgba(192,38,211,0.55) 18deg 26deg, rgba(192,38,211,0) 26deg 36deg)",
          maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
        }}
      />

      {/* Layer 3: 3px brand-gradient ring directly around the photo */}
      <div
        className="relative z-10 h-[200px] w-[200px] rounded-full p-[3px] md:h-[280px] md:w-[280px]"
        style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED, #C026D3)" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-violet-tint">
          {/* Oversized frame positioned so the face sits in the centre of the circle */}
          <div className="absolute left-[-48.8%] top-[-15%] h-[190%] w-[190%]">
            <Image
              src="/founder.jpg"
              alt="Viijeta R, founder of VYSON-AI"
              fill
              priority
              sizes="(min-width: 768px) 540px, 380px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
