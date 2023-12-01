import styled from 'styled-components';

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background: black;
`;

export const Content = styled.section`
  height: calc(100% - 120px); // 100% - (header(px) + footer(px))
`;
