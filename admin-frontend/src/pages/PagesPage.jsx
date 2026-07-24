import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";

const PagesPage = () => {
  const [pages, setPages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data } = await pageApi.getAll({ page, limit: 10, search });
      setPages(data.data.pages);
      setPagination(data.data.pagination);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this page?")) return;
    await pageApi.delete(id);
    fetchPages();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="text-sm text-slate-500">Manage static pages</p>
        </div>
        <Link to="/pages/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          New Page
        </Link>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search pages..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">Author</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pages.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{p.slug}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{p.author?.name}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <Link to={`/pages/${p._id}/edit`} className="mr-3 text-indigo-600 hover:underline">Edit</Link>
                    <button type="button" onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No pages found</td></tr>
              )}
            </tbody>
          </table>
          {pagination && <Pagination pagination={pagination} onPageChange={setPage} />}
        </div>
      )}
    </div>
  );
};

export default PagesPage;
