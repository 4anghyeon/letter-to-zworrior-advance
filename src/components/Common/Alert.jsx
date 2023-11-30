import React from 'react';
import * as S from './styles/Alert.styled';
import {AlertOption} from '../../shared/common';
import {useSelector} from 'react-redux';

// TODO: children을 props로 내려받는 방식으로 고쳐야할 필요! (너무 복잡..)
const Alert = ({children}) => {
  const alertOption = useSelector(state => state.customAlert);
  return (
    <S.AlertContainer $show={alertOption.visible} style={alertOption.styleOption}>
      <S.MessageDiv>
        {alertOption.type === AlertOption.SUCCESS && <span>✅ </span>}
        {alertOption.type === AlertOption.WARN && <span>⚠️</span>}
        {alertOption.type === AlertOption.FAIL && <span>😢 </span>}
        {alertOption.content}
      </S.MessageDiv>
    </S.AlertContainer>
  );
};

export default Alert;
