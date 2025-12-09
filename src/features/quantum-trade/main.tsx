import { StrictMode } from 'react'
console.log('Main.tsx executing...');
// window.alert('Main.tsx executing...'); // Commented out to avoid annoyance if it loops, but user can uncomment if needed. 
// Actually, let's use console.log first. If user says "nothing", I'll ask them to check console.

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
