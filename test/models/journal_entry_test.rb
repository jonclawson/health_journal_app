require "test_helper"

class JournalEntryTest < ActiveSupport::TestCase
  test "validates content presence" do
    entry = JournalEntry.new(client: clients(:dave))
    assert_not entry.valid?
    assert_includes entry.errors[:content], "can't be blank"
  end

  test "belongs to client" do
    entry = journal_entries(:dave_entry_one)
    assert_equal clients(:dave), entry.client
  end
end
