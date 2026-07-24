const StatusBadge = ({ status }) => {
  const colors = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        colors[status] || colors.draft
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
