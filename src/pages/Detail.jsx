import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {warriors} from '../shared/data';
import styled from 'styled-components';
import LetterRow from '../components/Detail/LetterRow';
import {useDispatch, useSelector} from 'react-redux';
import {showModal} from '../redux/modules/modalSlice';
import DetailModal from '../components/Detail/DetailModal';
import WriteModal from '../components/Detail/WriteModal';

const Detail = () => {
  const [selectedLetter, setSelectedLetter] = useState({content: ''});
  const [isWrite, setIsWrite] = useState(false);

  const params = useParams();
  const nameRef = useRef(null); // 캐릭터 이름

  const {name, separatedName, enName} = warriors.find(d => +d.id === +params.id);
  const image = require(`assets/img/${enName.replace(/\s/g, '')}.png`);

  const timeoutIds = [];

  const letters = useSelector(state => state.letters);
  const dispatch = useDispatch();

  const filtered = letters.filter(letter => letter.to === name);

  // 글자 하나씩 표시
  useEffect(() => {
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
  const onClickWriteButton = () => {
    setIsWrite(true);
    dispatch(
      showModal({
        content: '',
        styleOption: {
          background: '#fff9db',
        },
        visible: true,
      }),
    );
  };

  return (
    <Container>
      <Img $img={image}></Img>
      <Header>
        <h1>
          <span ref={nameRef}></span>에게 응원의 메시지를 남겨보세요.
        </h1>
      </Header>
      <LetterListContainer>
        {filtered.length === 0 && (
          <EmptyContainer>
            <p>남겨진 응원 메시지가 없습니다. 🥺</p>
            <p>첫 번째 응원 메시지를 남겨주세요!</p>
          </EmptyContainer>
        )}
        {filtered.map(letter => (
          <LetterRow key={letter.id} letter={letter} setSelectedLetter={setSelectedLetter} />
        ))}
        <WriteButton onClick={onClickWriteButton}>📝</WriteButton>
      </LetterListContainer>
      {isWrite ? <WriteModal name={name} setIsWrite={setIsWrite} /> : <DetailModal selectedLetter={selectedLetter} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    'menu header'
    'menu main';
  grid-template-rows: 0.1fr 1fr;
`;

const Img = styled.div`
  width: 30vw;
  height: 100%;
  background-image: url(${({$img}) => $img});
  background-position-x: center;
  background-size: cover;
  grid-area: menu;
`;

const Header = styled.header`
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

const LetterListContainer = styled.section`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow: auto;
  position: relative;
`;

const WriteButton = styled.button`
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

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 50px;
  color: white;
`;

export default Detail;
