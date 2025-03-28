def calculate_match_score(donor, recipient):
    """ Calculate match score based on blood type, urgency, and other factors """
    score = 0
    if donor["blood_type"] == recipient["blood_type"]:
        score += 5
    if donor["organ_type"] == recipient["organ_type"]:
        score += 5
    score += max(0, 10 - abs(donor["age"] - recipient["age"]))  # Age similarity
    return score
