class CreateMemberships < ActiveRecord::Migration[8.1]
  def change
    create_table :memberships do |t|
      t.references :provider, null: false, foreign_key: true
      t.references :client, null: false, foreign_key: true
      t.string :plan, null: false, default: 'basic'

      t.timestamps
    end
    add_index :memberships, [ :provider_id, :client_id ], unique: true
  end
end
