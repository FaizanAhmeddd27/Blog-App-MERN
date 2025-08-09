import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import Detail from './components/Detail'

const App = () => {
  const { authenticated } = useAuth();
  const location = useLocation();

  const hideLayout = ['/login', '/register', '/dashboard'];
  const shouldHideLayout = hideLayout.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <div className="bg-slate-200 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Home /> : <Navigate to="/login" />}
          />
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
          <Route path="/blog/:id" element={<Detail />} /> 
        </Routes>

        {!shouldHideLayout && <Footer />}
      </div>

      <Toaster position="top-right" toastOptions={toastOptions} />
    </>
  );
}

export default App;
