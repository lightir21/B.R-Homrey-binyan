import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { HomePage, ProductPage } from "./pages";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
