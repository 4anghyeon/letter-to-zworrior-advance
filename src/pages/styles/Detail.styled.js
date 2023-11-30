import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    'menu header'
    'menu main';
  grid-template-rows: 0.1fr 1fr;
`;

export const Img = styled.div`
  width: 30vw;
  height: 100%;
  background-image: url(${({$img}) => $img});
  background-position-x: center;
  background-size: cover;
  grid-area: menu;
`;

export const Header = styled.header`
  width: 70vw;
  height: fit-content;
  padding: 10px;
  & h1 {
    font-size: 3.5rem;
  }
  grid-area: header;
  text-align: center;
  color: white;
`;

export const LetterListContainer = styled.section`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow: auto;
  position: relative;
`;

export const WriteButton = styled.button`
  position: fixed;
  width: 100px;
  height: 100px;
  font-size: 50px;
  bottom: 0;
  right: 0;
  background: rgba(211, 211, 211, 0.5);
  border: none;
  border-radius: 50px;
  margin: 0 40px 60px 0;
  cursor: pointer;
  &:hover {
    background: rgba(211, 211, 211, 0.9);
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 50px;
  color: white;
`;
