// App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./Screens/Login";
import PhotosScreen from "./Screens/PhotosScreen";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  // Lista de paths donde NO queremos mostrar el header
  const noHeaderPaths = ["/", "/login"];
  const showHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <div>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/photos"
          element={
            <PhotosScreen />
          }
        />
      </Routes>
    </div>
  );
}

export default App;