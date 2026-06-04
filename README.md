# Health Journal app

This is an example of Ruby on Rails models.

- Both providers and clients have a name and email address
- Providers have many clients; clients can have more than one provider
- For each provider a client is signed up with, they have one plan - either "basic" or "premium"
- Clients can post journal entries consisting of freeform text
### ActiveRecord queries:
- All clients for a given provider
- All providers for a given client
- All journal entries for a given client, sorted by date
- All journal entries across all clients of a given provider, sorted by date
