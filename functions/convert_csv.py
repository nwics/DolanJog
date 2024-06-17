import csv
import json

def csv_to_json(csv_file, json_file):
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        data = []
        for row in reader:
            Place_ID, Place_Name, Deskripsi,Jam,Harga, lokasi, fasilitas,Detail_lokasi = row
            # gambar = gambar.split(';')  # asumsikan url gambar dipisahkan oleh ';'
            data.append({
                "id": int(Place_ID),
                "nama": Place_Name,
                "deskripsi": Deskripsi,
                "jam": Jam,
                "harga" : Harga,
                "lokasi": lokasi,
                "fasilitas": fasilitas,
                "detail lokasi": Detail_lokasi
            })

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
csv_to_json("datafiksjson.csv", "namaTempatWisata.json")