import React,{ StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './Components/context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextProvider>
  <BrowserRouter>
    <App />  
  </BrowserRouter>
  </ContextProvider>,
);

