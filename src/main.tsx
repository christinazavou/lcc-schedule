import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.UI_MODE === 'app' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((error: Error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}
