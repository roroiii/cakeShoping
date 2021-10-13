import Nav from './Nav';
import Meta from './Meta';
// import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
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
