"use client"

import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const RegisterPage = () => {

    const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const router = useRouter()

    const onSubmit = async (data : z.infer<typeof schema>) => {
        try {
          const response =  await axios.post("/api/auth/register", data)
          router.push("/login")

          console.log(response.data)
          
        } catch (error) {
            console.log(error)
    }  
    } 

    

  return (
    <div className='flex flex-col gap-4 min-h-screen max-w-7xl mx-auto px-4 pt-20 items-center justify-center'>
        <h1 className='text-white text-3xl md:text-6xl'>Join Us</h1>
        <h1 className="text-3xl  font-semibold text-white tracking-tight "> Welcome to Snap
                        <span className='text-green-500'>Market</span>
        </h1>
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
            <Button type='submit' className='hover:text-green-500'>Register</Button>
            
       </form>
       <div className='flex gap-2'>
         < p className='text-white'> Already have an account?</p>
         <Link href="/login"  className='text-green-500'>Login</Link>
       </div>
    </div>
  )
}

export default RegisterPage