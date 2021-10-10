import Layout from '../components/Layout'
import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
