import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.css"; // for animation classes
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import SocialLogin from "./SocialLogin";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const [image, setImage] = useState(null);
  const { loading } = useAuth();
  const axiosUse = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.number);
    createUser(data.email, data.password).then(async () => {
      const userUpdateInfo = await {
        displayName: data.name,
        photoURL: image,
      };
      navigate(from);
      updateUserProfile(userUpdateInfo).then(async () => {
        try {
          const userInfo = await {
            role: data.role,
            number: data.number,
            email: data.email,
            coin: data.role === "buyer" ? 50 : 10,
          };
          const res = await axiosUse.post("/userCreate", userInfo);
          if (res.status === 201) {
            console.log("mongodb user created", res.data);
          }
        } catch (error) {
          console.error("Failed to update user:", error.response?.data?.message || error.message);
        }
        reset();
      });
    });
  };

  const imageHandle = async (e) => {
    const image = e.target.files[0];

    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(imageUrl, formData);
      // console.log("Upload response:", response.data);
      const uploadedImageUrl = response.data.data.url;
      // console.log(uploadedImageUrl)
      setImage(uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-6 bg-gray-50 rounded-lg shadow-lg animate-fadeIn mt-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Create Account</h2>

        {/* Name */}
        <div className="mb-4 animate-slideUp delay-100">
          <label className="block mb-1 font-medium text-black">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
        </div>

        {/* Picture */}
        <div className="mb-4 animate-slideUp delay-100">
          <label className="block mb-1 font-medium text-black">Image</label>
          <input
            type="file"
            className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 input"
            {...register("image", {
              required: "Image is required",
              onChange: (e) => imageHandle(e),
            })}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
        </div>

        {/* Role Selection */}
        <div className="mb-4 animate-slideUp delay-250">
          <label className="block mb-1 font-medium text-black">Select Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="worker">Worker</option>
            <option value="buyer">Buyer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4 animate-slideUp delay-100">
          <label className="block mb-1 font-medium text-black">Phone Number</label>
          <input
            type="number"
            {...register("number", {
              required: "Number is required",
              minLength: {
                value: 11,
                message: "Phone number must be exactly 11 digits",
              },

              maxLength: {
                value: 11,
                message: "Phone number must be exactly 11 digits",
              },

              // validate: (value) => value.toString().length === 11 || "Phone number must be exactly 11 ",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number?.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4 animate-slideUp delay-200">
          <label className="block mb-1 font-medium text-black">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative animate-slideUp delay-300">
          <label className="block mb-1 font-medium text-black">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/,
                message: "Must be at least 6 characters with uppercase, lowercase, number, and no spaces",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-500 transition "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash className="mt-1.5" /> : <FaEye className="mt-1.5" />}
          </span>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition transform hover:scale-[1.02]"
        >
          Sign Up
        </button>

        <SocialLogin></SocialLogin>

        <h2 className="text-black mt-3">
          Already Have an Account !{" "}
          <Link className="text-blue-600 underline" to="/signIn">
            SignIn
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default SignUp;
