import { useEffect } from 'react';
import Nav from './Nav';
import AdminNav from './AdminNav';
import Meta from './Meta';
// import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdminUser } from '../features/adminUserSlice';
import { getAdmin } from '../api/AdminAPI.js';
import { getAdminAuthToken } from '../utils/token';

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
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // 應該要有 token 才做
    if (getAdminAuthToken() !== '') {
      // getAdmin().then((res) => {
      //   console.log(res);
      // });
    }
  }, []);

  return (
    <>
      <Meta />
      {adminUser === '' && <Nav />}
      {adminUser && <adminNav />}
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
