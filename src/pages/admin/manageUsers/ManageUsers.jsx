import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user: mainUser, userDelete, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedRoles, setSelectedRoles] = useState({});

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", mainUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUser`);
      // Initialize selected roles state
      const roles = {};
      res.data.forEach((user) => {
        roles[user._id] = user.role || "worker";
      });
      setSelectedRoles(roles);
      return res.data;
    },
    enabled: !!mainUser?.email,
  });

  if (isLoading || loading) {
    return <div className="text-center my-8">Loading...</div>;
  }

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        userDelete().then((res) => {console.log(res)});
        const res = await axiosSecure.delete(`/deleteUser/${userId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleRoleChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleRoleUpdate = async (userId) => {
    const newRole = selectedRoles[userId];
    try {
      const res = await axiosSecure.patch(`/updateUserRole/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Role updated to ${newRole}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Coin</th>
              <th>Current Role</th>
              <th>Update Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.coin}</td>
                <td className="font-semibold capitalize">{user.role || "user"}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedRoles[user._id] || "user"}
                      className="select select-bordered select-sm"
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="worker">Worker</option>
                      <option value="buyer">Buyer</option>
                    </select>
                    <button onClick={() => handleRoleUpdate(user._id)} className="btn btn-primary btn-sm">
                      Update
                    </button>
                  </div>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)} className={`btn btn-error btn-sm ${user.email === mainUser.email && "hidden"}`}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
