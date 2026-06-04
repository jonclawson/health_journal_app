# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Providers
alice   = Provider.create!(name: "Alice (Dietitian)",     email: "alice@example.com")
bob     = Provider.create!(name: "Bob (Nutritionist)",    email: "bob_p@example.com")
carol   = Provider.create!(name: "Carol (Health Coach)",  email: "carol@example.com")

# Clients
dave    = Client.create!(name: "Dave",  email: "dave@example.com")
eve     = Client.create!(name: "Eve",   email: "eve@example.com")
frank   = Client.create!(name: "Frank", email: "frank@example.com")
grace   = Client.create!(name: "Grace", email: "grace@example.com")
henry   = Client.create!(name: "Henry", email: "henry@example.com")

# Memberships (assign clients to providers with plans)
Membership.create!(provider: alice, client: dave,  plan: "premium")
Membership.create!(provider: alice, client: eve,   plan: "basic")
Membership.create!(provider: bob,   client: frank, plan: "premium")
Membership.create!(provider: bob,   client: grace, plan: "basic")
Membership.create!(provider: carol, client: henry, plan: "premium")
Membership.create!(provider: carol, client: dave,  plan: "basic")   # Dave has two providers

# Journal entries (staggered with sleep so ordering is meaningful)
dave.journal_entries.create!(content: "Feeling great after following the meal plan today.")
sleep 1
eve.journal_entries.create!(content: "Had trouble hitting my water target — will try harder tomorrow.")
sleep 1
frank.journal_entries.create!(content: "Energy levels are up since cutting out processed sugar.")
sleep 1
grace.journal_entries.create!(content: "Meal prep on Sunday made the whole week easier.")
sleep 1
henry.journal_entries.create!(content: "Noticed less bloating after reducing dairy intake.")
sleep 1
dave.journal_entries.create!(content: "Second week check-in: down 3 lbs, feeling motivated!")
