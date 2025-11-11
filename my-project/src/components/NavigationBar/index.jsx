import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { toggleTheme } from "../../store/themeSlice";
import { logout } from "../../store/userSlice";
import { fetchPendingOrders } from "../../store/orderSlice";

import "./NavigationBar.css";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const pendingCount = useSelector((state) => state.orders.pendingCount);

  // Fetch pending orders for regular users
  useEffect(() => {
    if (role === "user" && user) {
      dispatch(fetchPendingOrders());
    }
  }, [dispatch, role, user]);

  // Handle logout and redirect
  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      {/* Left Section: App Logo and Title */}
      <div className="nav-left">
        <img
          src="/logo192.png"
          alt="App Icon"
          className="project-icon"
        />
        <span className="project-name">Recipe Portal</span>
      </div>

      {/* Right Section: Links and Buttons */}
      <div className="nav-right">
        {/* Theme Toggle */}
        <button className="nav-btn" onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? "Dark" : "Light"}
        </button>

        {/* Authenticated User View */}
        {role === "user" ? (
          <>
            <Link to="/" className="user-name">{user?.name}</Link>
            <Link to="/favorites" className="nav-btn">❤️ Favorites</Link>
            <Link to="/meal-planner" className="nav-btn">📅 Meal Planner</Link>
            <Link to="/saved-meal-plans" className="nav-btn">🗂️ My Meal Plans</Link>
            <Link to="/advanced-search" className="nav-btn">🔍 Advanced Search</Link>

            <span className="pending-orders">
              Pending Orders: <strong>{pendingCount}</strong>
            </span>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : role === "admin" ? (
          <>
            <span className="user-name">{user?.name}</span>
            <Link to="/admin" className="nav-btn">Admin Panel</Link>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // Guest View
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
