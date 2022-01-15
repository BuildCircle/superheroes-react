import { Routes, Route } from "react-router-dom";
import CharacterBattle from "./pages/CharacterBattle";
import CharacterSelect from "./pages/CharacterSelect";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="relative flex w-full h-full min-h-screen overflow-hidden font-black tracking-widest text-white font-body">
      <div className="w-1/2 aspect-square rounded-full bg-blue-700 absolute blur-[6rem] -translate-x-1/2 "></div>
      <div className="w-1/2 aspect-square rounded-full bg-red-700 absolute blur-[6rem]  right-0 translate-x-1/2 "></div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<CharacterSelect />} />
          <Route path="/:hero/:villain" element={<CharacterBattle />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
