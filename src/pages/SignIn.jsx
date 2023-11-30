import React, {useEffect, useRef, useState} from 'react';
import * as S from './styles/SignIn.styled';
import {ValidationMessage} from './styles/SignIn.styled';
import {authApi, ERROR_CONFLICT} from '../axios/api';
import Swal from 'sweetalert2';

const SignIn = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const signInIdRef = useRef(null);
  const signInPasswordRef = useRef(null);
  const signUpIdRef = useRef(null);
  const signUpPasswordRef = useRef(null);
  const nicknameRef = useRef(null);

  // form의 전체 validation 여부를 결정하는 state
  const [validation, setValidation] = useState({
    id: {
      isValid: false,
      isDuplicate: true,
      message: '',
    },
    password: {
      isValid: false,
      message: '',
    },
    rePassword: {
      isValid: false,
      message: '',
    },
    nickname: {
      isValid: false,
      message: '',
    },
  });

  // 모든 항목이 유효한지 검사한다.
  const checkIsAllValid = () => {
    const isAllValid = Object.values(validation)
      .map(v => v.isValid)
      .every(v => v === true);
    setIsValid(isAllValid);
  };

  // 모든 Input 입력에 대해 Validation
  const onChangeInputHandler = e => {
    const {name, minLength, value} = e.target;
    let message = '';
    let isValid = false;
    let target = '';
    if (name === 'id') {
      target = '아이디를';
    } else if (name === 'password' || name === 'rePassword') {
      target = '비밀번호를';
    } else if (name === 'nickname') {
      target = '닉네임을';
    }

    if (value.length < minLength) {
      isValid = false;
      message = `${target} ${minLength}자 이상 입력해주세요`;
    } else {
      isValid = true;
      message = '';
    }

    if (name === 'rePassword') {
      if (value !== signUpPasswordRef.current.value) {
        isValid = false;
        message = '비밀번호가 일치하지 않습니다.';
      }
    }

    setValidation(prev => {
      const prevValid = {...prev[name]};
      prevValid.isValid = isValid;
      prevValid.message = message;
      return {...prev, [name]: prevValid};
    });
  };

  // 로그인 <-> 회원가입 페이지 전환
  const onClickToggleDisplay = () => {
    setIsLoginPage(prev => !prev);
  };

  const onClickSignUpButton = async () => {
    try {
      const result = await authApi.post('/register', {
        id: signUpIdRef.current.value,
        password: signUpPasswordRef.current.value,
        nickname: nicknameRef.current.value,
      });

      if (result.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '회원가입에 성공하였습니다.',
          text: '이제 응원 메시지를 남겨보세요',
          confirmButtonText: '로그인 하러 가기',
        }).then(result => {
          if (result.isConfirmed) {
            setIsLoginPage(true);
          }
        });
      }
    } catch (error) {
      const {response} = error;
      if (response) {
        if (response.status === ERROR_CONFLICT) {
          await Swal.fire({
            icon: 'error',
            title: '회원가입에 실패하였습니다.',
            text: response.data.message,
          });
        }
      }
    }
  };

  const onClickSignInButton = async () => {
    try {
      const result = await authApi.post('/login', {
        id: signInIdRef.current.value,
        password: signInPasswordRef.current.value,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsAllValid();
  }, [validation]);

  return (
    <S.Container>
      {isLoginPage ? (
        <>
          <S.Form>
            <input key="signInId" type="text" placeholder="아이디를 입력해주세요" autoFocus={true} ref={signInIdRef} />
            <input key="signInPw" type="password" placeholder="비밀번호를 입력해주세요" ref={signInPasswordRef} />
            <S.Button type="button" $color="white" $bgColor="#f59f00" onClick={onClickSignInButton}>
              로그인
            </S.Button>
          </S.Form>
          <S.LinkButton onClick={onClickToggleDisplay}>회원가입</S.LinkButton>
        </>
      ) : (
        <>
          <S.Form>
            <input
              key="signUpId"
              type="text"
              name="id"
              minLength={4}
              maxLength={10}
              placeholder="아이디를 입력해주세요 (4~10 글자)"
              onChange={onChangeInputHandler}
              ref={signUpIdRef}
              autoFocus={true}
            />
            {!validation.id.isValid && validation.id.message && (
              <ValidationMessage>{validation.id.message}</ValidationMessage>
            )}
            <input
              key="signUpPw"
              type="password"
              name="password"
              ref={signUpPasswordRef}
              minLength={4}
              maxLength={15}
              placeholder="비밀번호를 입력해주세요 (4~15 글자)"
              onChange={onChangeInputHandler}
            />
            {!validation.password.isValid && validation.password.message && (
              <ValidationMessage>{validation.password.message}</ValidationMessage>
            )}
            <input
              type="password"
              name="rePassword"
              minLength={4}
              maxLength={15}
              placeholder="비밀번호를 재입력해주세요 (4~15 글자)"
              onChange={onChangeInputHandler}
            />
            {!validation.rePassword.isValid && validation.rePassword.message && (
              <ValidationMessage>{validation.rePassword.message}</ValidationMessage>
            )}
            <input
              type="text"
              name="nickname"
              minLength={1}
              maxLength={10}
              placeholder="닉네임을 입력해주세요 (1~10 글자)"
              ref={nicknameRef}
              onChange={onChangeInputHandler}
            />
            {!validation.nickname.isValid && validation.nickname.message && (
              <ValidationMessage>{validation.nickname.message}</ValidationMessage>
            )}
            <S.Button type="button" $color="white" $bgColor="#f59f00" disabled={!isValid} onClick={onClickSignUpButton}>
              회원가입
            </S.Button>
          </S.Form>
          <S.LinkButton onClick={onClickToggleDisplay}>로그인 화면</S.LinkButton>
        </>
      )}
    </S.Container>
  );
};

export default SignIn;
