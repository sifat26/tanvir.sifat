const AdminPageWrapper = ({ title, subtitle, children, action }) => (
  <div>
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--text)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
    {children}
  </div>
);
export default AdminPageWrapper;
