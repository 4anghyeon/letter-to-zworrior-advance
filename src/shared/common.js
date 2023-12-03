export const MAX_LETTER_LENGTH = 200;
export const MAX_FROM_NAME_LENGTH = 20;
export const TIME_FORMAT = 'YYYY년 MM월 DD일 HH시 mm분';

export class AlertOption {
  constructor(contentElem, styleOption, type, visible) {
    this.contentElem = contentElem;
    this.styleOption = styleOption;
    this.type = type;
    this.visible = visible;
  }

  static WARN = 'warn';
  static FAIL = 'fail';
  static SUCCESS = 'success';
  static DEFAULT = 'default';
}

// 입력값 검증
export const validation = (contentValue, fromNameValue, popup) => {
  if (contentValue.length === 0) {
    popup('편지 내용을 입력해주세요.', {}, AlertOption.FAIL, 1000, null);
    return false;
  }

  if (fromNameValue.length === 0) {
    popup('보내는 이를 입력해주세요.', {}, AlertOption.FAIL, 1000, null);
    return false;
  }

  if (contentValue.length > MAX_LETTER_LENGTH) {
    popup(`편지 내용은 ${MAX_LETTER_LENGTH}자를 넘을 수 없습니다.`, {}, AlertOption.FAIL, 1000, null);
    return false;
  }

  if (fromNameValue.length > MAX_FROM_NAME_LENGTH) {
    popup(`보내는 이름은 ${MAX_FROM_NAME_LENGTH}자를 넘을 수 없습니다.`, {}, AlertOption.FAIL, 1000, null);
    return false;
  }
  return true;
};

export const showLoading = elem => {
  elem.classList.add('spin');
  elem.parentElement.classList.add('spin-bg');
};

export const hideLoading = elem => {
  elem.classList.remove('spin');
  elem.parentElement.classList.remove('spin-bg');
};
