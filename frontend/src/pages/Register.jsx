import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";


const Register = () => {
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
      const formData = new FormData();
      formData.append("role", data.role);
      formData.append("name", data.fullname); 
      formData.append("email", data.email);
      formData.append("phoneNo", data.phone); 
      formData.append("password", data.password);
      formData.append("education", data.education);
      formData.append("photo", data.avatar[0]); 
      const res = await axios.post("/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // console.log("Registered successfully:", res.data);
      toast.success("User Registered Successfully")
      setAuthenticated(true)
      navigate('/login')
      reset(); // clear form
    } catch (error) {
      toast.error("Registration failed:", error.response?.data || error.message);
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
            type="text"
            placeholder="Your Name"
            {...register("fullname", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.fullname && <p className="text-red-500 text-sm">Name is required</p>}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

          <select {...register("education", { required: true })} className="select select-bordered w-full">
            <option value="">Select Education</option>
            <option value="matric">Matric</option>
            <option value="intermediate">Intermediate</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
          {errors.education && <p className="text-red-500 text-sm">Education is required</p>}

          <div>
            <label className="label-text block mb-1">Photo</label>
            <input
              type="file"
              {...register("avatar", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.avatar && <p className="text-red-500 text-sm">Photo is required</p>}
          </div>

          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Register
          </button>

          <p className="text-center text-sm mt-2">
            Already registered?{" "}
            <Link to={'/login'} className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
