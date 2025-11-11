import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { setTheme, toggleTheme } from "../../store/themeSlice";
import { logout } from "../../store/userSlice";
import { fetchPendingOrders } from "../../store/orderSlice"; 



import "./NavigationBar.css";

const NavigationBar = () => {
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const pendingCount = useSelector((state) => state.orders.pendingCount); 

  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "user" && user) {
      dispatch(fetchPendingOrders());
    }
  }, [dispatch, role, user]);

//  useEffect(() => {
//   dispatch(toggleTheme());
// }, [theme]);


  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <img
          src="https://via.placeholder.com/40"
          alt="Project Icon"
          className="project-icon"
        />
        <span className="project-name">Product Portal</span>
      </div>

      <div className="nav-right">
        <button className="nav-btn" onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {role === "user" ? (
          <>
            <Link to="/" className="user-name">{user?.name}</Link>
            <span className="pending-orders">
              Pending Orders: <strong>{pendingCount}</strong>
            </span>
            <button className="nav-btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : role === "admin" ? (
          <>
            <span className="user-name">{user?.name}</span>
            <Link to="/admin" className="nav-btn">
              Admin Panel
            </Link>
            <button className="nav-btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>

  );
};

export default NavigationBar;
