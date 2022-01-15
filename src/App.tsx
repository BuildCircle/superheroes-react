import { Routes, Route } from "react-router-dom";
import CharacterBattle from "./pages/CharacterBattle";
import CharacterSelect from "./pages/CharacterSelect";

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<CharacterSelect />} />
        <Route path="/:hero/:villain" element={<CharacterBattle />} />
      </Routes>
    </div>
  );
}

export default App;
