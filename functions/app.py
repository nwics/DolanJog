from flask import Flask,request, jsonify
import pandas as pd
import json
from flask_cors import CORS
# from rekomendasi import get_recommendations
from sklearn.metrics.pairwise import linear_kernel
# from sklearn.metrics import precision_score, recall_score, f1_score
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from sklearn.feature_extraction.text import TfidfVectorizer
import requests
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime
from nltk import PorterStemmer
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
# from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
import re
import os

app = Flask(__name__)
CORS(app)


def normalize_weather():
  with open('weather.json', 'r') as f:
    data_weather = json.load(f)
    # Mengambil nilai 'code' untuk dijadikan fitur yang akan dinormalisasi
  features_to_normalize = [entry["code"] for entry in data_weather]

  # Menggunakan MinMaxScaler untuk normalisasi
  scaler = MinMaxScaler()
  normalized_features = scaler.fit_transform(np.array(features_to_normalize).reshape(-1, 1))

  # Memasukkan nilai yang sudah dinormalisasi kembali ke dalam data cuaca
  for i, entry in enumerate(data_weather):
      entry["code_normalized"] = normalized_features[i][0]
  return normalized_features ,data_weather

# normalized_features=normalize_weather()

# file_path = os.path.join('functions', 'dataTempatWisata.csv')
# Load Movies Metadata
dataset = pd.read_csv('../functions/dataTempatWisata.csv', low_memory=False)

# Melakukan fitting dan transformasi pada fitur yang digabungkan untuk membuat matriks TF-IDF
dataset["Metadata"] = dataset["Metadata"].fillna('')

dataset['Metadata'] = dataset['Metadata'].str.lower()

dataset['Metadata'] = dataset['Metadata'].str.replace('[^\w\s]','')


# factory = StemmerFactory()
# Membuat stop word remover
factory = StopWordRemoverFactory()
# stop_factory = StopWordRemoverFactory()
stopwords = factory.get_stop_words()
# stopwords = stop_factory.get_stop_words()
dataset['Metadata'] = dataset['Metadata'].apply(lambda x: ' '.join(word for word in x.split() if word not in stopwords))

# Membuat stemmer
# Fungsi untuk melakukan stemming pada teks
stemmer = PorterStemmer()
dataset['Metadata'] = dataset['Metadata'].apply(lambda x: ' '.join(stemmer.stem(word) for word in x.split()))
# stemmer = factory.create_stemmer()
# def stem_text(text):
#     return stemmer.stem(text)

# Tokenizing
dataset['Metadata'] = dataset['Metadata'].apply(word_tokenize)
# Mengubah list token kembali menjadi string
dataset['Metadata'] = dataset['Metadata'].apply(' '.join)
# Daftar stop words dalam bahasa Indonesia
indonesian_stopwords = ['yang', 'dan', 'di', 'dari', 'untuk', 'dengan', 'adalah', 'ke', 'pada', 'itu', 'ini', 'dalam', 'bisa', 'karena', 'jika', 'atau', 'dan', 'sebagai', 'saya', 'akan', 'kami', 'mereka', 'lebih', 'sangat', 'tapi',
                        'juga', 'oleh', 'saat', 'harus', 'sudah', 'hanya', 'setelah', 'belum', 'selalu', 'langsung', 'misalnya', 'seperti', 'ketika', 'lain', 'maka', 'tentang', 'menjadi', 'antara', 'berada', 'serta', 'agar', 'namun',
                        'sehingga', 'sementara', 'hingga', 'sebelum', 'sejak', 'demikian', 'kembali', 'karena', 'sedangkan', 'seolah', 'seakan', 'meski', 'sekalipun', 'seandainya', 'sebagai', 'sebagaimana', 'sebanyak', 'sedemikian', 
                        'sejauh', 'selama', 'selamanya', 'sepanjang', 'serta', 'serupa', 'setidaknya', 'sewaktu', 'sungguh', 'tatkala', 'tetapi', 'walau', 'walaupun', 'entah', 'hendak', 'sejenak', 'apabila', 'bagi', 'bahwa', 'berkat', 
                        'guna', 'kah', 'kecuali', 'kendati', 'ketimbang', 'meski', 'seandainya', 'sejak', 'semenjak', 'sementara', 'sungguh', 'supaya', 'tatkala', 'umpama', 'agar', 'akibat', 'alhasil', 'andaikan', 'apabila', 'asalkan', 
                        'bahwa', 'bilamana', 'bila', 'biarpun', 'contohnya', 'guna', 'jika', 'jikalau', 'kalau', 'kalaupun', 'karena', 'kecuali', 'kelak', 'lalu', 'manakala', 'nanti', 'pantas', 'pasal', 'sampai', 'seandainya', 'sebab', 
                        'sebelum', 'sekalipun', 'selagi', 'sementara', 'sewaktu', 'tatkala', 'tetapi', 'walaupun']
