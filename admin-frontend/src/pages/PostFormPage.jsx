import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postApi, categoryApi, tagApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const emptyForm = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featuredImage: "",
  status: "draft",
  categories: [],
  tags: [],
  seo: { metaTitle: "", metaDescription: "", ogImage: "", keywords: [] },
};

const PostFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, tgs] = await Promise.all([
          categoryApi.getAll({ limit: 100 }),
          tagApi.getAll({ limit: 100 }),
        ]);
        setCategories(cats.data.data.categories);
        setTags(tgs.data.data.tags);

        if (isEdit) {
          const { data } = await postApi.getById(id);
          const post = data.data.post;
          setForm({
            title: post.title || "",
            slug: post.slug || "",
            content: post.content || "",
            excerpt: post.excerpt || "",
            featuredImage: post.featuredImage || "",
            status: post.status || "draft",
            categories: post.categories?.map((c) => c._id) || [],
            tags: post.tags?.map((t) => t._id) || [],
            seo: post.seo || emptyForm.seo,
          });
        }
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("seo.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setForm((prev) => {
      const arr = prev[name];
      return {
        ...prev,
        [name]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await postApi.update(id, form);
      } else {
        await postApi.create(form);
      }
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Post" : "New Post"}</h1>
      {error && <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Excerpt</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={10} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Featured Image URL</label>
              <input name="featuredImage" value={form.featuredImage} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <label key={c._id} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-sm">
                  <input type="checkbox" checked={form.categories.includes(c._id)} onChange={() => handleMultiSelect("categories", c._id)} />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <label key={t._id} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-sm">
                  <input type="checkbox" checked={form.tags.includes(t._id)} onChange={() => handleMultiSelect("tags", t._id)} />
                  {t.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-semibold">SEO Settings</h2>
          <div>
            <label className="block text-sm font-medium">Meta Title</label>
            <input name="seo.metaTitle" value={form.seo.metaTitle} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Meta Description</label>
            <textarea name="seo.metaDescription" value={form.seo.metaDescription} onChange={handleChange} rows={2} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Post"}
          </button>
          <button type="button" onClick={() => navigate("/posts")} className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostFormPage;
