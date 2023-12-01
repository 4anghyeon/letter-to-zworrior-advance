import styled from 'styled-components';
import {ProfileImg} from '../../../Layout/styles/Header.styled';

export const LetterModalFooter = styled.footer`
  margin: 10px 20px;
  text-align: end;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

export const WriteInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const WriterImg = styled(ProfileImg)`
  width: 50px;
  height: 50px;
  margin-right: 25px;
`;
