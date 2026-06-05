import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_PROVIDERS, GET_CLIENTS, GET_PROVIDER_CLIENTS, GET_CLIENT_MEMBERSHIPS, GET_CLIENT_JOURNAL_ENTRIES } from './queries';
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

type DetailView =
  | { type: 'provider_clients'; providerId: string; providerName: string }
  | { type: 'client_memberships'; clientId: string; clientName: string }
  | { type: 'client_journals'; clientId: string; clientName: string }
  | null;

function DetailPanel({ detail, onClose }: { detail: NonNullable<DetailView>; onClose: () => void }) {
  if (detail.type === 'provider_clients') {
    return <DetailProviderClients providerId={detail.providerId} providerName={detail.providerName} onClose={onClose} />;
  }
  if (detail.type === 'client_memberships') {
    return <DetailClientMemberships clientId={detail.clientId} clientName={detail.clientName} onClose={onClose} />;
  }
  return <DetailClientJournals clientId={detail.clientId} clientName={detail.clientName} onClose={onClose} />;
}

function DetailProviderClients({ providerId, providerName, onClose }: { providerId: string; providerName: string; onClose: () => void }) {
  const { loading, error, data } = useQuery(GET_PROVIDER_CLIENTS, { variables: { id: providerId } });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Clients of {providerName}</h2>
        <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer">✕ Close</button>
      </div>
      {loading && <p className="text-slate-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <>
          {(() => {
            const clients = (data as { provider: { clients: Array<{ name: string; email: string; createdAt: string }> } }).provider.clients;
            return (
              <DataTable
                columns={[
                  { key: 'name', label: 'Name', render: (c) => <span className="text-slate-800 font-medium">{c.name}</span> },
                  { key: 'email', label: 'Email', render: (c) => c.email },
                  { key: 'createdAt', label: 'Created', render: (c) => new Date(c.createdAt).toLocaleDateString() },
                ]}
                rows={clients}
              />
            );
          })()}
        </>
      )}
    </div>
  );
}

function DetailClientMemberships({ clientId, clientName, onClose }: { clientId: string; clientName: string; onClose: () => void }) {
  const { loading, error, data } = useQuery(GET_CLIENT_MEMBERSHIPS, { variables: { id: clientId } });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Memberships of {clientName}</h2>
        <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer">✕ Close</button>
      </div>
      {loading && <p className="text-slate-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <>
          {(() => {
            const memberships = (data as { client: { memberships: Array<{ plan: string; provider: { name: string }; createdAt: string }> } }).client.memberships;
            return (
              <DataTable
                columns={[
                  { key: 'plan', label: 'Plan', render: (m) => <span className="text-slate-800 font-medium capitalize">{m.plan}</span> },
                  { key: 'provider', label: 'Provider', render: (m) => m.provider.name },
                  { key: 'createdAt', label: 'Since', render: (m) => new Date(m.createdAt).toLocaleDateString() },
                ]}
                rows={memberships}
              />
            );
          })()}
        </>
      )}
    </div>
  );
}

function DetailClientJournals({ clientId, clientName, onClose }: { clientId: string; clientName: string; onClose: () => void }) {
  const { loading, error, data } = useQuery(GET_CLIENT_JOURNAL_ENTRIES, { variables: { id: clientId } });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Journal Entries of {clientName}</h2>
        <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer">✕ Close</button>
      </div>
      {loading && <p className="text-slate-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <>
          {(() => {
            const entries = (data as { client: { journalEntries: Array<{ content: string; createdAt: string }> } }).client.journalEntries;
            return (
              <DataTable
                columns={[
                  { key: 'content', label: 'Content', render: (j) => <span className="text-slate-700">{j.content.length > 80 ? j.content.slice(0, 80) + '…' : j.content}</span> },
                  { key: 'createdAt', label: 'Date', render: (j) => new Date(j.createdAt).toLocaleDateString() },
                ]}
                rows={entries}
              />
            );
          })()}
        </>
      )}
    </div>
  );
}

function ProvidersCard({ onCountClick }: { onCountClick: (provider: ProviderRow) => void }) {
  const { loading, error, data } = useQuery(GET_PROVIDERS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">Loading providers...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-red-500">Error: {error.message}</div>;

  const providers: ProviderRow[] = [...(data as any).providers].sort(
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
          {
            key: 'clients',
            label: 'Clients',
            render: (p: ProviderRow) => (
              <button onClick={() => onCountClick(p)} className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer">
                {p.clients.length}
              </button>
            ),
          },
          { key: 'createdAt', label: 'Created', render: (p: ProviderRow) => new Date(p.createdAt).toLocaleDateString() },
        ]}
        rows={providers}
      />
    </div>
  );
}

function ClientsCard({ onMembershipsClick, onJournalsClick }: {
  onMembershipsClick: (client: ClientRow) => void;
  onJournalsClick: (client: ClientRow) => void;
}) {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">Loading clients...</div>;
  if (error) return <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-red-500">Error: {error.message}</div>;

  const clients: ClientRow[] = [...(data as any).clients].sort(
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
          {
            key: 'memberships',
            label: 'Memberships',
            render: (c: ClientRow) => (
              <button onClick={() => onMembershipsClick(c)} className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer">
                {c.memberships.length}
              </button>
            ),
          },
          {
            key: 'journalEntries',
            label: 'Journal Entries',
            render: (c: ClientRow) => (
              <button onClick={() => onJournalsClick(c)} className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer">
                {c.journalEntries.length}
              </button>
            ),
          },
          { key: 'createdAt', label: 'Created', render: (c: ClientRow) => new Date(c.createdAt).toLocaleDateString() },
        ]}
        rows={clients}
      />
    </div>
  );
}

export default function Dashboard() {
  const [detail, setDetail] = useState<DetailView>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Health Journal Dashboard</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProvidersCard
            onCountClick={(p) => setDetail({ type: 'provider_clients', providerId: p.id, providerName: p.name })}
          />
          <ClientsCard
            onMembershipsClick={(c) => setDetail({ type: 'client_memberships', clientId: c.id, clientName: c.name })}
            onJournalsClick={(c) => setDetail({ type: 'client_journals', clientId: c.id, clientName: c.name })}
          />
        </div>

        {detail && (
          <div className="mt-6">
            <DetailPanel detail={detail} onClose={() => setDetail(null)} />
          </div>
        )}
      </main>
    </div>
  );
}
