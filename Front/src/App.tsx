import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/products/WhatsAppButton';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';

// Public pages
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import CategoryPage from '@/pages/CategoryPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Admin pages
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminProductEditor from '@/pages/admin/AdminProductEditor';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminBranding from '@/pages/admin/AdminBranding';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminMedia from '@/pages/admin/AdminMedia';

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Admin login — no layout wrapper */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Protected admin routes */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductEditor />} />
            <Route path="products/:id/edit" element={<AdminProductEditor />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="branding" element={<AdminBranding />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="media" element={<AdminMedia />} />
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
