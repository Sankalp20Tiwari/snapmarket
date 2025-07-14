"use client";

import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      router.push("/login");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full ">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12  min-h-screen ">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-6xl">📸</div>
            <Link href="/login" className="text-sm text-teal-600 hover:underline pt-12">Already have an account?</Link>
          </div>

          <div>
            <h2 className="text-2xl">Create Account</h2>
            <p className="text-sm text-gray-100 mt-1">Join Snap<span className="text-teal-500">Market</span> today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-300">Email</label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="text-black"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300">Password</label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="text-black"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-teal-600 text-white">Register</Button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:flex w-1/2 text-white items-center justify-center relative overflow-hidden">
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

export default RegisterPage;
