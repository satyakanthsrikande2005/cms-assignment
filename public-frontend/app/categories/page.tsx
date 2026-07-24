import Link from "next/link";
import { publicApi } from "@/lib/api";

export const revalidate = 60;

export default async function CategoriesPage() {
  let categories: any[] = [];
  try {
    const res = await publicApi.getCategories({});
    categories = res.categories || [];
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Categories</h1>
        <p className="text-sm text-slate-500 mt-1">Explore articles grouped by subject</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat.slug}`}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition group space-y-2"
          >
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
              {cat.name}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {cat.description || "Browse articles in this category."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
