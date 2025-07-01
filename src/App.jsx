import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
