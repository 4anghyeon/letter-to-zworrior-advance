import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {warriors} from '../shared/data';
import * as S from './styles/Detail.styled';
import LetterRow from '../components/Detail/Letter/LetterRow';
import {useDispatch, useSelector} from 'react-redux';
import {showModal} from '../redux/modules/modalSlice';
import DetailModal from '../components/Detail/Modal/DetailModal';
import WriteModal from '../components/Detail/Modal/WriteModal';
import {useCheckToken} from '../hooks/useCheckToken';
import {useQuery} from 'react-query';
import {findAllLettersByName} from '../api/letters';

const Detail = () => {
  const params = useParams();
  const {name, separatedName, enName} = warriors.find(d => +d.id === +params.id);

  const {data: letters} = useQuery('lettersByName', findAllLettersByName.bind(null, name));
  const {key} = useSelector(state => state.modal);

  const [selectedLetter, setSelectedLetter] = useState({content: ''});
  const nameRef = useRef(null); // 캐릭터 이름
  const dispatch = useDispatch();
  const checkToken = useCheckToken();

  const image = require(`assets/img/${enName.replace(/\s/g, '')}.png`);
  const filtered = letters ? letters.filter(letter => letter.to === name) : [];
  const timeoutIds = [];

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    // 글자 하나씩 표시
    nameRef.current.innerText = '';
    (async () => {
      for (let i = 0; i < separatedName.length; i++) {
        let separated = separatedName[i];
        let name = nameRef.current?.innerText;

        for (let j = 0; j < separated.length; j++) {
          await new Promise(res => {
            let timeoutId = setTimeout(
              () => {
                nameRef.current.innerText = name + separated[j];
                res();
              },
              120 - separatedName.length * 10,
            );
            timeoutIds.push(timeoutId);
          });
        }
      }
    })();

    return () => {
      // 이름이 다 써지기 전에 페이지 이동되면 setTimeout 모두 클리어 해줘야함
      timeoutIds.forEach(tId => clearTimeout(tId));
    };
  }, []);

  // 메시지 쓰기 이벤트
  const onClickWriteButton = async () => {
    const isTokenAvailable = await checkToken();
    if (isTokenAvailable) {
      dispatch(
        showModal({
          key: 'write',
          styleOption: {
            background: '#fff9db',
          },
          visible: true,
        }),
      );
    }
  };

  return (
    <S.Container>
      <S.Img $img={image}></S.Img>
      <S.Header>
        <h1>
          <span ref={nameRef}></span>에게 응원의 메시지를 남겨보세요.
        </h1>
      </S.Header>
      <S.LetterListContainer>
        {filtered.length === 0 && (
          <S.EmptyContainer>
            <p>남겨진 응원 메시지가 없습니다. 🥺</p>
            <p>첫 번째 응원 메시지를 남겨주세요!</p>
          </S.EmptyContainer>
        )}
        {filtered.map(letter => (
          <LetterRow key={letter.id} letter={letter} setSelectedLetter={setSelectedLetter} />
        ))}
        <S.WriteButton onClick={onClickWriteButton}>📝</S.WriteButton>
      </S.LetterListContainer>
      {key === 'write' && <WriteModal name={name} />}
      {key === 'letter' && <DetailModal selectedLetter={selectedLetter} />}
    </S.Container>
  );
};
export default Detail;
