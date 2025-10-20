import { BrowserRouter, Route, Routes } from "react-router";
import { Pages } from "./pages";
import { PlaygroundPages } from "./pages/playground";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={Pages.Home.content} />
        <Route path="/demo-color-chart" element={PlaygroundPages.Demo_ColorChart.content} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
