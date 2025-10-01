import { track } from '../utils/plausible';
import { forceLoadAnalytics } from '../utils/forceAnalytics';

export const AnalyticsTest = () => {
  const testAnalytics = () => {
    console.log('Testing analytics...');
    track('test_event', { test: true });
  };

  const forceAnalytics = () => {
    console.log('Force loading analytics...');
    forceLoadAnalytics();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999
    }}>
      <button onClick={testAnalytics} style={{
        background: '#ffd700',
        color: '#333',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
        marginRight: '5px'
      }}>
        Test Analytics
      </button>
      <button onClick={forceAnalytics} style={{
        background: '#ff6b6b',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer'
      }}>
        Force Load
      </button>
    </div>
  );
};
