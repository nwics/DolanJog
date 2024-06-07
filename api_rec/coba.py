import requests
import pandas as pd


# meminta API cuaca
def get_weather(time) :
      # Ganti dengan API key Anda
    api_key = "94f8cd63ae634c00b9812908240603"
    # Ganti dengan lokasi yang diinginkan
    location = "Yogyakarta"
    # Panggil API prakiraan cuaca
    response = requests.get(f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={location}&hour={time}")
    data = response.json()
    # keterangan hari dan tanggal
    day = data['forecast']['forecastday'][0]['date']
    # Dapatkan prakiraan cuaca untuk jam yang diinginkan
    suhu = data['forecast']['forecastday'][0]['hour'][int(time)]['temp_c']
    forecast = data['forecast']['forecastday'][0]['hour'][int(time)]['condition']['text']
    return print(f"hari ini tanggal {day} pada jam {time} suhu mencapai {suhu} dengan prediksi {forecast}")

# get_weather(16.00)

def make_data():
      df = pd.read_csv("TempatWisata.csv")
    # membuat kolom baru dengan nama metadata
      df['Metadata'] = df['Place_ID'].astype(str)+" "+ df['Place_Name'].astype(str) +" " + df['Deskripsi'].astype(str)+" "+ df['Kategori'].astype(str)+" "+df['Harga'].astype(str)+" "+df['lokasi'].astype(str)+" "+df['fasilitas'].astype(str)
    # menyimpan data frame
      df.to_csv("dataTempatWisata.csv", index=False)
      print("hasil sudah jadi")
# make_data()

import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.preprocessing import MinMaxScaler
import random
def normalize_weather():
    dataset = pd.read_csv('E:/bil up/sem 8/codingan/dolanjo/api_rec/dataTempatWisata.csv', low_memory=False)

    url = f"https://www.weatherapi.com/docs/weather_conditions.json"
    response = requests.get(url)
    data_weather = response.json()

    # print("data cuaca:", data_weather)
    
    # Mengambil nilai 'code' untuk dijadikan fitur yang akan dinormalisasi
    features_to_normalize = [entry["code"] for entry in data_weather]

    # Menggunakan MinMaxScaler untuk normalisasi
    scaler = MinMaxScaler()
    normalized_features = scaler.fit_transform([[code] for code in features_to_normalize])
     # Memperkenalkan variasi untuk membuat cuaca tidak terlalu mirip
    for i, entry in enumerate(data_weather):
        variation_factor = random.uniform(0.8, 1.2)  # Faktor variasi acak
        entry["code_normalized"] = normalized_features[i][0] * variation_factor

    # Memasukkan nilai yang sudah dinormalisasi kembali ke dalam data cuaca
    for i, entry in enumerate(data_weather):
        entry["code_normalized"] = normalized_features[i][0]
    # print("ini normalized:", normalized_features)
    if (normalized_features <= 0.5).any() :
        print("cuaca sedang baik, maka disarankan tempat Outdoor:")
        tempat_cuaca = dataset[dataset["Kategori"]=="Indoor"]
        data_metadata = tempat_cuaca["Metadata"]
        print("tempat indoor:", data_metadata)
    else :
        print("cuaca sedang buruk, maka disarankan tempat indoor")
        tempat_cuaca = dataset[dataset["Kategori"]=="Outdoor"]

    # Menampilkan hasil
    for entry in data_weather:
        print(entry)

    return normalized_features

# normalized_features = normalize_weather()

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np

# Contoh data tempat wisata
data = [
    {'id': 20, 'nama': 'Tebing Breksi', 'deskripsi': 'Tebing Breksi merupakan tempat wisata yang berada di wilayah Kabupaten Sleman. Lokasinya berada di sebelah selatan Candi Prambanan dan berdekatan dengan Candi Ijo serta Kompleks Keraton Boko. Lokasi Wisata Tebing Breksi tepatnya berada di Desa Sambirejo, Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55572.', 'kategori': 'Outdoor', 'harga': 20000, 'fasilitas': 'Pemandangan alam, hiking, area foto, kegiatan outdoor, piknik, fasilitas parkir.'},
    {'id': 21, 'nama': 'Candi Donotirto', 'deskripsi': 'Walaupun melekat dengan kata candi, Candi Donotirto bukanlah peninggalan jaman Hindu-Buddha di Yogyakarta. Tempat ini dibangun oleh pemerintah Belanda. Ada dua bagian, yaitu bagian barat untuk kaum adam dan bagian timur untuk kaum hawa. Masing-masing dialiri oleh 5 buah pancuran air yang bersumber dari Sungai Winogo, berarti ada 10 buah pancuran di sana. Hingga kini, tempat ini tetap dirawat oleh warga sekitar walaupun digunakan sebagai WC umum. Oleh karenanya, janganlah berat tangan untuk menyisihkan uang Anda sebagai ganti biaya perawatan dan kebersihan tempat ini.', 'kategori': 'Outdoor', 'harga': 0, 'fasilitas': 'Situs bersejarah, kuil keagamaan, area meditasi, taman hijau, tempat bermain anak, fasilitas parkir.'},
    {'id': 22, 'nama': 'Kawasan Malioboro', 'deskripsi': 'Jalan Malioboro adalah nama salah satu kawasan jalan dari tiga jalan di Kota Yogyakarta yang membentang dari Tugu Yogyakarta hingga ke perempatan Kantor Pos Yogyakarta. Secara keseluruhan terdiri dari Jalan Margo Utomo, Jalan Malioboro, dan Jalan Margo Mulyo. Jalan ini merupakan poros Garis Imajiner Kraton Yogyakarta.', 'kategori': 'Outdoor', 'harga': 0, 'fasilitas': 'Pusat perbelanjaan, jalan-jalan sehat, kuliner khas, pertunjukan jalanan, kafe, area pertemuan.'}
]

# Fungsi untuk menghitung similarity score berdasarkan input pengguna
def recommend_places(user_input, weather_code_normalized):
    # TF-IDF Vectorizer untuk teks deskripsi tempat wisata
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    descriptions = [place['deskripsi'] for place in data]
    tfidf_matrix = tfidf_vectorizer.fit_transform(descriptions)
    
    # Vektor input pengguna
    user_vector = tfidf_vectorizer.transform([user_input])
    
    # Cosine similarity antara input pengguna dan deskripsi tempat wisata
    cosine_similarities = linear_kernel(user_vector, tfidf_matrix).flatten()
    
    # Sesuaikan similarity score berdasarkan faktor cuaca
    cosine_similarities *= (1 - weather_code_normalized)
    
    # Urutkan tempat wisata berdasarkan similarity score
    sorted_indices = np.argsort(cosine_similarities)[::-1]
    
    # Hasil rekomendasi
    recommendations = [{'nama': data[i]['nama'], 'deskripsi': data[i]['deskripsi'], 'similarity_score': cosine_similarities[i]} for i in sorted_indices]
    
    return recommendations

# Contoh input pengguna
# user_input = "Pemandangan alam dan kegiatan outdoor"

# # Contoh nilai normalisasi cuaca
# weather_code_normalized = 0.8510638297872339  # Normalized code for Light rain shower

# # Mendapatkan rekomendasi tempat wisata berdasarkan input pengguna dan cuaca
# recommendations = recommend_places(user_input, weather_code_normalized)

# # Tampilkan hasil rekomendasi
# for recommendation in recommendations:
#     print("Nama Tempat Wisata:", recommendation['nama'])
#     print("Deskripsi:", recommendation['deskripsi'])
#     print("Similarity Score:", recommendation['similarity_score'])
#     print()


# def get_recommendations(harga, fasilitas, deskripsi,waktu):
    
#     # mengamabil data cuaca
#     weather_input = get_weather(waktu) 
#     weather_input = weather_input.lower()
#     # data_weather = normalize_weather()
#      # Transformasi input pengguna menjadi vektor TF-IDF
#     normalized_features, data_weather = normalize_weather()
#     # Ekstrak fitur cuaca yang dinormalisasi untuk waktu yang diberikan
#     weather_code_normalized = next((entry["code_normalized"] for entry in data_weather if entry["day"].lower() == weather_input.lower()), None)
#     user_input = f"{harga}  {fasilitas} {deskripsi} {weather_input} "
#     # Fit the TF-IDF vectorizer to your entire dataset
#     tfidf_vectorizer.fit(dataset["Metadata"].fillna(''))
#     # Transform your data
#     # transformed_data = tfidf_vectorizer.transform(dataset)
#     user_input_vector = tfidf_vectorizer.transform([user_input])


#     # Transform user input
#     user_input_vector = tfidf_vectorizer.transform([user_input])
     

#     if weather_code_normalized <= 0.5:
#         print("cuaca sedang baik, maka disarankan tempat Outdoor:")
#         tempat_cuaca = "Outdoor"
#     else:
#         print("cuaca sedang buruk, maka disarankan tempat indoor")
#         tempat_cuaca = "Indoor"

#     tfidf_matrix = tfidf_vectorizer.transform([dataset[dataset["Kategori"]==tempat_cuaca]["Metadata"]])  # Transform tempat_cuaca
#     cosine_sim_user = linear_kernel(tfidf_matrix, user_input_vector).flatten()
# recommendations = []
#     for index in place_indices:
#         place_data = dataset.iloc[index]
#         place_name = place_data['Place_Name']
#         place_kategori = place_data['Kategori']
#         recommendations.append({'Place_Name': place_name, 'Kategori': place_kategori, 'Cosine_Similarity': cosine_sim_user[index]})
    
#     # print("ini hanya cek :",recommendations)
#     return recommendations

# import requests
# import datetime

# def get_weather_open_meteo(time):
#     api_key = "YOUR_OPEN_METEO_API_KEY"
#     location = "Yogyakarta"
#     response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude=-7.7956&longitude=110.3695&hourly=temperature_2m&current_weather=true&timezone=Asia/Jakarta&api_key={api_key}")
#     data = response.json()
#     forecast = data['hourly']['temperature_2m'][time]['value']
#     print(f"Pada jam {time}, suhu di {location} adalah {forecast} derajat Celsius.")
#     return forecast

# def get_weather_open_weather_map(time):
#     api_key = "YOUR_OPEN_WEATHER_MAP_API_KEY"
#     location = "Yogyakarta"
#     response = requests.get(f"https://api.openweathermap.org/data/2.5/onecall?lat=-7.7956&lon=110.3695&exclude=minutely,daily,alerts&appid={api_key}")
#     data = response.json()
#     time = datetime.datetime.fromtimestamp(data['hourly'][time]['dt']).strftime('%H:%M:%S')
#     forecast = data['hourly'][time]['temp']
#     print(f"Pada jam {time}, suhu di {location} adalah {forecast} derajat Celsius.")
#     return forecast
