import {ModalOption} from '../../shared/common';

const initialState = new ModalOption();

// action values
const SHOW = 'modal/show';
const HIDE = 'modal/hide';

// action creator
export const showModal = (content, styleOption, visible) => {
  return {
    type: SHOW,
    option: new ModalOption(content, styleOption, visible),
  };
};

export const hideModal = () => {
  return {
    type: HIDE,
  };
};

// reducer: 'state에 변화를 일으키는' 함수
// input: state와 action
const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return {...state, ...action.option, visible: true};
    case HIDE:
      return {...state, visible: false};
    default:
      return state;
  }
};

export default modal;
