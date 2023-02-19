import { BrowserRouter } from "react-router-dom";
import { CategoriesDropdown, Navbar } from "./components";
import { HomePage } from "./pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
