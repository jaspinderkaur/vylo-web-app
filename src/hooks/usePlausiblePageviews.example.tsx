// Example usage with React Router
import { useLocation } from 'react-router-dom';
import { usePlausiblePageviews } from './usePlausiblePageviews';

export const AppWithRouter = () => {
  const location = useLocation();
  
  // Track pageviews on route changes
  usePlausiblePageviews({ pathname: location.pathname });
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
};

// Example usage without React Router (current implementation)
export const AppWithoutRouter = () => {
  const [currentPath, setCurrentPath] = useState('/');
  
  // Track pageviews on path changes
  usePlausiblePageviews({ pathname: currentPath });
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
};
