import styled from 'styled-components';

export const LetterContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  & span {
    font-style: italic;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 80%;
    color: white;
    font-weight: bold;
    overflow: hidden;
  }
  & div span {
    text-align: end;
    margin-right: 50px;
  }
  border: 1px solid white;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

export const ProfileImg = styled.img`
  height: 100px;
  margin-right: 4vw;
`;

export const LetterContent = styled.article`
  margin-bottom: 10px;
  padding: 10px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
