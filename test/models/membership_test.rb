require "test_helper"

class MembershipTest < ActiveSupport::TestCase
  test "validates plan inclusion with basic" do
    membership = Membership.new(provider: providers(:alice), client: clients(:frank), plan: "basic")
    assert membership.valid?
  end

  test "validates plan inclusion with premium" do
    membership = Membership.new(provider: providers(:alice), client: clients(:frank), plan: "premium")
    assert membership.valid?
  end

  test "rejects invalid plan" do
    membership = Membership.new(provider: providers(:alice), client: clients(:frank), plan: "gold")
    assert_not membership.valid?
    assert_includes membership.errors[:plan], "gold is not a valid plan"
  end

  test "validates client uniqueness scoped to provider" do
    duplicate = Membership.new(provider: providers(:alice), client: clients(:dave), plan: "basic")
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:client_id], "is already signed up with this provider"
  end

  test "allows same client with different provider" do
    membership = Membership.new(provider: providers(:bob), client: clients(:dave), plan: "basic")
    assert membership.valid?
  end

  test "belongs to provider" do
    membership = memberships(:alice_dave)
    assert_equal providers(:alice), membership.provider
  end

  test "belongs to client" do
    membership = memberships(:alice_dave)
    assert_equal clients(:dave), membership.client
  end
end
