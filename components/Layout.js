import { useEffect } from 'react';
import Nav from './Nav';
import UserNav from './UserNav';
import AdminNav from './AdminNav';
import Meta from './Meta';
// import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdminUser, getAdmin } from '../features/adminUserSlice';
import { selectUser, getUser } from '../features/userSlice';
import { selectLoading } from '../features/loadingSlice';
import {
  checkAuthToken,
  checkAdminAuthToken,
  getAuthToken,
  getAdminAuthToken,
} from '../utils/token';
import Loading from '../components/Loading';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Main = styled.main`
  padding: 3rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25rem;
`;

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isBrowser = typeof window !== undefined;

  useEffect(() => {
    if (isBrowser && checkAuthToken() && getAuthToken() !== '') {
      dispatch(getUser());
    }
    if (isBrowser && checkAdminAuthToken() && getAdminAuthToken() !== '') {
      dispatch(getAdmin());
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Meta />
      {user === '' && adminUser === '' && <Nav />}
      {user.role === 'user' && <UserNav />}
      {adminUser.role === 'admin' && <AdminNav />}
      <Container>
        <Main>
          {/* <Header /> */}
          {children}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
