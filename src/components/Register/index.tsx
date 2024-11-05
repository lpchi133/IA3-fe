import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification/index'; // Import Notification component

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const [notification, setNotification] = React.useState<{ message: string; show: boolean; type: 'success' | 'error' }>({ message: '', show: false, type: 'success' });

  const navigate = useNavigate();

  const mutation = useMutation<void, ApiError, RegisterForm>({
    mutationFn: async (data) => {
      const response = await axios.post('https://ia3-be-nestjs-production.up.railway.app/user/register', data);
      return response.data;
    },
    onSuccess: () => {
      setNotification({ message: 'Registration successful!', show: true, type: 'success' });
      navigate('/login'); 
    },
    onError: (error) => {
      setNotification({ message: 'Error: ' + error.response.data.message, show: true, type: 'error' });
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {notification.show && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ ...notification, show: false })} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input 
          {...register('username', { required: true })} 
          placeholder="Username" 
          className={`border p-2 w-full rounded-md mb-2 ${errors.username ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {errors.username && <span className="text-red-500 text-sm mb-4">This field is required</span>}

        <input 
          {...register('email', { required: true, pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Email format is invalid' } })} 
          placeholder="Email" 
          className={`border p-2 w-full rounded-md mb-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {errors.email && <span className="text-red-500 text-sm mb-4">{errors.email.message || 'This field is required'}</span>}

        <input 
          {...register('password', { required: true })} 
          type="password" 
          placeholder="Password" 
          className={`border p-2 w-full rounded-md mb-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {errors.password && <span className="text-red-500 text-sm mb-4">This field is required</span>}

        <button 
          type="submit" 
          disabled={mutation.isPending} 
          className="bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600 disabled:opacity-50"
        >
          Register
        </button>

        {mutation.isPending && <p className="text-center text-gray-500">Loading...</p>}
        {mutation.isError && <p className="text-red-500 text-center">An error occurred: {mutation.error.response.data.message}</p>}
      </form>

      <Link to="/login" className="text-blue-500 hover:underline mt-4">
        Already have an account? Login here
      </Link>
    </div>
  );
};