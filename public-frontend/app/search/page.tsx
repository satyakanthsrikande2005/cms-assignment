"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { publicApi } from "@/lib/api";
import PostCard from "@/components/PostCard";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setPosts([]);
        setPages([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await publicApi.search({ q: query });
        setPosts(res.posts || []);
        setPages(res.pages || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Search Results
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Showing results for: <span className="font-semibold text-slate-900">"{query}"</span>
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">Searching articles & pages...</div>
      ) : posts.length === 0 && pages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
          No matches found for "{query}". Try a different keyword.
        </div>
      ) : (
        <div className="space-y-12">
          {pages.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Matching Pages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pages.map((p) => (
                  <Link
                    key={p._id}
                    href={`/pages/${p.slug}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 transition group"
                  >
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Matching Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
