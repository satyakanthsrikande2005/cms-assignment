import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageApi, postApi, userApi, mediaApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const StatCard = ({ title, value, link, color }) => (
  <Link
    to={link}
    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
  >
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
  </Link>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pages, posts, users, media] = await Promise.allSettled([
          pageApi.getAll({ limit: 1 }),
          postApi.getAll({ limit: 1 }),
          userApi.getAll({ limit: 1 }),
          mediaApi.getAll({ limit: 1 }),
        ]);

        setStats({
          pages: pages.status === "fulfilled" ? pages.value.data.data.pagination.total : 0,
          posts: posts.status === "fulfilled" ? posts.value.data.data.pagination.total : 0,
          users: users.status === "fulfilled" ? users.value.data.data.pagination.total : 0,
          media: media.status === "fulfilled" ? media.value.data.data.pagination.total : 0,
        });
      } catch {
        setStats({ pages: 0, posts: 0, users: 0, media: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Overview of your content management system
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pages" value={stats.pages} link="/pages" color="text-indigo-600" />
        <StatCard title="Posts" value={stats.posts} link="/posts" color="text-green-600" />
        <StatCard title="Users" value={stats.users} link="/users" color="text-purple-600" />
        <StatCard title="Media Files" value={stats.media} link="/media" color="text-orange-600" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/pages/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              New Page
            </Link>
            <Link to="/posts/new" className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
              New Post
            </Link>
            <Link to="/media" className="rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700">
              Upload Media
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">System Info</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Architecture: Routes → Controllers → Services → Repositories</li>
            <li>Authentication: JWT with RBAC</li>
            <li>Database: MongoDB with Mongoose</li>
            <li>API: RESTful with standardized responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
