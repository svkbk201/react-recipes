import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdvancedSearch from "./pages/AdvancedSearch"
import MealPlanner from "./pages/MealPlanner";
import SavedPlans from "./pages/MealPlanner/SavedPlans";
import RecipeDetails from "./pages/RecipeDetails";

import NavigationBar from "./components/NavigationBar";
import GuestPage from "./pages/GuestPage";
import UserHomePage from "./pages/UserHomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartManager from "./manager/CartManager";
import AdminPage from "./pages/AdminPage";
import Favorites from "./pages/Favorites";

import "./App.css";

function App() {
  const role = useSelector((state) => state.user.role);

  // Determine which homepage to show
  const getHomePage = () => {
    if (role === "admin") return <AdminPage />;
    if (role === "user") return <UserHomePage />;
    return <GuestPage />;
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        {/* Default homepage dynamically based on role */}
        <Route path="/" element={getHomePage()} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User-specific routes */}
        {role === "user" && (
          <>
            <Route path="/cart" element={<CartManager />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/saved-meal-plans" element={<SavedPlans />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </>
        )}

        {/* Admin-specific routes */}
        {role === "admin" && <Route path="/admin" element={<AdminPage />} />}

        {/* Catch-all redirect */}
        <Route path="*" element={getHomePage()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
