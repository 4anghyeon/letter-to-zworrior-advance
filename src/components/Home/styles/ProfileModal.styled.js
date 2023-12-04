import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 80%;

  & h1 {
    font-size: 2rem;
  }

  & input {
    padding: 20px;
    border-radius: 15px;
  }

  & button {
    ${({$isChanged}) => console.log($isChanged)}
    height: 60px;
    width: 150px;
    border: 0;
    border-radius: 10px;
    padding: 0 10px 0 10px;
    color: white;
    background-color: ${({$isChanged}) => ($isChanged ? '#82c91e' : 'darkgrey')};
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 200px;
  height: 200px;
  background-size: contain;
  background-image: url(${({$bgImage}) => $bgImage});
  border-radius: 50%;
  border: 3px solid #f59f00;
  position: relative;
  overflow: hidden;

  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f59f00;
    width: 200px;
    height: 40px;
    color: white;
    cursor: pointer;
  }
  & input {
    display: none;
  }
`;
