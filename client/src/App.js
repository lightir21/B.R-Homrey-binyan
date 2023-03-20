import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UploadProducts from "./uploadProducts/UploadProducts";
import { Footer, Navbar } from "./components";
import {
  CartPage,
  HomePage,
  ProductPage,
  CategoryPage,
  OrderPage,
  ContactUsPage,
} from "./pages";
import { useAppStore } from "./store/app-store";

function App() {
  const [showCart, setShowCart] = useState(false);
  const { setIsCategoriesOpen } = useAppStore();

  return (
    <div className="App">
      <Navbar setShowCart={setShowCart} />
      <AnimatePresence mode="wait">
        {showCart && <CartPage showCart={showCart} setShowCart={setShowCart} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/contactUs" element={<ContactUsPage />} />
        <Route path="/uploadProducts" element={<UploadProducts />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
