import "./App.css";
import CompShowPokemons from "./components/ShowPokemons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowSinglePokemon from "./components/ShowSinglePokemon";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowPokemons />} />
          <Route path="/:id" element={<ShowSinglePokemon />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
