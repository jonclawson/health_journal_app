module Types
  class MembershipType < Types::BaseObject
    field :id, ID, null: false
    field :plan, String, null: false
    field :provider_id, ID, null: false
    field :client_id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :provider, Types::ProviderType, null: false
    field :client, Types::ClientType, null: false
  end
end
