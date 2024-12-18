import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/auth/SignUp';
import Login from './features/auth/Login';
import AuthTemplate from './shared/components/templates/AuthTemplate';
import { ToastContainer } from 'react-toastify';
import CommonLayout from './shared/components/templates/CommonLayout';
import Home from './features/home/Home';
import Blogs from './features/blogs/Blogs';
import Following from './features/following/Following';
import Discover from './features/discover/Discover';
import Commissions from './features/commissions/Commissions';
import Jobs from './features/jobs/Jobs';
import Shop from './features/shop/Shop';
import NotFound from './shared/components/pages/NotFound';
import ProductDetail from './features/product/ProductDetail';
import Library from './features/library/Library';
import StoreComponent from './features/storeComponent/StoreComponent';
import Payment from './features/shop/checkout/Payment';
import AdminRoute from './features/Dashboard/AdminRoute';
import AdminDashboard from './features/Dashboard/AdminDashboard';
import PaymentStatus from './features/shop/checkout/PaymentStatus';
import SellAsset from './features/Assets/sellAsset';
import Profile from './features/profile/Profile';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {/* Định nghĩa các route công khai */}
          <Route path="/auth" element={<AuthTemplate />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Bảo vệ các route chính */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <CommonLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/following" element={<Following />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/sell-asset" element={<SellAsset />} />
            <Route path="/library" element={<Library />} />
            <Route path="/store" element={<StoreComponent />} />
            <Route path="/checkout" element={<Payment />} />

            <Route path="/Product/:productId" element={<ProductDetail />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>

          <Route path="/payment-success" element={<PaymentStatus />} />
          <Route path="/payment-cancel" element={<PaymentStatus />} />

          {/* Admin route */}
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminDashboard />} />}
          />

          {/* Route không tìm thấy */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </RecoilRoot>
  );
}


export default App;
