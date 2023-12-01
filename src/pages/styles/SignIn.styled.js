import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 40%;
  height: 50%;
  margin-bottom: 20px;

  div {
    width: 100%;
  }

  p {
    margin-top: 10px;
  }

  & input {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: 1px solid white;
    padding-left: 20px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: 0;
  background-color: ${({$bgColor, disabled}) => (disabled ? 'darkgrey' : $bgColor)};
  color: ${({$color}) => $color};
  font-size: 1.1rem;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const LinkButton = styled.button`
  color: lightgrey;
  border: 0;
  background: transparent;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

export const ValidationMessage = styled.p`
  width: 100%;
  color: #f03e3e;
`;
