import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import { CartProvider } from "./context/CartContext";

import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
