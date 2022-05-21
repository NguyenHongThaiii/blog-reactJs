import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useHide } from "./context/Global-Provider";

const HomePage = lazy(() => import("./features/Home/pages/Home-Page"));
const PlacePage = lazy(() => import("./features/Place/pages/Place-Page"));
const SearchPage = lazy(() =>
  import("./features/SearchPage/pages/Search-Page")
);
// import HomePage from "./features/Home/pages/Home-Page";
// import PlacePage from "./features/Place/pages/Place-Page";
// import SearchPage from "./features/SearchPage/pages/Search-Page";
function App() {
  const [hide, setHide] = useHide();
  useEffect(() => {
    if (hide) {
      document.getElementById("root").style.maxHeight = "100vh";
      document.getElementById("root").style.overflow = "hidden";
    } else {
      document.getElementById("root").style.maxHeight = "fit-content";
      document.getElementById("root").style.overflow = "auto";
    }
  }, [hide]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/place/:name" element={<PlacePage />} />
    </Routes>
  );
}

export default App;