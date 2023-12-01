import {letterApi} from '../axios/instance';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment/moment';

export const findAllLetters = async () => {
  const {data} = await letterApi.get('/letters');
  return data;
};

export const findAllLettersByName = async name => {
  const {data} = await letterApi.get(`/letters?to=${name}`);
  console.log(data, name);
  return data;
};

export const addLetter = async ({name, content, from, userId, avatar}) => {
  await letterApi.post('/letters', {
    id: uuidv4(),
    to: name,
    from: from,
    content: content,
    userId: userId,
    avatar: avatar === 'null' ? null : avatar,
    date: moment(),
  });
};

export const removeLetterById = async id => {
  await letterApi.delete(`/letters/${id}`);
};

export const updateLetterById = async ({id, content}) => {
  await letterApi.patch(`/letters/${id}`, {content: content});
};
