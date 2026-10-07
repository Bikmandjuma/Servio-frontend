import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ServioApp from "./pages/ServioApp";
import Industries from "./pages/Industries";
import WhyServio from "./pages/WhyServio";
import Contact from "./pages/Contact";
import RequestDemo from "./pages/RequestDemo";
import Quote from "./pages/Quote";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminContacts from "./pages/admin/Contacts";
import AdminQuotes from "./pages/admin/Quotes";
import AdminDemoRequests from "./pages/admin/DemoRequests";
import AdminProducts from "./pages/admin/Products";
import AdminLiveChat from "./pages/admin/LiveChat";
import AdminSettings from "./pages/admin/Settings";
import AdminCategories from "./pages/admin/Categories";
import AdminIndustries from "./pages/admin/Industries";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminBlog from "./pages/admin/Blog";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/servio-app" element={<ServioApp />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/why-servio" element={<WhyServio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="quotes" element={<AdminQuotes />} />
        <Route path="demo-requests" element={<AdminDemoRequests />} />
        <Route path="live-chat" element={<AdminLiveChat />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="industries" element={<AdminIndustries />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
