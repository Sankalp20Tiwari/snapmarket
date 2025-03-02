"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import  { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const LoginPage = () => {

    const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const router = useRouter()

    const onSubmit = async (data : z.infer<typeof schema>) => {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
        })
        if(result?.error){
          <div className="toast">
            <div className="alert alert-info">
              <span>Log In failed</span>
            </div>
          </div>
        }
        if(result?.url){
          router.push("/dashboard")
        }
    } 

    

  return (
    <div className='flex flex-col gap-4 min-h-screen max-w-7xl   mx-auto px-4 pt-20 items-center justify-center'>
        <h1 className='text-white text-3xl md:text-6xl'>Welcome Back</h1>
        <h1 className='text-white text-3xl md:text-6xl'>Login to your account</h1>
       <form className='flex flex-col gap-4 p-4 pb-0' onSubmit={handleSubmit(onSubmit)} >
            <label htmlFor="email" className='text-white'>Email</label>
            <Input 
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email"
                className='text-white border-green-500'
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}


            
            <label htmlFor="password" className='text-white'>Password</label>
            <Input 
              type='password'
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className='text-white border-green-500'
            />

            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

            <Button type='submit' className='hover:text-green-500'>Login</Button>
       </form>
       <div className='flex gap-2'>
         <p className='text-white'>Don&apos;t have an account?</p>
         <Link href="/register"  className='text-green-500'>Sign up</Link>
       </div>
    </div>
  )
}

export default LoginPage

