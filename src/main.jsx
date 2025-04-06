
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from"react-redux"
import store from './redux/store.js'
const clientId = '401197160662-0djt65t1o9amj3om40iaj4ikgidk2hu7.apps.googleusercontent.com';
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
