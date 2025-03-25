import json

def find_best_match(donors, recipients):
    for recipient in recipients:
        for donor in donors:
            if recipient['bloodType'] == donor['bloodType'] and recipient['organ'] == donor['organ']:
                return donor
    return None

if __name__ == "__main__":
    with open('donors.json', 'r') as f:
        donors = json.load(f)
    with open('recipients.json', 'r') as f:
        recipients = json.load(f)
    
    match = find_best_match(donors, recipients)
    print("Best Match:", match)