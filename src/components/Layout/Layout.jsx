import React from 'react';
import Header from './Header';
import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import Modal from '../Common/Modal';
import Alert from '../Common/Alert';
import * as S from './styles/Layout.styled';

const Layout = () => {
  return (
    <>
      <Modal />
      <Alert />
      <S.Main>
        <Header />
        <S.Content>
          <Outlet />
        </S.Content>
        <Footer />
      </S.Main>
    </>
  );
};

export default Layout;
