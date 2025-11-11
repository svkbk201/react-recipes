import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      // Check if email already exists
        await delay(5000);

      const res = await fetch(`http://localhost:5001/users?email=${form.email}`);

      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        setError("User with this email already exists.");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user", // Default role for new registrations
        isActive: true,
      };

      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Failed to register user");

      setLoading(false);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Error registering user. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled={loading}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            disabled={loading}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
