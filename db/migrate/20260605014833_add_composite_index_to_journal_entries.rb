class AddCompositeIndexToJournalEntries < ActiveRecord::Migration[8.1]
  def change
    add_index :journal_entries, [ :client_id, :created_at ]
  end
end
