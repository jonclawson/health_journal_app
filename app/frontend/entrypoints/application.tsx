import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { client } from '../src/apollo';
import Dashboard from '../src/Dashboard';
import './application.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}
