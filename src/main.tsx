// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './contexts/theme/theme-context';
import store, { persistor } from './store';
import App from './App';
import './index.css';
import './palitra.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocaleProvider } from './contexts/locale/locale.context';

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <ToastContainer />
  </>,
);
