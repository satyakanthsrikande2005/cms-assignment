import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const navItems = [
  { to: "/dashboard", label: "Dashboard", roles: ["admin", "editor", "author"] },
  { to: "/pages", label: "Pages", roles: ["admin", "editor", "author"] },
  { to: "/posts", label: "Posts", roles: ["admin", "editor", "author"] },
  { to: "/categories", label: "Categories", roles: ["admin", "editor"] },
  { to: "/tags", label: "Tags", roles: ["admin", "editor"] },
  { to: "/media", label: "Media", roles: ["admin", "editor", "author"] },
  { to: "/users", label: "Users", roles: ["admin"] },
  { to: "/settings", label: "Settings", roles: ["admin"] },
];

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const visibleNav = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 px-6 py-5">
          <h1 className="text-lg font-bold">Enterprise CMS</h1>
          <p className="mt-1 text-xs text-slate-400">Admin Panel</p>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {visibleNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="ml-64 flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Welcome back</p>
              <p className="font-semibold text-slate-900">{user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                {user?.role}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
