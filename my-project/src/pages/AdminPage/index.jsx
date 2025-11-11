import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5001/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.patch(`http://localhost:5001/users/${id}`, { isActive: !isActive });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: !isActive } : u))
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5001/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <h2>Manage Users 👥</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>{u.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="toggle-btn"
                  onClick={() => handleToggleActive(u.id, u.isActive)}
                >
                  {u.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(u.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
