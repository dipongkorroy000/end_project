import { FaUserCircle, FaEnvelope, FaIdBadge, FaUserTag } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import PageSpinner from "../../components/Spinner/PageSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";

function Profile() {
  const axiosUse = useAxios();
  const { user, logout, loading: load } = useAuth();
  const navigate = useNavigate();

  const { data = {}, loading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosUse(`/userFind?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || load) {
    return <PageSpinner></PageSpinner>;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-xl overflow-hidden p-6 animate-fadeIn my-10">
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL || "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg"}
          alt="User"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{user ? user.displayName : "loading..."}</h2>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <FaUserTag /> {data.role}
          </p>
        </div>

        <Link
          to={"/profileUpdate"}
          className="text-sm font-semibold text-blue-500 underline ml-16 mb-10 cursor-pointer tooltip tooltip-bottom 
             before:bg-gray-100 before:text-black before:rounded before:px-2 before:py-1"
          data-tip="Update Profile"
        >
          Edit
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> {user ? user.email : "Loading..."}
        </p>

        <p className="flex items-center gap-2">
          <FaIdBadge className="text-blue-500" /> {data?.number}
        </p>

        <p className="flex items-center gap-2">
          <FaUserCircle className="text-blue-500" /> Joined:{" "}
          {data?.created_at ? format(new Date(data.created_at), "PPPp") : "Loading"}
        </p>

        <p className="flex items-center gap-2">
          <FaUserCircle className="text-blue-500" /> last Log In:{" "}
          {data?.last_log_in ? format(new Date(data.last_log_in), "PPPp") : "Unknown"}
        </p>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="bg-primary px-5 py-2 rounded-xl text-md font-semibold mt-5 cursor-pointer hover:text-black hover:shadow-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
