
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from"react-redux"
import store from './redux/store.js'
const clientId = import.meta.env.REACT_APP_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
      <App />
      </GoogleOAuthProvider>
   
    </Provider>
  // </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
      <App />
      </GoogleOAuthProvider>
   
    </Provider>
  // </React.StrictMode>,
)
