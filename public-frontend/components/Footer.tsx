import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg text-sm">CMS</span>
              <span>Enterprise Platform</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A high-performance enterprise content management platform built with modern web standards, API-driven architecture, and secure role-based controls.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-white transition">All Articles</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition">Categories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
            <p className="text-xs text-slate-400">
              Powered by Node.js, Express, MongoDB, React & Next.js.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Enterprise CMS. All rights reserved.</p>
          <p>Production Ready CMS</p>
        </div>
      </div>
    </footer>
  );
}
