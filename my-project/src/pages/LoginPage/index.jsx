import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/userSlice";

import "./LoginPage.css";

const LoginPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await delay(1500);

      const res = await fetch(
        `http://localhost:5001/users?email=${form.email}&password=${form.password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const user = users[0];
      if (!user.isActive) {
        setError("Account is inactive. Please contact support.");
        setLoading(false);
        return;
      }

      await delay(1000);
      console.log(user)
      // Store logged-in user info (can later use Redux or context)
       dispatch(loginSuccess(user));

      setLoading(false);
      alert(`Welcome back, ${user.name}!`);
      navigate("/"); // redirect to home page
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>        </form>
        {/* --- Link to go back home --- */}
        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
