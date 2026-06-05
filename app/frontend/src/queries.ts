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
