import React from 'react';
import { useForm } from 'react-hook-form';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: '5605de03-b5a9-42d8-b007-09273201b800',
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post('https://api.web3forms.com/submit', userInfo);
      toast.success('Message sent successfully!');
    } catch (error) {
      // console.error('Error sending message:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-4 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col lg:flex-row justify-between bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 p-4 sm:p-6">

          <div className="flex-1 lg:pr-8 mb-6 lg:mb-0">
            <h4 className="text-blue-600 text-base font-medium leading-6 mb-2 sm:mb-4 lg:text-left text-center">
              Contact Us
            </h4>
            <h2 className="text-blue-800 font-semibold text-2xl sm:text-3xl leading-8 sm:leading-10 mb-4 sm:mb-6 lg:text-left text-center">
              Reach Out To Us
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full h-10 sm:h-12 shadow-sm text-gray-600 placeholder:text-gray-400 text-sm sm:text-base font-normal rounded-full border border-blue-300 focus:outline-none px-3 sm:px-4"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-xs sm:text-sm">Name is required</p>}

              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full h-10 sm:h-12 shadow-sm text-gray-600 placeholder:text-gray-400 text-sm sm:text-base font-normal rounded-full border border-blue-300 focus:outline-none px-3 sm:px-4"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs sm:text-sm">Email is required</p>}

              <textarea
                {...register('message', { required: true })}
                className="w-full h-20 sm:h-24 shadow-sm text-gray-600 placeholder:text-gray-400 text-sm sm:text-base font-normal rounded-2xl border border-blue-300 focus:outline-none px-3 sm:px-4 py-2 resize-none"
                placeholder="Message"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs sm:text-sm">Message is required</p>}

              <button
                type="submit"
                className="w-full py-2 sm:py-3 font-bold text-white rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative mt-4 sm:mt-6 lg:mt-0">
            <div className="w-full h-[200px] sm:h-[250px] lg:h-auto flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/482/221/non_2x/illustration-graphic-cartoon-character-of-contact-us-vector.jpg"
                alt="contact illustration"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <svg
              className="absolute top-[-40px] sm:top-[-60px] right-[-40px] sm:right-[-70px] hidden lg:block"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="svg-pattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    fill="currentColor"
                    className="text-blue-200"
                  />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#svg-pattern)" />
            </svg>
            <div className="mt-2 sm:mt-4 text-center space-y-2 sm:space-y-3">
              <p className="flex items-center justify-center text-blue-700 text-sm sm:text-base gap-1 sm:gap-2">
                <FiPhone /> +92 321 214431
              </p>
              <p className="flex items-center justify-center text-blue-700 text-sm sm:text-base gap-1 sm:gap-2">
                <FiMail /> faizannn27@gmail.com
              </p>
              <p className="flex items-center justify-center text-blue-700 text-sm sm:text-base gap-1 sm:gap-2">
                <FiMapPin /> Karachi, Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;