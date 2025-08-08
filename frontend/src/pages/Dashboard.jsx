import React, { useState } from 'react';
import MyProfile from '../dashboard/MyProfile';
import CreateBlog from '../dashboard/CreateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import Update from '../dashboard/Update';
import Sidebar from '../dashboard/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [component, setComponent] = useState('My Blogs');
  const { profile, authenticated, loading } = useAuth();
  // console.log("Authenticated:", authenticated);


  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="flex-1 p-4 overflow-y-auto">
        {component === 'My Profile' && <MyProfile />}
        {component === 'Create Blog' && <CreateBlog />}
        {component === 'Update Blog' && <Update />}
        {component === 'My Blogs' && <MyBlogs />}
      </div>
    </div>
  );
};

export default Dashboard;
