import { useMutation, useQueryClient } from "react-query";
import axiosAPI from "../utils/axiosAPI";

const useFollow = (queryKey) => {
  const queryClient = useQueryClient();

  const followUser = async ({ username }) => {
    const api = new axiosAPI();

    const response = await api.post(`/api/follow/${username}`);
    if (response.data) {
      return response.data;
    }

    throw new Error(response.errorMessage);
  };

  const mutation = useMutation(followUser, {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKey);
    },
  });

  return mutation;
};

export default useFollow;
