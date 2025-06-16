import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { DreamsContextProvider } from '../src/contexts/DreamContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DreamsContextProvider>
      <App />
    </DreamsContextProvider>
  </StrictMode>
);
