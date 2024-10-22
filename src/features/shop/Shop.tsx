import { useLocation } from 'react-router-dom';

const Shop: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Shop</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Shop;
