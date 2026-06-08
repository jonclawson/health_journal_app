module Types
  class ProviderType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :memberships, [ Types::MembershipType ], null: false
    field :clients, [ Types::ClientType ], null: false
    field :journal_entries, [ Types::JournalEntryType ], null: false
  end
end
