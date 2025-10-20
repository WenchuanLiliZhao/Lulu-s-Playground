import { BrowserRouter, Route, Routes } from "react-router"
import { Pages } from "./pages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={Pages.Home.content} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
