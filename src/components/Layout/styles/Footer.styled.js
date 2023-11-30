import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  overflow: hidden;

  & img {
    height: 50px;
    animation: keep-moving 7s infinite;

    @keyframes keep-moving {
      0% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(-60vw);
        display: none;
      }
      55% {
        display: none;
        transform: translateX(60vw);
      }
      100% {
        transform: translateX(0);
        display: block;
      }
    }
  }
`;
