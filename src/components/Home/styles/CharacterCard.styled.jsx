import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 10px 0 0;
  border: 1px solid #f03e3e;

  border-radius: 10px;
  overflow: hidden;
`;

export const Img = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({$img}) => $img});
  background-position-x: center;
  background-size: cover;
  transition: ease-in-out 0.5s;
  &:hover {
    transform: scale(1.3) translateY(20%);
  }
`;
