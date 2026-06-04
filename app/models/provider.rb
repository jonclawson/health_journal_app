class Provider < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :clients, through: :memberships
  has_many :journal_entries, through: :clients

  validates :name, :email, presence: true
  validates :email, uniqueness: true
end
