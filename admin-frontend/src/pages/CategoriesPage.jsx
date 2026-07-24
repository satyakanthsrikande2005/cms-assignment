import { useEffect, useState } from "react";
import { categoryApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryApi.getAll({ limit: 100 });
      setCategories(data.data.categories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await categoryApi.update(editingId, form);
    } else {
      await categoryApi.create(form);
    }
    setForm({ name: "", description: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await categoryApi.delete(id);
    fetchCategories();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category name" required className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">{editingId ? "Update" : "Add"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", description: "" }); }} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>}
      </form>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50"><tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Slug</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-200">
            {categories.map((c) => (
              <tr key={c._id}>
                <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{c.slug}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <button type="button" onClick={() => handleEdit(c)} className="mr-3 text-indigo-600">Edit</button>
                  <button type="button" onClick={() => handleDelete(c._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
