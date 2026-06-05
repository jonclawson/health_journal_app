class Membership < ApplicationRecord
  belongs_to :provider
  belongs_to :client

  enum :plan, { basic: "basic", premium: "premium" }, validate: true
  validates :plan, inclusion: { in: %w[basic premium], message: "%{value} is not a valid plan" }
  validates :client_id, uniqueness: { scope: :provider_id, message: "is already signed up with this provider" }
end
