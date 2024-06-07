from flask import Flask, request, render_template, jsonify
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
# from flask_cors import CORS


app = Flask(__name__)
# CORS(app)
# Load Movies Metadata

data = pd.read_csv('E:/bil up/sem 8/codingan/rekomendasi/coba2.csv', low_memory=False)

# Membuat TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Melakukan fitting dan transformasi pada fitur yang digabungkan untuk membuat matriks TF-IDF
data["Metadata"] = data["Metadata"].fillna('')
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Metadata'])

# Menghitung matriks kesamaan kosinus
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Function untuk mendapatkan rekomendasi berdasarkan input pengguna
def get_recommendations(user_input):
    # user_input = f"{harga} {kategori} {rating} {deskripsi}"
    # Transformasi input pengguna menjadi vektor TF-IDF
    user_input_vector = tfidf_vectorizer.transform([user_input])

    # Menghitung kesamaan kosinus antara input pengguna dan tempat-tempat lain
    cosine_sim_user = linear_kernel(user_input_vector, tfidf_matrix).flatten()

    # Mendapatkan indeks tempat-tempat yang paling mirip
    place_indices = cosine_sim_user.argsort()[:-11:-1]

    # Menampilkan rekomendasi tempat
    recommendations = data['Place_Name'].iloc[place_indices].tolist()
    return recommendations

# @app.route('/rec', methods=['GET','POST'])
# def sistem_rec():
#     # recommendations = []
#     try :
#         data_input =request.get_json()
#         if data_input is None :
#             return jsonify(error = "Expected JSON data"), 415
#         print("ini adalah data:",data_input)
#         recommendations = get_recommendations (
#             data_input['harga'],
#             data_input['kategori'],
#             float(data_input['rating']),
#             data_input['deskripsi']
#         )

#         # recommendations = get_recommendations(harga, kategori, rating, deskripsi)
#         return jsonify({"recommendations": recommendations})
#         # rangkuman = ((harga), (deskripsi), (kategori), (rating))
#         # rangkuman 
#     # print(recommendations)
#     except Exception as e:
#         return jsonify(error=str(e)), 500

    

# if __name__ == '__main__':
#     app.run(debug=True)
