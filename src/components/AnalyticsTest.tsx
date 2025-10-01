import { track } from '../utils/plausible';
import { forceLoadAnalytics } from '../utils/forceAnalytics';
import { debugPlausible } from '../utils/debugPlausible';
import { logToProduction, clearDebugLog } from '../utils/productionLogger';

export const AnalyticsTest = () => {
  const testAnalytics = () => {
    console.log('Testing analytics...');
    track('test_event', { test: true });
  };

  const forceAnalytics = () => {
    console.log('Force loading analytics...');
    forceLoadAnalytics();
  };

  const debugAnalytics = () => {
    console.log('Running comprehensive debug...');
    logToProduction('Running comprehensive debug...');
    debugPlausible();
  };

  const clearLogs = () => {
    clearDebugLog();
    console.clear();
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
        cursor: 'pointer',
        marginRight: '5px'
      }}>
        Force Load
      </button>
      <button onClick={debugAnalytics} style={{
        background: '#4ecdc4',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer',
        marginRight: '5px'
      }}>
        Debug
      </button>
      <button onClick={clearLogs} style={{
        background: '#ff4757',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer'
      }}>
        Clear
      </button>
    </div>
  );
};
