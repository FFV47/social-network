import { useMutation, useQueryClient } from "react-query";
import axiosAPI from "../utils/axiosAPI";

const useUpdateProfile = (queryKey) => {
  const queryClient = useQueryClient();

  const updateProfile = async (data) => {
    const api = new axiosAPI();

    const response = await api.post("/api/update_profile", data);
    if (response.data) {
      return response.data;
    }
    if (response.error.data) {
      throw response.error.data;
    }

    throw new Error(response.errorMessage);
  };

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      if (!data.errors) {
        return queryClient.invalidateQueries(queryKey);
      }
    },
  });

  return mutation;
};

export default useUpdateProfile;
