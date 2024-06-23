import { Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import VerifyPassword from "./pages/VerifyPassword";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import { Bookmarks } from "./pages/Bookmarks";
// Admin Pages
import BlogList from "./pages/admin/blogs/List";
import UserList from "./pages/admin/users/List";
import Profile from "./pages/admin/users/Profile";

import PrivateRoute from "./components/PrivateRoute";
import UserDetail from "./pages/admin/users/Detail";
import UserAdd from "./pages/admin/users/Add";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/register" element={<Register />} />
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="users/add"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Error Routing */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
