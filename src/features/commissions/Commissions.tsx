import { useLocation } from 'react-router-dom';

const Commissions: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Commissions</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Commissions;
