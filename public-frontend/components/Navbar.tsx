"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { publicApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [categories, setCategories] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await publicApi.getCategories({ limit: 5 });
        setCategories(catRes.categories || []);
        const pageRes = await publicApi.getPages({ limit: 5 });
        setPages(pageRes.pages || []);
      } catch (err) {
        console.error("Failed to load header navigation:", err);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg">CMS</span>
              <span>Enterprise</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <Link href="/posts" className="hover:text-white transition">
                Articles
              </Link>
              <Link href="/categories" className="hover:text-white transition">
                Categories
              </Link>
              {pages.map((p) => (
                <Link
                  key={p._id}
                  href={`/pages/${p.slug}`}
                  className="hover:text-white transition"
                >
                  {p.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 text-white placeholder-slate-400 text-xs rounded-full px-4 py-2 w-48 focus:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </form>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
            <form onSubmit={handleSearch} className="mb-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-lg px-4 py-2"
              />
            </form>
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-300">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white">
                Home
              </Link>
              <Link href="/posts" onClick={() => setMenuOpen(false)} className="hover:text-white">
                Articles
              </Link>
              <Link href="/categories" onClick={() => setMenuOpen(false)} className="hover:text-white">
                Categories
              </Link>
              {pages.map((p) => (
                <Link
                  key={p._id}
                  href={`/pages/${p.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
