import { useLocation } from 'react-router-dom';

const Following: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Following</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Following;
