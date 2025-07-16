import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useUserRole() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role ,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userFind?email=${user.email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading: loading || isLoading, refetch };
}
