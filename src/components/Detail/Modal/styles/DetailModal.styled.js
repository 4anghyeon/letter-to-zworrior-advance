import styled from 'styled-components';

export const LetterModalFooter = styled.footer`
  margin: 10px 20px;
  text-align: end;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalButton = styled.button`
  width: 70px;
  height: 40px;
  background: ${({$background}) => $background};
  border: none;
  margin-right: 10px;
  cursor: pointer;
  padding: 10px;
  color: white;
  font-size: 20px;
  border-radius: 5px;
`;
