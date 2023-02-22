import { BrowserRouter } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { HomePage } from "./pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <HomePage />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
