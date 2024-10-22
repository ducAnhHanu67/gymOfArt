import { useLocation } from 'react-router-dom';

const Discover: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Discover</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Discover;
