import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification/index'; // Import Notification component

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{ message: string; show: boolean; type: 'success' | 'error' }>({ message: '', show: false, type: 'success' });

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await axios.post('https://ia3-be-nestjs-production.up.railway.app/user/login', data);
      return response.data.user;
    },
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
      setNotification({ message: 'Login successful! Welcome ' + data.username, show: true, type: 'success' });
      navigate('/'); // Redirect to the homepage
    },
    onError: (error: { response: { data: { message: string } } }) => {
      setNotification({ message: 'Error: ' + error.response.data.message, show: true, type: 'error' });
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {notification.show && (
        <Notification message={notification.message} onClose={handleCloseNotification} type={notification.type} />
      )}
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-80">
        <input
          {...register('username', { required: true })}
          placeholder="Username"
          className={`border p-2 mb-4 w-full ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.username && <span className="text-red-500 mb-4">This field is required</span>}

        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className={`border p-2 mb-4 w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && <span className="text-red-500 mb-4">This field is required</span>}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
          Login
        </button>
        {mutation.isPending && <p>Loading...</p>}
        {mutation.isError && <p className="text-red-500">An error occurred: {mutation.error.response.data.message}</p>}
      </form>
      <Link to="/register" className="text-blue-500 hover:underline mt-4">
        Don't have an account? Register here
      </Link>
    </div>
  );
};

export default Login;
