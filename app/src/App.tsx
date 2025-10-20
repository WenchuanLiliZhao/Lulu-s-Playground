import { BrowserRouter, Route, Routes } from "react-router";
import { Pages } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={Pages.Home.content} />
        {Object.values(Pages).filter((page) => page.slug !== "").map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} element={page.content} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
