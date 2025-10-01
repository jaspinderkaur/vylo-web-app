import { track } from '../utils/plausible';

export const AnalyticsTest = () => {
  const testAnalytics = () => {
    console.log('Testing analytics...');
    track('test_event', { test: true });
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
        cursor: 'pointer'
      }}>
        Test Analytics
      </button>
    </div>
  );
};
