import Link from "next/link";
import { notFound } from "next/navigation";
import { publicApi } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await publicApi.getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords,
    };
  } catch (err) {
    return { title: "Post Detail" };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post: any = null;

  try {
    post = await publicApi.getPostBySlug(slug);
  } catch (err) {
    notFound();
  }

  if (!post) notFound();

  const dateStr = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2">
          {post.categories?.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug}`}
              className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-900">{post.author?.name || "Author"}</p>
            <p className="text-[11px] text-slate-400">Published on {dateStr}</p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="prose prose-slate max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase text-slate-400 mr-2">Tags:</span>
          {post.tags.map((tag: any) => (
            <Link
              key={tag._id}
              href={`/tags/${tag.slug}`}
              className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
