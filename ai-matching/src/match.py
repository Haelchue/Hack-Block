import requests

def match_donor(recipient_id):
    # Fetch recipient details from Rust backend
    recipient = requests.get("http://127.0.0.1:5000/get_recipients").json()
    
    # Fetch donor list
    donors = requests.get("http://127.0.0.1:5000/get_donors").json()
    
    # Simple rule-based match
    best_match = None
    for donor in donors:
        if donor["blood_type"] == recipient["blood_type"] and donor["organ"] == recipient["organ_needed"]:
            best_match = donor
            break
    
    return {"recipient_id": recipient_id, "donor_id": best_match["id"] if best_match else None}

if __name__ == "__main__":
    match = match_donor(101)
    print(match)
