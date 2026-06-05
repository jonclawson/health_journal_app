import { useQuery } from '@apollo/client/react';
import { GET_PROVIDERS, GET_CLIENTS } from './queries';

function ProvidersCard() {
  const { loading, error, data } = useQuery(GET_PROVIDERS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1">Loading providers...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1 text-red-500">Error: {error.message}</div>;

  const providers = [...data.providers].sort(
    (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Providers ({providers.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Clients</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p: { id: string; name: string; email: string; clients: { id: string }[]; createdAt: string }) => (
              <tr key={p.id} className="border-b border-slate-100 last:border-0">
                <td className="py-3 text-slate-800 font-medium">{p.name}</td>
                <td className="py-3 text-slate-600">{p.email}</td>
                <td className="py-3 text-slate-600">{p.clients.length}</td>
                <td className="py-3 text-slate-600">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientsCard() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1">Loading clients...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1 text-red-500">Error: {error.message}</div>;

  const clients = [...data.clients].sort(
    (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Clients ({clients.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Memberships</th>
              <th className="pb-3 font-medium">Journal Entries</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c: { id: string; name: string; email: string; memberships: { id: string }[]; journalEntries: { id: string }[]; createdAt: string }) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0">
                <td className="py-3 text-slate-800 font-medium">{c.name}</td>
                <td className="py-3 text-slate-600">{c.email}</td>
                <td className="py-3 text-slate-600">{c.memberships.length}</td>
                <td className="py-3 text-slate-600">{c.journalEntries.length}</td>
                <td className="py-3 text-slate-600">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Health Journal Dashboard</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProvidersCard />
          <ClientsCard />
        </div>
      </main>
    </div>
  );
}