# Membuat TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words=indonesian_stopwords) 
tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['Metadata'])
# print(tfidf_matrix)

# meminta API cuaca
def get_weather(time) :
      # Ganti dengan API key Anda
    api_key = "94f8cd63ae634c00b9812908240603"
    # Ganti dengan lokasi yang diinginkan
    location = "Yogyakarta"
    # Panggil API prakiraan cuaca
    response = requests.get(f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={location}&hour={time}")
    data = response.json()
    # Dapatkan prakiraan cuaca untuk jam yang diinginkan
    time_hour = datetime.strptime(time,"%H:%M").hour
    # int_time = int(float(time))
    day = data['forecast']['forecastday'][0]['date']
    suhu = data['forecast']['forecastday'][0]['hour'][time_hour]['temp_c']
    forecast = data['forecast']['forecastday'][0]['hour'][time_hour]['condition']['text']
    print(f"hari ini tanggal {day} pada jam {time} suhu mencapai {suhu} dengan prediksi {forecast}")
    return forecast

def get_recommendations(harga, fasilitas, deskripsi,waktu,kategori):

    # mengamabil data cuaca
    weather_input = get_weather(waktu) 
    # data_weather = normalize_weather()
     # Transformasi input pengguna menjadi vektor TF-IDF
    normalized_features, data_weather = normalize_weather()
    # Ekstrak fitur cuaca yang dinormalisasi untuk waktu yang diberikan
    weather_code_normalized = next((entry["code_normalized"] for entry in data_weather if entry["day"].lower() == weather_input.lower()), None)
    
    if (weather_code_normalized <= 0.5) :
        print("cuaca sedang baik, maka disarankan tempat Outdoor:")
        tempat_cuaca ="Outdoor"
        
    else :
        print("cuaca sedang buruk, maka disarankan tempat indoor")
        tempat_cuaca = "Indoor"
       
    
    user_input = f"{harga} {fasilitas} {deskripsi} {weather_input} {kategori} "
    user_input_vector = tfidf_vectorizer.transform([user_input])
    # Handling jika vektor kosong
    if np.all(user_input_vector.toarray() == 0):
        # Menggunakan vektor rata-rata dari dataset
        average_vector = np.mean(tfidf_matrix.toarray(), axis=0)
        user_input_vector = np.asarray(average_vector).reshape(1, -1)

    # Menghitung kesamaan kosinus antara input pengguna dan tempat-tempat lain
    cosine_sim_user = linear_kernel(user_input_vector, tfidf_matrix).flatten()
    
    # Mengambil vocabulary dari vectorizer
    vocabulary = tfidf_vectorizer.get_feature_names_out()
    print("Vocabulary untuk user_input:", vocabulary)
    print("hasil vocabulary:",vocabulary[2871])
    print("Weather Code Normalized:", weather_code_normalized)
    print("cosine sim:", cosine_sim_user)

    # Mendapatkan indeks tempat-tempat yang paling mirip
    
    place_indices = cosine_sim_user.argsort()[-10:]
    filtered_data = dataset[dataset['Kategori'] == tempat_cuaca]
    # Tambahkan cosine_sim_user sebagai kolom baru dalam df
    dataset['cosine_sim'] = cosine_sim_user
    # print("dataset cosine:", dataset['cosine_sim'])
    
    cosine_sim_filtered = cosine_sim_user[filtered_data.index]
    # T ambahkan cosine_sim_user sebagai kolom baru dalam filtered_data
    filtered_data['cosine_sim'] = cosine_sim_filtered
    filtered_data = filtered_data.sort_values(by='cosine_sim', ascending=False).head(10)
    print("filtered data:", filtered_data)
    print("place indices:", place_indices)
    print("weather input:", weather_input)
    # print("normalized feature:", normalized_features)
    print("user input:", user_input)
    print("User Input Vector:", user_input_vector)
   
    recommendations = []
    for index, row in filtered_data.iterrows():
        place_name = row['Place_Name']
        place_kategori = row['Kategori']
        cosine_similarity = row['cosine_sim']
        Place_ID = row['Place_ID']
        recommendations.append({'Place_Name': place_name, 'Kategori': place_kategori, 'Cosine_Similarity': cosine_similarity,'Place_ID': Place_ID })
    return recommendations

@app.route('/hasil', methods=['POST'])
def hasil():
    # recommendations = []
    if request.method == 'POST':
        data_str = request.data.decode('utf-8')
        data = json.loads(data_str)
        harga = data['inputs']['harga']
        fasilitas = data['inputs']['fasilitas']
        kategori = data['inputs']['kategori']
        deskripsi = data['inputs']['deskripsi']
        waktu = data['inputs']['waktu']
        place_dictionary = get_recommendations(harga,fasilitas, deskripsi, waktu,kategori)
        return jsonify(place_dictionary)
    else :
        return jsonify({"message: invalid method"}), 405
    
# if __name__ == "__main__" :
app.run(debug=True)