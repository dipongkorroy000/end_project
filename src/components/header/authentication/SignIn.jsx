import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

function SignIn() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log("Sign In Data:", data);
    // You can trigger your auth flow here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Sign In</h2>

      {/* Email */}
      <div className="mb-4 animate-slideUp delay-100">
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
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-4 relative animate-slideUp delay-200">
        <label className="block mb-1 font-medium text-black">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/,
              message: "Must include uppercase, lowercase, number, and no spaces",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded text-base text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-500 transition"
          onClick={togglePassword}
        >
          {showPassword ? <FaEyeSlash className="mt-1.5" /> : <FaEye className="mt-1.5" />}
        </span>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition transform hover:scale-[1.02]"
      >
        Sign In
      </button>
      <h2 className="text-black mt-3">
        New this Site !{" "}
        <Link className="text-blue-600 underline" to="/signUp">
          SignUp
        </Link>
      </h2>
    </form>
  );
}

export default SignIn;
