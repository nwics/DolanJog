// import logo from './logo.svg';
// import Caraousel from "./components/Caraousel";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import TampilanLogin from "./pages/Login";
import Rekomendasi from "./pages/Rekomendasi";
import Home from "./pages/Home";
// import Coba from "./pages/Coba";
// import Testing from "./pages/testing";
// import Details from "./pages/Details";
import DetailsPage from "./pages/Details";

function App() {
  // const macamKategories = () => {
  //   return (
  //     <div className="flex flex-col text-center">
  //       <p>{label}</p>
  //       <p>{subLabel}</p>
  //     </div>
  //   );
  // };
  return (
    <div>
      {/* <Header />
      <Hero />
      <Caraousel /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<TampilanLogin />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        {/* <Route path="/coba" element={<Coba />} /> */}
        {/* <Route path="/testing" element={<Testing />} /> */}
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
