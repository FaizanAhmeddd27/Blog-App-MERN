import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const {authenticated, setAuthenticated} = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users/login", data);
      // console.log("Login successful:", res.data);
      toast.success("Login Successful")
      setAuthenticated(true)
      navigate('/')
      reset();
    } catch (error) {
      toast.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Ink<span className="text-black"></span><span className="text-blue-600">Spark</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select {...register("role", { required: true })} className="select select-bordered w-full">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">Role is required</p>}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm mt-2">
            New here?{" "}
            <Link to={'/register'}  className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
