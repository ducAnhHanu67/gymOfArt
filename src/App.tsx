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

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthTemplate />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/following" element={<Following />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/library" element={<Library />} />
            <Route path="/store" element={<StoreComponent />} />
            <Route path="/checkout" element={<Payment />} />
            <Route path="/Product/:productId" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
