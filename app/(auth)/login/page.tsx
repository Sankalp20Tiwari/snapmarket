"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if (result?.error) {
      alert("Login failed");
    }
    if (result?.url) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white min-h-screen">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-6xl ">📸</div>
            <Link href="/register" className="text-sm text-teal-600 hover:underline pt-12">Create an account</Link>
          </div>

          <div>
            <h2 className="text-2xl  text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
          </div>


          <div className="space-y-3 items-center justify-center flex flex-col">
            <button  className=" flex items-center justify-center gap-2 text-black border border-gray-300 px-5 rounded-md py-2">
              <Image src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="Google" width={20} height={20} />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-2 text-black border border-gray-300 px-5 rounded-md py-2">
              <Image src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000" alt="Facebook" width={20} height={20} />
              Sign in with Facebook
            </button>
          </div>

          <div className='flex flex-row items-center justify-center gap-1'>
          <div className='h-0.5 bg-gray-400 w-1/2'/>
          <div className="text-center text-xl text-gray-700 pb-1">or</div>
          <div className='h-0.5 bg-gray-400 w-1/2'/>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className='text-black'
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your password"
                className='text-black'
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <Link href="/forgot-password" className="text-sm text-teal-500 mt-1 inline-block hover:underline">Forgot your password?</Link>
            </div>

            <Button type="submit" className="w-full bg-teal-600  text-white">Login</Button>
          </form>
        </div>
      </div>


      <div className="hidden md:flex w-1/2 bg-[#050C2B] text-white items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/5653734/pexels-photo-5653734.jpeg"
            alt="Moon"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
