import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Meta from './Meta';
const Title = styled.h1`
  display: inline-block;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`;

const Text = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;

  & h2 {
    font-size: 14px;
    font-weight: normal;
    line-height: inherit;
    margin: 0;
    padding: 0;
  }
`;

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <div>
        <Meta
          title={'404: This page could not be found'}
          description={''}
          keywords={''}
        />
        <Title>404</Title>
        <Text>
          <h2>This page could not be found.</h2>
        </Text>
      </div>
      <Button onClick={handleBack}>回到首頁</Button>
    </>
  );
}
