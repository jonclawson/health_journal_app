import { useQuery } from '@apollo/client/react';
import { GET_PROVIDERS, GET_CLIENTS } from './queries';
import DataTable from './DataTable';

interface ProviderRow {
  id: string;
  name: string;
  email: string;
  clients: { id: string }[];
  createdAt: string;
}

interface ClientRow {
  id: string;
  name: string;
  email: string;
  memberships: { id: string }[];
  journalEntries: { id: string }[];
  createdAt: string;
}

function ProvidersCard() {
  const { loading, error, data } = useQuery(GET_PROVIDERS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1">Loading providers...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1 text-red-500">Error: {error.message}</div>;

  const providers: ProviderRow[] = [...data.providers].sort(
    (a: ProviderRow, b: ProviderRow) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Providers ({providers.length})</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', render: (p: ProviderRow) => <span className="text-slate-800 font-medium">{p.name}</span> },
          { key: 'email', label: 'Email', render: (p: ProviderRow) => p.email },
          { key: 'clients', label: 'Clients', render: (p: ProviderRow) => p.clients.length },
          { key: 'createdAt', label: 'Created', render: (p: ProviderRow) => new Date(p.createdAt).toLocaleDateString() },
        ]}
        rows={providers}
      />
    </div>
  );
}

function ClientsCard() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1">Loading clients...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 col-span-1 text-red-500">Error: {error.message}</div>;

  const clients: ClientRow[] = [...data.clients].sort(
    (a: ClientRow, b: ClientRow) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Clients ({clients.length})</h2>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', render: (c: ClientRow) => <span className="text-slate-800 font-medium">{c.name}</span> },
          { key: 'email', label: 'Email', render: (c: ClientRow) => c.email },
          { key: 'memberships', label: 'Memberships', render: (c: ClientRow) => c.memberships.length },
          { key: 'journalEntries', label: 'Journal Entries', render: (c: ClientRow) => c.journalEntries.length },
          { key: 'createdAt', label: 'Created', render: (c: ClientRow) => new Date(c.createdAt).toLocaleDateString() },
        ]}
        rows={clients}
      />
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
