import { useQuery } from '@tanstack/react-query';
import AxiosClient from '../../api/axios';
import { UserProfileType } from '../Layouts.types';

export const useGetProfileData = () => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => axios.get<UserProfileType>(`/api/user/account/profile`).then((res) => res.data),
  });
};
