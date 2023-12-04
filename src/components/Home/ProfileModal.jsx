import React, {useEffect, useRef, useState} from 'react';
import Modal from '../Common/Modal';
import * as S from './styles/ProfileModal.styled';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import defaultAvatar from 'assets/img/dragonball.png';
import {ImageBox} from './styles/ProfileModal.styled';
import axios from 'axios';
import Swal from 'sweetalert2';
import {logout, updateProfile} from '../../redux/modules/authSlice';
import {hideModal} from '../../redux/modules/modalSlice';
import {useModal} from '../../hooks/useModal';
import {letterApi} from '../../axios/instance';
import {removeLetterById, updateAllLetters} from '../../api/letters';
import {useMutation, useQueryClient} from 'react-query';

const ProfileModal = () => {
  const {userId, nickname, avatar} = useSelector(state => state.auth);
  const [imgFile, setImgFile] = useState(null);
  const [profileImg, setProfileImg] = useState(avatar === 'null' || avatar === null ? defaultAvatar : avatar);
  const [isChanged, setIsChanged] = useState(false);
  const [editNickname, setEditNickname] = useState(nickname);
  const dispatch = useDispatch();
  const {hideModal} = useModal();

  const queryClient = useQueryClient();
  const mutationUpdateAllLetters = useMutation(updateAllLetters, {
    onSuccess: () => {
      queryClient.invalidateQueries('lettersByName');
      queryClient.invalidateQueries('letters');
    },
  });

  const onClickEditButton = async () => {
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_AUTH_SERVER}/profile`,
        {
          avatar: imgFile || avatar,
          nickname: editNickname,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      if (result.status === 200) {
        const updateInfo = {};
        if (result.data.nickname) updateInfo['nickname'] = result.data.nickname;
        if (result.data.avatar) updateInfo['avatar'] = result.data.avatar;
        dispatch(updateProfile(updateInfo));
        await Swal.fire({
          icon: 'success',
          title: `${result.data.message}`,
          text: `계속해서 응원의 메시지를 남겨주세요`,
          confirmButtonText: '닫기',
        });
        setEditNickname(result.data.nickname);
        setIsChanged(false);
        mutationUpdateAllLetters.mutate({userId: userId, nickname: result.data.nickname, avatar: result.data.avatar});
      }
    } catch (error) {
      const {response} = error;
      let text = '관리자에게 문의하세요';
      if (response) {
        if (response.status === 401) {
          text = '유효 시간이 지나 로그아웃 되었습니다.';
        }
      }
      await Swal.fire({
        icon: 'error',
        title: '문제가 발생하였습니다.',
        text: text,
        confirmButtonText: '닫기',
      }).then(() => {
        if (response.status === 401) {
          hideModal();
          dispatch(logout());
        }
      });
    }
  };

  const onFileChange = e => {
    const files = e.target.files[0];
    const imgUrl = URL.createObjectURL(files);
    setProfileImg(imgUrl);
    setImgFile(files);
  };

  useEffect(() => {
    if (nickname !== editNickname) setIsChanged(true);
    else if (profileImg !== avatar) setIsChanged(true);
    else setIsChanged(false);
  }, [profileImg, editNickname]);

  return createPortal(
    <Modal>
      <S.Container $isChanged={isChanged}>
        <h1>프로필 수정</h1>
        <ImageBox $bgImage={profileImg} alt="프로필 이미지">
          <label htmlFor="file">업로드</label>
          <input type="file" id="file" accept=".jpg,.png,.gif,.webp" onChange={onFileChange} />
        </ImageBox>
        <div>
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            defaultValue={nickname}
            onChange={e => setEditNickname(e.target.value)}
          />
        </div>
        <button disabled={!isChanged} onClick={onClickEditButton}>
          수정
        </button>
      </S.Container>
    </Modal>,
    document.getElementById('modal'),
  );
};

export default ProfileModal;
