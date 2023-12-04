import {letterApi} from '../axios/instance';
import moment from 'moment/moment';

export const findAllLetters = async () => {
  const {data} = await letterApi.get('/letters');
  return data;
};

export const findAllLettersByName = async name => {
  const {data} = await letterApi.get(`/letters?to=${name}`);
  return data;
};

export const findAllLettersByUserId = async userId => {
  return await letterApi.get(`/letters?userId=${userId}`);
};

export const addLetter = async ({name, content, from, userId, avatar}) => {
  await letterApi.post('/letters', {
    to: name,
    from: from,
    content: content,
    userId: userId,
    avatar: avatar === 'null' ? null : avatar,
    date: moment(),
  });
};

export const updateAllLetters = async ({userId, nickname, avatar}) => {
  const {data} = await findAllLettersByUserId(userId);
  const patchPromise = [];
  data.forEach(d => {
    const newData = {...d};
    if (nickname) newData.from = nickname;
    if (avatar) newData.avatar = avatar;
    patchPromise.push(letterApi.patch(`/letters/${d.id}`, newData));
  });

  return new Promise(res => {
    Promise.all(patchPromise).then(() => res());
  });
};

export const removeLetterById = async id => {
  await letterApi.delete(`/letters/${id}`);
};

export const updateLetterById = async ({id, content}) => {
  await letterApi.patch(`/letters/${id}`, {content: content});
};
