// import Accordian from "./Accordian"
import Container from "../Container"
import Accordian from "./Accordian"



const FAQ =()=>{
    
    return(
        <section className=" bg-primary-blue text-white">
            <h1 className=" text-center text-6xl font-bold mt-10" id="FAQ">FAQ</h1>
            <Container>

                <div className="p-4 ">
                    <Accordian
                        
                        title="Apa itu sistem rekomendasi tempat wisata Yogyakarta?"
                        answer="Sistem rekomendasi tempat wisata Yogyakarta adalah
                         sebuah platform atau aplikasi yang menggunakan algoritma cosine similarity untuk memberikan saran tempat wisata kepada pengguna berdasarkan preferensi atau minat mereka. 
                         Sistem ini dapat memanfaatkan data tentang tempat wisata, seperti jenis wisata (budaya, alam, dll.), cuaca, harga, fasilitas dan deskripsi untuk memberikan rekomendasi yang sesuai dengan keinginan atau kebutuhan pengguna.
                        "
                    /> <hr />
                    <Accordian
                        title="Bagaimana cara kerja sistem rekomendasi tempat wisata Yogyakarta?"
                        answer="Sistem rekomendasi tempat wisata Yogyakarta berbasis content based filtering bekerja dengan menganalisis preferensi pengguna melalui fitur-fitur dari tempat-tempat wisata. 
                        Pertama, sistem mengumpulkan dan memproses data tentang tempat wisata, termasuk deskripsi dan jenis wisata, untuk mengekstrak fitur penting. 
                        Selanjutnya, sistem mencocokkan fitur-fitur tempat wisata dengan input pengguna untuk menemukan kesamaan dan memberikan skor pada setiap tempat wisata.
                         Akhirnya, tempat-tempat wisata dengan skor tertinggi direkomendasikan kepada pengguna, dengan harapan tempat tersebut sesuai dengan minat dan preferensi mereka"
                    /> <hr />
                    <Accordian title="Apakah dapat menemukan rekomendasi wisata kuliner?" 
                    answer="Tidak, Karena sistem ini hanya berfokus untuk tempat wisata Yogyakarta dengan kategori Wisata Alam, Budaya, Taman Hiburan dan Pantai " /> <hr />
                    <Accordian
                     title="Apakah saya perlu membuat akun untuk mendapatkan rekomendasi pribadi?"
                     answer="Tidak, Sistem ini tidak memerlukan akun jadi langsung tekan saja pada bagian Rekomendasi pada Header" /> <hr />
                </div>
            </Container>
        </section>
    )
}

export default FAQ