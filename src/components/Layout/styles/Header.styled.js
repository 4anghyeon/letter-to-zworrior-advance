import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 70px;
  background: black;
  color: white;
  position: relative;

  & img {
    height: 70px;
    padding-top: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
`;

export const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${({$img}) => $img});
  background-size: cover;
  border-radius: 50%;
`;

export const Button = styled.button`
  margin-left: 20px;
  height: 30px;
  background-color: ${({$bgColor}) => $bgColor};
  border: 0;
  border-radius: 10px;
  padding: 0 10px 0 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
