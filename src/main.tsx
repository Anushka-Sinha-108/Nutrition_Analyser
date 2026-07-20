import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { seedSampleMenu } from './services';
// TEMPORARY: Un-comment to seed today's menu in Firestore, then comment out again.
// seedSampleMenu();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);