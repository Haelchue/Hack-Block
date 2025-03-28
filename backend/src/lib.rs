use ic_cdk::storage;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

// Define Donor & Recipient Structs
#[derive(Serialize, Deserialize, Clone)]
struct Donor {
    id: u64,
    name: String,
    blood_type: String,
    organ: String,
}

#[derive(Serialize, Deserialize, Clone)]
struct Recipient {
    id: u64,
    name: String,
    blood_type: String,
    organ_needed: String,
}

// Storage for Donors & Recipients
static mut DONORS: Option<HashMap<u64, Donor>> = None;
static mut RECIPIENTS: Option<HashMap<u64, Recipient>> = None;

// Add new Donor
#[ic_cdk::update]
fn register_donor(id: u64, name: String, blood_type: String, organ: String) {
    unsafe {
        let donors = DONORS.get_or_insert_with(HashMap::new);
        donors.insert(id, Donor { id, name, blood_type, organ });
    }
}

// Add new Recipient
#[ic_cdk::update]
fn register_recipient(id: u64, name: String, blood_type: String, organ_needed: String) {
    unsafe {
        let recipients = RECIPIENTS.get_or_insert_with(HashMap::new);
        recipients.insert(id, Recipient { id, name, blood_type, organ_needed });
    }
}

// Fetch stored Donors
#[ic_cdk::query]
fn get_donors() -> Vec<Donor> {
    unsafe {
        DONORS.as_ref().map(|d| d.values().cloned().collect()).unwrap_or_default()
    }
}

// Fetch stored Recipients
#[ic_cdk::query]
fn get_recipients() -> Vec<Recipient> {
    unsafe {
        RECIPIENTS.as_ref().map(|r| r.values().cloned().collect()).unwrap_or_default()
    }
}
