import Link from "next/link";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: string;
    publishedAt?: string;
    createdAt: string;
    author?: { name: string; avatar?: string };
    categories?: { _id: string; name: string; slug: string }[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  const primaryCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;
  const dateStr = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {post.featuredImage ? (
        <div className="aspect-video bg-slate-100 overflow-hidden relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center p-6 text-slate-400 font-semibold text-lg">
          {primaryCategory?.name || "Article"}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {primaryCategory && (
          <Link
            href={`/categories/${primaryCategory.slug}`}
            className="inline-block self-start text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-3 hover:bg-indigo-100 transition"
          >
            {primaryCategory.name}
          </Link>
        )}

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-600">{post.author?.name || "Author"}</span>
          <span>{dateStr}</span>
        </div>
      </div>
    </article>
  );
}
