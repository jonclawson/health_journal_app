export default function DataTable({ columns, rows }: {
  columns: { key: string; label: string; render: (item: any) => React.ReactNode }[];
  rows: any[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            {columns.map((col) => (
              <th key={col.key} className="pb-3 font-medium">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="py-3 text-slate-600">{col.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
