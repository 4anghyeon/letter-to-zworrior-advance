import React, {useEffect} from 'react';
import * as S from './styles/Header.styled';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/modules/authSlice';
import ProfileModal from '../Home/ProfileModal';
import {showModal} from '../../redux/modules/modalSlice';
import defaultAvatar from 'assets/img/dragonball.png';

const Header = () => {
  const logoImage = require('assets/img/logo.png');
  const {isLogin, nickname, avatar} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const {key} = useSelector(state => state.modal);

  // login 상태가 아닐 때 경로 이동을 막음
  useEffect(() => {
    if (!isLogin) navigate('/signin');
  }, [pathname]);

  useEffect(() => {
    if (isLogin) navigate('/');
    else navigate('/signin');
  }, [isLogin]);

  const onClickLogout = () => {
    dispatch(logout());
  };

  const onClickOpenSetting = () => {
    dispatch(
      showModal({
        key: 'setting',
        styleOption: {
          background: '#fff9db',
        },
        visible: true,
      }),
    );
  };

  return (
    <S.HeaderContainer>
      <Link to={isLogin ? '/' : '/signin'}>
        <img src={logoImage} alt={'logo'} />
      </Link>
      {isLogin && (
        <>
          <div>
            <S.ProfileImg $img={avatar === 'null' ? defaultAvatar : avatar} />
            <span>{nickname}님 안녕하세요.</span>
            <S.Button $bgColor="darkgrey" onClick={onClickOpenSetting}>
              설정
            </S.Button>
            <S.Button $bgColor="#f59f00" onClick={onClickLogout}>
              로그아웃
            </S.Button>
          </div>
          {key === 'setting' && <ProfileModal />}
        </>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
