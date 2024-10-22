import { useLocation } from 'react-router-dom';

const Blogs: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Blogs</h1>
      <p>Current location: {location.pathname}</p>
    </div>
  );
};

export default Blogs;
