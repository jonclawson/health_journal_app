# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [ Types::NodeType, null: true ], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ ID ], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # ---- Providers ----
    field :provider, Types::ProviderType, null: true do
      argument :id, ID, required: true
    end

    def provider(id:)
      Provider.find_by(id: id)
    end

    field :providers, [ Types::ProviderType, null: false ], null: false

    def providers
      Provider.all
    end

    # ---- Clients ----
    field :client, Types::ClientType, null: true do
      argument :id, ID, required: true
    end

    def client(id:)
      Client.find_by(id: id)
    end

    field :clients, [ Types::ClientType, null: false ], null: false

    def clients
      Client.all
    end

    # ---- Memberships ----
    field :membership, Types::MembershipType, null: true do
      argument :id, ID, required: true
    end

    def membership(id:)
      Membership.find_by(id: id)
    end

    field :memberships, [ Types::MembershipType, null: false ], null: false do
      argument :provider_id, ID, required: false
      argument :client_id, ID, required: false
    end

    def memberships(provider_id: nil, client_id: nil)
      scope = Membership.all
      scope = scope.where(provider_id: provider_id) if provider_id
      scope = scope.where(client_id: client_id) if client_id
      scope
    end

    # ---- Journal Entries ----
    field :journal_entry, Types::JournalEntryType, null: true do
      argument :id, ID, required: true
    end

    def journal_entry(id:)
      JournalEntry.find_by(id: id)
    end

    field :journal_entries, [ Types::JournalEntryType, null: false ], null: false do
      argument :client_id, ID, required: false
    end

    def journal_entries(client_id: nil)
      scope = JournalEntry.all
      scope = scope.where(client_id: client_id) if client_id
      scope.order(created_at: :desc)
    end
  end
end
