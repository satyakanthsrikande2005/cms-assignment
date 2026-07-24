import Link from "next/link";
import { publicApi } from "@/lib/api";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

export default async function Home() {
  let posts: any[] = [];
  let categories: any[] = [];

  try {
    const [postData, catData] = await Promise.all([
      publicApi.getPosts({ limit: 6 }),
      publicApi.getCategories({ limit: 6 }),
    ]);
    posts = postData.posts || [];
    categories = catData.categories || [];
  } catch (err) {
    console.error("Failed to load homepage data:", err);
  }

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1) : posts;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
            Enterprise Content Management System
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Insights, Articles & Technical Resources
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover high-performance guides, full-stack tutorials, and enterprise publishing powered by Node.js, Express, MongoDB, and Next.js.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/posts"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg transition"
            >
              Browse Articles
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured Article</h2>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video md:aspect-auto bg-slate-100 relative overflow-hidden">
              {featuredPost.featuredImage ? (
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-8 text-indigo-200 font-bold text-2xl">
                  Featured Story
                </div>
              )}
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {featuredPost.categories?.[0] && (
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                    {featuredPost.categories[0].name}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">
                  <Link href={`/posts/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{featuredPost.author?.name}</span>
                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Showcase */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Explore Topics</h2>
            <Link href="/categories" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              View All Categories →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/categories/${cat.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-indigo-500 hover:shadow-md transition group"
              >
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {cat.description || "Browse articles"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Recent Publications</h2>
          <Link href="/posts" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
            View All Posts →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
            No published posts available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
