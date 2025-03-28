import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";

actor OrganDonation {
  // Define types
  public type DonorId = Nat;
  public type RecipientId = Nat;
  public type OrganType = Text;
  public type Name = Text;

  // Donor record
  public type Donor = {
    id: DonorId;
    name: Name;
    organ: OrganType;
  };

  // Recipient record
  public type Recipient = {
    id: RecipientId;
    name: Name;
    organ: OrganType;
  };

  // Define storage
  private var donors = HashMap.HashMap<DonorId, Donor>(10, Nat.hash, Nat.equal);
  private var recipients = HashMap.HashMap<RecipientId, Recipient>(10, Nat.hash, Nat.equal);
  private var organToDonors = HashMap.HashMap<OrganType, [DonorId]>(10, Text.hash, Text.equal);
  private var organToRecipients = HashMap.HashMap<OrganType, [RecipientId]>(10, Text.hash, Text.equal);
  private var nextDonorId : DonorId = 0;
  private var nextRecipientId : RecipientId = 0;

  // Helper function to generate unique Donor IDs
  private func generateDonorId() : DonorId {
    nextDonorId := nextDonorId + 1;
    return nextDonorId;
  };

  // Helper function to generate unique Recipient IDs
  private func generateRecipientId() : RecipientId {
    nextRecipientId := nextRecipientId + 1;
    return nextRecipientId;
  };

  // Register a donor
  public func registerDonor(name : Name, organ : OrganType) : async DonorId {
    let id = generateDonorId();
    let donor : Donor = { id = id; name = name; organ = organ };

    // Add donor to donors map
    donors.put(id, donor);

    // Update the organToDonors map with the donor's organ type
    switch (organToDonors.get(organ)) {
      case (?donorList) {
        organToDonors.put(organ, Array.concat(donorList, [id]));
      };
      case null {
        organToDonors.put(organ, [id]);
      };
    };

    return id;
  };

  // Register a recipient
  public func registerRecipient(name : Name, organ : OrganType) : async RecipientId {
    let id = generateRecipientId();
    let recipient : Recipient = { id = id; name = name; organ = organ };

    // Add recipient to recipients map
    recipients.put(id, recipient);

    // Update the organToRecipients map with the recipient's organ type
    switch (organToRecipients.get(organ)) {
      case (?recipientList) {
        organToRecipients.put(organ, Array.concat(recipientList, [id]));
      };
      case null {
        organToRecipients.put(organ, [id]);
      };
    };

    return id;
  };

  // Get all donors
  public func getDonors(): async [Donor] {
    var donorList : [Donor] = [];
    for (key in Iter.fromArray(donors.keys())) {
      switch (donors.get(key)) {
        case (?donor) {
          donorList := Array.concat(donorList, [donor]);
        };
        case null {};
      };
    };
    return donorList;
  };

  // Get all recipients
  public func getRecipients(): async [Recipient] {
    var recipientList : [Recipient] = [];
    for (key in Iter.fromArray(recipients.keys())) {
      switch (recipients.get(key)) {
        case (?recipient) {
          recipientList := Array.concat(recipientList, [recipient]);
        };
        case null {};
      };
    };
    return recipientList;
  };

  // Match organs efficiently using the organToDonors and organToRecipients maps
  public func matchOrgan(organ : OrganType) : async [(DonorId, RecipientId)] {
    var matches : [(DonorId, RecipientId)] = [];

    switch (organToDonors.get(organ)) {
      case (?donorIds) {
        switch (organToRecipients.get(organ)) {
          case (?recipientIds) {
            // Generate matches between donors and recipients of the same organ type
            for (donorId in Iter.fromArray(donorIds)) {
              for (recipientId in Iter.fromArray(recipientIds)) {
                matches := Array.concat(matches, [(donorId, recipientId)]);
              };
            };
          };
          case null {};
        };
      };
      case null {};
    };

    return matches;
  };
};