import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AxiosClient, { AuthResponseType } from '../../api/axios';
import { queryClient } from '../../api/query-client';
import AuthContext from '../../context/AuthContext';
import { LoginDataType } from '../Layouts.types';

export const useLoginMutation = () => {
  const authContext = useContext(AuthContext);
  const axios = AxiosClient();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: async (loginData: LoginDataType) =>
      await axios.post<AuthResponseType>('/api/auth/login', loginData),
    onSuccess: (response) => {
      authContext.login({
        avatar: response.data.userAvatar,
        username: response.data.userName,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
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

export const useRegisterMutation = () => {
  const axios = AxiosClient();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: async (registerData: {
      username: string;
      email: string;
      password: string;
      confirmationPassword: string;
    }) => await axios.post<AuthResponseType>('/api/auth/register', registerData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['homeData'] });
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
      params?.mangaId &&
        queryClient.invalidateQueries({
          queryKey: ['sourceData', params.mangaId],
        });
      queryClient.invalidateQueries({ queryKey: ['libraryData'] });

      return response;
    },
    onError: (error) => error,
  });

  return mutation;
};

export const useChangeEmailMutation = () => {
  const axios = AxiosClient();

  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string; confirmationPassword: string }) =>
      await axios.post<void>('/api/user/account/email', data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      return response;
    },
    onError: (error) => error,
  });

  return mutation;
};
