require "test_helper"

class ClientTest < ActiveSupport::TestCase
  test "validates name presence" do
    client = Client.new(email: "test@example.com")
    assert_not client.valid?
    assert_includes client.errors[:name], "can't be blank"
  end

  test "validates email presence" do
    client = Client.new(name: "Test")
    assert_not client.valid?
    assert_includes client.errors[:email], "can't be blank"
  end

  test "validates email uniqueness" do
    duplicate = Client.new(name: "Duplicate", email: clients(:dave).email)
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:email], "has already been taken"
  end

  test "can have more than one provider" do
    assert_equal 2, clients(:eve).providers.count
    assert_includes clients(:eve).providers, providers(:alice)
    assert_includes clients(:eve).providers, providers(:bob)
  end

  test "returns all providers for a given client" do
    eve_providers = clients(:eve).providers.pluck(:name).sort
    assert_equal [ "Alice (Dietitian)", "Bob (Nutritionist)" ], eve_providers
  end

  test "has many journal entries" do
    assert_equal 2, clients(:dave).journal_entries.count
  end

  test "journal entries are destroyed when client is destroyed" do
    assert_difference "JournalEntry.count", -2 do
      clients(:dave).destroy
    end
  end

  test "returns journal entries sorted by date descending" do
    entries = clients(:dave).journal_entries
    assert_equal journal_entries(:dave_entry_two), entries.first  # 1 day ago
    assert_equal journal_entries(:dave_entry_one), entries.second # 2 days ago
  end
end
