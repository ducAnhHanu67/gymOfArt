import { useLocation } from 'react-router-dom';

const Jobs: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Jobs</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Jobs;
