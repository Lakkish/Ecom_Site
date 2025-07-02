import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Products from "./components/Products";
import { CartProvider } from "./context/CartContext";

import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default App;
