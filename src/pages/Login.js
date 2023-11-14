import React from 'react';

const Login = () => {
  return (
    <div className='bg-fuchsia-200 min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-white border-2 border-black p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h1 className='text-3xl text-center mb-4 font-semibold'>Login</h1>
        <form>
          <div className='mb-4'>
            <label className='block text-lg font-medium'>Username</label>
            <input
              type='text'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-400'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-lg font-medium'>Password</label>
            <input
              type='password'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-400'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-purple-600'
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
