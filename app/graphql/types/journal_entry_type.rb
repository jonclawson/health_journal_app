module Types
  class JournalEntryType < Types::BaseObject
    field :id, ID, null: false
    field :content, String, null: false
    field :client_id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :client, Types::ClientType, null: false
  end
end
