import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pageApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const emptyForm = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featuredImage: "",
  status: "draft",
  seo: { metaTitle: "", metaDescription: "", ogImage: "", keywords: [] },
};

const PageFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    pageApi.getById(id).then(({ data }) => {
      const page = data.data.page;
      setForm({
        title: page.title || "",
        slug: page.slug || "",
        content: page.content || "",
        excerpt: page.excerpt || "",
        featuredImage: page.featuredImage || "",
        status: page.status || "draft",
        seo: page.seo || emptyForm.seo,
      });
    }).catch(() => setError("Failed to load page")).finally(() => setLoading(false));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await pageApi.update(id, form);
      } else {
        await pageApi.create(form);
      }
      navigate("/pages");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Page" : "New Page"}</h1>
      {error && <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="auto-generated from title" />
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
          <button type="submit" disabled={saving} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Page"}
          </button>
          <button type="button" onClick={() => navigate("/pages")} className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageFormPage;
