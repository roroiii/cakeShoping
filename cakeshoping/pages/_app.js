import Layout from '../components/Layout';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { interceptor } from '../pages/api/webAPI';

function MyApp({ Component, pageProps }) {
  interceptor(store);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
