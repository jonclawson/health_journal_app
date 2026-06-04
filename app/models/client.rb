class Client < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :providers, through: :memberships
  has_many :journal_entries, dependent: :destroy

  validates :name, :email, presence: true
  validates :email, uniqueness: true
end
