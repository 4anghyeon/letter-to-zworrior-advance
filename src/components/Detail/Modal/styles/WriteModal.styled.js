import styled from 'styled-components';

export const ModalButtonContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  font-size: 25px;

  & div {
    display: flex;
    align-items: center;
  }

  & button {
    border-radius: 5px;
  }

  & input {
    border: none;
    height: 30px;
    margin-left: 20px;
    background: transparent;
    border-bottom: 1px solid black;
    font-size: 20px;
  }
`;

export const ModalEnrollButton = styled.button`
  font-size: 25px;
  padding: 10px;
  border: none;
  background: #37b24d;
  color: white;
  cursor: pointer;
`;
