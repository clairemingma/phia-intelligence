import { SOCIAL_FEATURES } from "@/lib/featureTiles";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* eslint-disable @next/next/no-img-element */

/** The width Instagram gives a single column, which the card takes when there
 *  is room — on a phone it gives way rather than being clipped. */
const POST_MAX_WIDTH = 380;

function Action({ src, label, size = 24 }: { src: string; label: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      title={label}
      className="block max-w-none shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

/**
 * A sample of where the placement would run: Phia's account and a post it has
 * already published. Deliberately fixed — Phia writes and shoots these, so the
 * brand's brief is not the caption, and showing it as one would promise
 * copy control the placement does not come with.
 */
export default function SocialPostPreview() {
  const post = SOCIAL_FEATURES[0];
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[12px] border border-[#e3e3e3] bg-white"
      style={{ maxWidth: POST_MAX_WIDTH, boxShadow: "0 8px 28px rgba(0,5,20,0.10)" }}
    >
      {/* Account row */}
      <div className="flex items-center gap-[10px] px-[14px] py-[12px]">
        <img
          src="/assets/editorial-brand-phia.png"
          alt=""
          className="block size-[32px] shrink-0 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-1 items-center gap-[4px]">
          <span
            className="truncate text-[14px] leading-[18px] text-[#1a1a1a]"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            phia
          </span>
          <img
            src="/assets/icon-verified.svg"
            alt=""
            aria-hidden
            className="block size-[13px] shrink-0"
          />
        </div>
        <Action src="/assets/icon-dots-three.svg" label="More" size={20} />
      </div>

      {/* Artwork — Instagram's 4:5 portrait crop */}
      <div className="relative w-full overflow-hidden bg-[#f8f8f8]" style={{ aspectRatio: "4 / 5" }}>
        <img src={post.image} alt="" className="absolute inset-0 size-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-[14px] px-[14px] pt-[12px]">
        <Action src="/assets/icon-heart.svg" label="Like" />
        <Action src="/assets/icon-comment.svg" label="Comment" />
        <Action src="/assets/icon-share-post.svg" label="Share" />
        <span className="flex-1" />
        <Action src="/assets/icon-bookmark-post.svg" label="Save" />
      </div>

      <div className="flex flex-col gap-[6px] px-[14px] pt-[10px] pb-[16px]">
        <span
          className="text-[13px] leading-[18px] text-[#1a1a1a]"
          style={{ fontFamily: PP, fontWeight: 500 }}
        >
          2,418 likes
        </span>
        {/* The handle leads the caption, as a post sets it */}
        <p
          className="text-[13px] leading-[19px] text-[#1a1a1a]"
          style={{ fontFamily: PP, fontWeight: 400 }}
        >
          <span style={{ fontWeight: 500 }}>phia</span> {post.description}
        </p>
      </div>
    </div>
  );
}
