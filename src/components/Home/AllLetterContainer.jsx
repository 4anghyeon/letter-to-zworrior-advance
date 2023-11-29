import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LetterRow from '../Detail/LetterRow';
import {useSelector} from 'react-redux';
import DetailModal from '../Detail/DetailModal';

const AllLetterContainer = () => {
  const letters = useSelector(state => state.letters);
  const [selectedLetter, setSelectedLetter] = useState({content: ''});

  return (
    <AllLetterSection>
      <LetterContainer>
        {letters.map(letter => (
          <LetterRow key={letter.id} letter={letter} setSelectedLetter={setSelectedLetter} />
        ))}
      </LetterContainer>
      <DetailModal selectedLetter={selectedLetter} />
    </AllLetterSection>
  );
};

const AllLetterSection = styled.section`
  display: flex;
  justify-content: center;
  height: 50%;
`;

const LetterContainer = styled.div`
  margin: 10px;
  padding: 10px;
  width: 50%;
  border-radius: 10px;
  overflow: auto;
`;

export default AllLetterContainer;
