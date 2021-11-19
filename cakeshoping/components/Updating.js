import styled from 'styled-components';

const FixedBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UpdatingBox = styled.div`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

export default function Updating() {
  return (
    <>
      <FixedBox>
        <UpdatingBox>Updating...</UpdatingBox>
      </FixedBox>
    </>
  );
}
