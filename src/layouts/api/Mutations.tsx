import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AxiosClient from '../../api/axios';
import { queryClient } from '../../api/query-client';
import { AuthResponse } from '../../interfaces/auth';

export const useRegisterMutation = () => {
  const axios = AxiosClient();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: async (registerData: {
      username: string;
      email: string;
      password: string;
      confirmationPassword: string;
    }) => await axios.post<AuthResponse>('/api/auth/register', registerData),
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
