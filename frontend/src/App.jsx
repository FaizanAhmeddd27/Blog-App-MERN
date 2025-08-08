import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthProvider'
import Creators from './pages/Creators'
import Update from './dashboard/Update'
import { Toaster } from "react-hot-toast";
import { toastOptions } from '../toastConfig'
import { Navigate } from 'react-router-dom'

const App = () => {
  const { profile, authenticated } = useAuth();
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const hideLayout = ['/login', '/register', '/dashboard'];

  // Hide layout if the path starts with any of the hideLayout paths
  const shouldHideLayout = hideLayout.some(path => location.pathname.startsWith(path));

  const { blogs } = useAuth();

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <div className="bg-slate-200 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/creators" element={<Creators />} />
          <Route path="/update/:id" element={<Update />} />

        </Routes>

        {!shouldHideLayout && <Footer />}
      </div>

      <Toaster position="top-right" toastOptions={toastOptions} />
    </>
  );
}

export default App;
