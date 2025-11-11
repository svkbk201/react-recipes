import GuestPage from './pages/GuestPage'
import UserHomePage from './pages/UserHomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NavigationBar from './components/NavigationBar';
import CartManager from "./manager/CartManager";
import AdminPage from './pages/AdminPage';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import './App.css'

function App() {

  const role = useSelector((state) => state.user.role);

  const getHomePage = () => {
    if (role === "admin") return <AdminPage />;
    if (role === "user") return <UserHomePage />;
    return <GuestPage />;
  };


  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<GuestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {
            role === "user" ?
              <>
                <Route path="/" element={<UserHomePage />} />
                <Route path="/cart" element = {<CartManager/>} />
              </>
              : role === "admin" ?
                <>
                  <Route path="/" element={<AdminPage />} />
                </>
                :
                <>
                  <Route path="/" element={<GuestPage />} />
                </>
          }
          <Route path="*" element={getHomePage()} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
