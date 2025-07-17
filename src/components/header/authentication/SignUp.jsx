import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.css"; // for animation classes
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { createUser, updateUserProfile } = useAuth();
  const axiosUse = useAxios();

  const [authError, setAuthError] = useState(null);
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    createUser(data.email, data.password)
      .then(async () => {
        setAuthError(null);
        const userUpdateInfo = await {
          displayName: data.name,
          photoURL: image,
        };
        navigate(from);
        updateUserProfile(userUpdateInfo).then(async () => {
          const userInfo = await {
            name: data.name,
            role: data.role,
            number: data.number,
            email: data.email,
            coin: data.role === "buyer" ? 50 : 10,
          };
          await axiosUse.post("/userCreate", userInfo);
          reset();
          // toast(`you get ${data.role === "buyer" ? 50 : 10} coin`);
          toast(
            <span className="text-sm">
              Created Successfully <br />
              <p>you get {data.role === "buyer" ? 50 : 10} coin</p>
            </span>
          );
        });
      })
      .catch((error) => {
        setAuthError(error.message);
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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-6 rounded-lg shadow-lg animate-fadeIn mt-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Create Account</h2>

        {/* Name */}
        <div className="mb-4 animate-slideUp delay-100">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
        </div>

        {/* Picture */}
        <div className="mb-4 animate-slideUp delay-100">
          <label className="block mb-1 font-medium ">Image</label>
          <input
            type="file"
            className="w-full px-4 py-2 rounded border border-gray-300 input"
            {...register("image", {
              required: "Image is required",
              onChange: (e) => imageHandle(e),
            })}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
        </div>

        {/* Role Selection */}
        <div className="mb-4 animate-slideUp delay-250">
          <label className="block mb-1 font-medium">Select Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            {...register("number", {
              pattern: {
                value: /^01\d{9}$/,
                message: "Phone number must be 11 digits and start with '01'",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4 animate-slideUp delay-200">
          <label className="block mb-1 font-medium ">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative animate-slideUp delay-300">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/,
                message: "Must be at least 6 characters with uppercase, lowercase, number, and no spaces",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded text-base  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition transform hover:scale-[1.02]"
        >
          Sign Up
        </button>

        {authError && <p className="text-red-500 text-sm my-2">{authError}</p>}

        <div className="flex flex-col items-center justify-center">
          <h2 className=" mt-3">Already have an account?</h2>
          <Link className="text-blue-600 underline" to="/signIn">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
