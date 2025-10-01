// Example usage with React Router
// Note: This requires react-router-dom to be installed
// import { useLocation } from 'react-router-dom';
import { usePlausiblePageviews } from './usePlausiblePageviews';

// Example with React Router (commented out to avoid dependency)
// export const AppWithRouter = () => {
//   const location = useLocation();
//   
//   // Track pageviews on route changes
//   usePlausiblePageviews({ pathname: location.pathname });
//   
//   return (
//     <div>
//       {/* Your app content */}
//     </div>
//   );
// };

// Example usage without React Router (current implementation)
import { useState } from 'react';

export const AppWithoutRouter = () => {
  const [currentPath] = useState('/');
  
  // Track pageviews on path changes
  usePlausiblePageviews({ pathname: currentPath });
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
};
