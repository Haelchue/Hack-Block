import hashlib

def hash_data(data):
    return hashlib.sha256(data.encode()).hexdigest()

def build_merkle_tree(data_list):
    if len(data_list) == 1:
        return data_list[0]
    new_level = [hash_data(data_list[i] + data_list[i+1]) for i in range(0, len(data_list)-1, 2)]
    return build_merkle_tree(new_level)