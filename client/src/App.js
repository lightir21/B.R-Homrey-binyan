import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { CartPage, HomePage, ProductPage } from "./pages";
function App() {
  const [showCart, setShowCart] = useState(true);
  return (
    <div className="App">
      <Navbar />

      {showCart && <CartPage showCart={showCart} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
