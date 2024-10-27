import { useState, useEffect, useRef } from 'react';
import { Search, Coffee, ChevronDown, Bell, User, Menu, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Product, removeFromCart } from '../../../redux/cartLibrarySlice';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Lấy danh sách sản phẩm trong giỏ hàng từ Redux store
  const cartItems = useSelector((state: RootState) => state.cartLibrary.cart);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Đóng các toggle khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-primary text-white h-[80px] relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <h1 className="text-3xl font-bold text-[#f5a97f]">GoA</h1>
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2c2c3f] text-white pl-12 pr-4 py-3 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-[#f5a97f] transition duration-300 ease-in-out"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#f5a97f] transition duration-300 ease-in-out hover:text-[#f7c5a5]"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 bg-[#f5a97f] text-primary px-4 py-2 rounded-full text-base font-medium transition duration-300 ease-in-out hover:bg-[#f7c5a5]">
            <Coffee size={18} />
            <span>Buy GoA a coffee</span>
          </button>
          <button className="flex items-center space-x-2 transition duration-300 ease-in-out hover:text-[#f5a97f]">
            <img
              src="/placeholder.svg?height=24&width=24"
              alt="English flag"
              className="w-6 h-6 rounded-full"
            />
            <span>English</span>
            <ChevronDown size={18} />
          </button>
          <button className="transition duration-300 ease-in-out hover:text-[#f5a97f] rounded-full bg-gray-700 hover:bg-gray-800 p-2">
            <Bell size={24} />
          </button>

          {/* Nút Giỏ hàng */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={toggleCart}
              className="transition duration-300 ease-in-out hover:text-[#f5a97f] rounded-full bg-gray-700 hover:bg-gray-800 p-2 relative"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#2c2c3f] text-white rounded-lg shadow-lg py-2 z-50">
                <h3 className="text-lg font-semibold px-4 py-2">Giỏ hàng của bạn</h3>
                {cartItems.length === 0 ? (
                  <p className="px-4 py-2">Giỏ hàng trống</p>
                ) : (
                  <ul>
                    {cartItems.map((item: Product) => (
                      <li key={item.id} className="flex items-center px-4 py-2 hover:bg-[#3c3c4f]">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded mr-3" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="px-4 py-2">
                  <Link to="/checkout" className="block text-center bg-[#f5a97f] text-primary px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out hover:bg-[#f7c5a5]">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className="transition duration-300 ease-in-out hover:text-[#f5a97f] rounded-full bg-gray-700 hover:bg-gray-800 p-2"
            >
              <User size={24} />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2c2c3f] text-white rounded-lg shadow-lg py-2 z-50">
                <Link to="/library" className="block px-4 py-2 hover:bg-[#3c3c4f]">My library</Link>
                <Link to="/store" className="block px-4 py-2 hover:bg-[#3c3c4f]">My store</Link>
                <Link to="/buy-coffee" className="block px-4 py-2 hover:bg-[#3c3c4f]">Buy GoA a coffee</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-[#3c3c4f]">Log Out</Link>
              </div>
            )}
          </div>
          <button className="transition duration-300 ease-in-out hover:text-[#f5a97f]">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <hr className="border-t-[1px] border-gray-400 opacity-50 mt-2" />
      </div>
    </header>
  );
}
