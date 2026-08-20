import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog";

/**
 * One article, as a card.
 *
 * Shared by the Health Library listing and the related-reading rail at the foot of an
 * article, because they had drifted into two different cards — one with a cover, one
 * without — and a reader who scrolled from the listing to the bottom of a post met the
 * same article twice looking like two different things.
 */
export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[22px] border aj-card transition-shadow hover:shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)]"
    >
      {/* Only where a cover exists — a card with a grey placeholder box looks more broken
          than a card that simply leads with its heading. */}
      {post.coverImage?.src && (
        <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-navy/[0.07]">
          <Image
            src={post.coverImage.src}
            // Decorative here: the heading beside it already names the article, and the
            // cover carries that same title printed on the artwork.
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>
      )}

      <span className="flex flex-1 flex-col p-6">
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
          {post.category}
        </span>
        <span className="mt-2.5 block font-heading text-[18px] font-bold leading-snug text-navy">
          {post.title}
        </span>
        <span className="mt-2.5 line-clamp-3 block font-body text-[13.5px] leading-relaxed text-muted">
          {post.description}
        </span>
        <span className="mt-auto flex items-center justify-between border-t border-navy/[0.07] pt-4">
          {/* muted, not faint: faint is #8794a7 and measures 2.63:1 on the card gradient,
              against the 4.5:1 this size needs. */}
          <span className="font-body text-[12px] font-medium text-muted">
            {formatPostDate(post.updatedAt ?? post.publishedAt)} · {post.readingMinutes} min
          </span>
          <ChevronRight
            className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.6}
          />
        </span>
      </span>
    </Link>
  );
}
