// Production logging utility for Vercel debugging
export const logToProduction = (message: string, data?: any) => {
  // Log to console (visible in browser DevTools)
  console.log(`[VYLO-DEBUG] ${message}`, data);
  
  // Also log to a visible element on the page for easy debugging
  const debugElement = document.getElementById('vylo-debug-log') || createDebugElement();
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = `[${timestamp}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
  
  debugElement.innerHTML += logEntry + '<br>';
  debugElement.scrollTop = debugElement.scrollHeight;
};

const createDebugElement = () => {
  const element = document.createElement('div');
  element.id = 'vylo-debug-log';
  element.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    width: 400px;
    height: 300px;
    background: rgba(0, 0, 0, 0.9);
    color: #00ff00;
    font-family: monospace;
    font-size: 12px;
    padding: 10px;
    border-radius: 5px;
    overflow-y: auto;
    z-index: 10000;
    border: 2px solid #00ff00;
  `;
  document.body.appendChild(element);
  return element;
};

export const clearDebugLog = () => {
  const element = document.getElementById('vylo-debug-log');
  if (element) {
    element.innerHTML = '';
  }
};
