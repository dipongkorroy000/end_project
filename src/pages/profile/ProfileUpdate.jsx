import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageSpinner from "../../components/Spinner/PageSpinner";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading, updateUserProfile, setReload, reload } = useAuth();

  const { data } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userFind?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (loading) {
    return <PageSpinner></PageSpinner>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const role = e.target.role.value;

    try {
      const updateDoc = await {
        displayName: name,
        photoURL: image,
      };

      updateUserProfile(updateDoc).then(async () => {
        navigate("/profile");

        await axiosSecure
          .patch("/userUpdate", {
            email: user.email,
            role: role,
            image: image,
          })
          .then((res) => {
            if (res.status === 201) {
              setReload(!reload);
              toast("Updated Your Account");
            }
          });
      });

      // Optionally show a toast or reload data
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const imageHandle = async (e) => {
    const image = e.target.files[0];

    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(imageUrl, formData);
      const uploadedImageUrl = response.data.data.url;
      setImage(uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-xl my-10">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            onChange={imageHandle}
            type="file"
            name="photo"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            defaultValue={data?.role}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="worker">Worker</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
