import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useHide } from "./context/Global-Provider";

const HomePage = lazy(() => import("./features/Home/pages/Home-Page"));
const PlacePage = lazy(() => import("./features/Place/pages/Place-Page"));
const SearchPage = lazy(() =>
  import("./features/SearchPage/pages/Search-Page")
);
const PhotoPage = lazy(() => import("./features/Place/pages/Photo-Page"));
const BlogSavedPage = lazy(() =>
  import("./features/BlogSaved/pages/Blog-Saved-Page")
);
const ProfilePage = lazy(() => import("./features/Profile/pages/Profile-Page"));
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
      document.getElementById("root").style.overflow = "unset";
    }
  }, [hide]);
  document.getElementById("root").style.overflow = "unset";

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/place/:name" element={<PlacePage />}></Route>
      <Route path="/place/:name/photo" element={<PhotoPage />}></Route>
      <Route path="/saved" element={<BlogSavedPage />} />
      <Route path="/profile/:name" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
