import { gql } from '@apollo/client';

export const GET_PROVIDERS = gql`
  query GetProviders {
    providers {
      id
      name
      email
      createdAt
      clients { id }
      memberships { id }
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      createdAt
      journalEntries { id }
      memberships { id }
    }
  }
`;

export const GET_PROVIDER_CLIENTS = gql`
  query GetProviderClients($id: ID!) {
    provider(id: $id) {
      name
      clients {
        id
        name
        email
        createdAt
      }
    }
  }
`;

export const GET_CLIENT_MEMBERSHIPS = gql`
  query GetClientMemberships($id: ID!) {
    client(id: $id) {
      name
      memberships {
        id
        plan
        provider { name }
        createdAt
      }
    }
  }
`;

export const GET_CLIENT_JOURNAL_ENTRIES = gql`
  query GetClientJournalEntries($id: ID!) {
    client(id: $id) {
      name
      journalEntries {
        id
        content
        createdAt
      }
    }
  }
`;
