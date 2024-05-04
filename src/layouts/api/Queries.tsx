import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AxiosClient from '../../api/axios';
import { queryClient } from '../../api/query-client';
import AuthContext from '../../context/AuthContext';
import { AuthResponse, ILogin } from '../../interfaces/auth';

export const useLoginMutation = () => {
  const authContext = useContext(AuthContext);
  const axios = AxiosClient();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: async (loginData: ILogin) =>
      await axios.post<AuthResponse>('/api/auth/login', loginData),
    onSuccess: (response) => {
      authContext.login({
        avatar: response.data.userAvatar,
        username: response.data.userName,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAdmin: response.data.isAdmin,
      });

      queryClient.invalidateQueries({ queryKey: ['homeData'] });
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
      params?.mangaId &&
        queryClient.invalidateQueries({
          queryKey: ['sourceData', params.mangaId],
        });
      queryClient.invalidateQueries({ queryKey: ['libraryData'] });
    },
  });

  return mutation;
};
