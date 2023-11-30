import React, {useRef} from 'react';
import * as S from './styles/LetterModalContent.styled';
import {MAX_LETTER_LENGTH} from '../../shared/common';

const LetterModalContent = ({content, isEdit}) => {
  const textAreaRef = useRef(null);

  return (
    <S.Content>
      {!isEdit && <span>{content}</span>}
      {isEdit && (
        <textarea
          id="content"
          defaultValue={content}
          autoFocus={isEdit}
          ref={textAreaRef}
          placeholder={`최대 ${MAX_LETTER_LENGTH}자 까지 가능 합니다.`}
        ></textarea>
      )}
    </S.Content>
  );
};

export default LetterModalContent;
