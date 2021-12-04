import Layout from '../components/Layout';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { interceptor } from '../pages/api/webAPI';

import { AppWrapper } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  interceptor(store);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout> 
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
