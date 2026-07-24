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
    const page = await publicApi.getPageBySlug(slug);
    if (!page) return { title: "Page Not Found" };
    return {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || page.excerpt,
    };
  } catch (err) {
    return { title: "CMS Page" };
  }
}

export default async function CMSPageDetail({ params }: PageProps) {
  const { slug } = await params;
  let page: any = null;

  try {
    page = await publicApi.getPageBySlug(slug);
  } catch (err) {
    notFound();
  }

  if (!page) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {page.title}
        </h1>
        {page.excerpt && (
          <p className="text-base sm:text-lg text-slate-500 font-normal">
            {page.excerpt}
          </p>
        )}
      </header>

      {page.featuredImage && (
        <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={page.featuredImage}
            alt={page.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-slate max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: page.content || "" }}
      />
    </article>
  );
}
