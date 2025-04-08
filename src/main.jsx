import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const clientId ="172635673249-28l59cndnruhbkchsultcj9ci86hftn8.apps.googleusercontent.com" // use VITE_ prefix for Vite projects

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  // </React.StrictMode>
);
