// const fs = require("fs");

// let wisata = [
//   {
//     id: 1,
//     nama: "heha",
//     gambar:
//       "https://2.bp.blogspot.com/-EB2dUNPUjJI/V6eA49L_0nI/AAAAAAAADiA/oAgwb2kyd2sC4hW62SEP9PyihgfQE_SjgCLcB/s1600/Obyek-Wisata-Candi-Prambanan-Yogyakarta.jpg",
//     deskripsi: "deskripsi_tempat_wisata",
//     lokasi: "lokasi_tempat_wisata",
//     fasilitas: "fasilitas_tempat_wisata",
//   },
//   // tambahkan objek tempat wisata lainnya di sini
// ];

// fs.writeFile("wisata.json", JSON.stringify(wisata, null, 2), (err) => {
//   if (err) throw err;
//   console.log("Data written to file");
// });
// // membaca file
// fs.readFile("wisata.json", (err, data) => {
//   if (err) throw err;
//   let wisata = JSON.parse(data);
//   console.log(wisata);
// });

const fs = require("fs");
const csv = require("csv-parser");

let jsonData = [];

fs.createReadStream("datafiksjson.csv")
  .pipe(csv())
  .on("data", (row) => {
    jsonData.push(row);
  })
  .on("end", () => {
    fs.writeFile(
      "placesWisata.json",
      JSON.stringify(jsonData, null, 4),
      (err) => {
        if (err) throw err;
        console.log("File JSON berhasil dibuat!");
      }
    );
  });
