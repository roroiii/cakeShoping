import Layout from '../components/Layout';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import store from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
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
