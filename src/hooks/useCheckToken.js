import {useDispatch} from 'react-redux';
import {authApi} from '../axios/api';
import Swal from 'sweetalert2';
import {hideModal} from '../redux/modules/modalSlice';
import {logout} from '../redux/modules/authSlice';

// 로그인 토큰이 유효한지 검사한다.
// 모든 유저 액션마다 적용 되어야 한다.
export const useCheckToken = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      await authApi.get('/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return true;
    } catch (error) {
      const {response} = error;
      if (response.status === 401) {
        await Swal.fire({
          icon: 'error',
          title: '문제가 발생하였습니다.',
          text: '유효 시간이 지나 로그아웃 되었습니다.',
          confirmButtonText: '닫기',
        }).then(() => {
          dispatch(hideModal());
          dispatch(logout());
        });
      }
      return false;
    }
  };
};
