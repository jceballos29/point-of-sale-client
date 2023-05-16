import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
