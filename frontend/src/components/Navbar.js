import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">E-Commerce</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="hover:text-gray-300">Products</Link>
            <Link to="/cart" className="hover:text-gray-300">
              Cart ({cartItems.length})
            </Link>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 