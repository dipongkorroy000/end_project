import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AvailableCoin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`userFind?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || isLoading) {
    return <h2 className="text-center mt-5">Loading....</h2>;
  }

  return (
    <div className="text-center my-10">
      <span className="text-2xl font-bold">{userData.coin}</span>
    </div>
  );
};

export default AvailableCoin;
