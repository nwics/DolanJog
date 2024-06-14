// import logo from './logo.svg';
// import Caraousel from "./components/Caraousel";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import TampilanLogin from "./pages/Login";
import Rekomendasi from "./pages/Rekomendasi";
import Home from "./pages/Home";
import CobaResponsive from "./components/cobaResponsive";
// import Coba from "./pages/Coba";
// import Testing from "./pages/testing";
// import Details from "./pages/Details";
import DetailsPage from "./pages/Details";

function App() {
  // index.js atau main.js
  window.addEventListener("error", function (event) {
    if (event.message.includes("ResizeObserver loop limit exceeded")) {
      event.stopImmediatePropagation();
      console.warn("ResizeObserver loop limit exceeded, ignoring...");
    }
  });

  window.addEventListener("unhandledrejection", function (event) {
    if (
      event.reason &&
      event.reason.message &&
      event.reason.message.includes("ResizeObserver loop limit exceeded")
    ) {
      event.preventDefault();
      console.warn(
        "Unhandled promise rejection: ResizeObserver loop limit exceeded, ignoring..."
      );
    }
  });

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
        <Route path="/coba" element={<CobaResponsive />} />
      </Routes>
    </div>
  );
}

export default App;
