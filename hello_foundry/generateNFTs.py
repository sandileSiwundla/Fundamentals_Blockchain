import json
import os

OUTPUT_FOLDER = "metadata"
BASE_NAME = "Don't Be Dumb World Tour"
DESCRIPTION= "Asap Rocky's Dont Be Dump album tour in San Fransisco arena"
IMAGE_URI = "https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/bafkreiflvysd3kb3eprfkhwaf6hudpuiq7kauhtvltv7p6pqd3idjgqx54"
TOTAL_TICKETS = 20

os.makedirs(OUTPUT_FOLDER)

for i in range(1, TOTAL_TICKETS +1):
    metadata = {
      "name": f"{BASE_NAME} #{i}",
        "description": DESCRIPTION,
        "image": IMAGE_URI,
        "attributes": [
            {"trait_type": "Ticket Number", "value": i}
        ]  

    }
    file_path = os.path.join(OUTPUT_FOLDER, f"{i}.json")
    with open(file_path, "w") as f:
        json.dump(metadata, f, indent=4)

print(f"{TOTAL_TICKETS} metadata files generated in '{OUTPUT_FOLDER}' folder.")