require "test_helper"

class ProviderTest < ActiveSupport::TestCase
  test "validates name presence" do
    provider = Provider.new(email: "test@example.com")
    assert_not provider.valid?
    assert_includes provider.errors[:name], "can't be blank"
  end

  test "validates email presence" do
    provider = Provider.new(name: "Test")
    assert_not provider.valid?
    assert_includes provider.errors[:email], "can't be blank"
  end

  test "validates email uniqueness" do
    duplicate = Provider.new(name: "Duplicate", email: providers(:alice).email)
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:email], "has already been taken"
  end

  test "has many clients through memberships" do
    provider = providers(:alice)
    assert_equal 2, provider.clients.count
    assert_includes provider.clients, clients(:dave)
    assert_includes provider.clients, clients(:eve)
  end

  test "returns all clients for a given provider" do
    alice_clients = providers(:alice).clients.pluck(:name).sort
    assert_equal %w[Dave Eve], alice_clients
  end

  test "returns all journal entries across all clients sorted by date descending" do
    entries = providers(:alice).journal_entries
    assert_equal 3, entries.count
    assert_equal journal_entries(:eve_entry_one), entries.first
    assert_equal journal_entries(:dave_entry_two), entries.second
    assert_equal journal_entries(:dave_entry_one), entries.third
  end
end
