import { useState, useEffect } from "react";
import { mediaApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

export default function MediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await mediaApi.getAll({ page, limit: 12 });
      setMediaList(res.data.data.media);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [page]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      await mediaApi.upload(formData);
      fetchMedia();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await mediaApi.delete(id);
      fetchMedia();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete media");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-sm text-slate-500">Upload and manage image assets and media files</p>
        </div>
        <label className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 cursor-pointer transition">
          {uploading ? "Uploading..." : "Upload Media"}
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </label>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : mediaList.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm text-slate-400">
          No media uploaded yet.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                  {item.mimeType?.startsWith("image/") ? (
                    <img
                      src={item.url}
                      alt={item.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <span className="text-xs uppercase font-mono text-slate-400">
                      {item.mimeType}
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-medium text-slate-900 truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={() => handleCopyUrl(item.url, item._id)}
                    className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow hover:bg-slate-100"
                  >
                    {copiedId === item._id ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pagination && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <Pagination pagination={pagination} onPageChange={setPage} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
