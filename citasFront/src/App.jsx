import "./App.css";

import Home from "./pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route index element={<App />} />
      <Route path="/reportes" element={<ReportesPage />}></Route>
    </Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/registro" element={<RegistrarUsuario />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
