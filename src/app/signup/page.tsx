"use client"
import { error } from 'console'
import React, { useContext } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthenticationContext } from '../context/UserAuthContext'
import axios from 'axios'

interface IFormInput {
    firstName: string
    lasttName: string
    email: string
    city: string
    password: string
    phoneNum: number
  }

const Signup = () => {
    const {loading,error,data,setAuthState} = useContext(AuthenticationContext)

    const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        setAuthState({
            loading: true,
            error: null,
            data: null
        })
        try {
            const res = await axios.post("http://localhost:3000/api/user/signup", {
                firstName: data.firstName,
                lasttName: data.lasttName,
                email: data.email,
                city: data.city,
                phoneNum: data.phoneNum,
                password: data.password
            })  
            setAuthState({
                loading: false,
                error: null,
                data: res.data
              })
        } catch (error:any) {
            setAuthState({
                loading: false,
                error: error.response.data.errorMsg,
                data: null
              })
        }
    }

  return (
    <div className='items-center justify-between h-screen'>
        <div className='lg:w-1/3 m-auto bg-slate-200 p-4 mt-52 text-center'>
            <h1 className='my-4'>Creat Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex'>
                    <div className='mr-2'>
                        <input
                        type="text"
                        placeholder="First Name"
                        className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 mr-2"
                        {...register("firstName", { required: "First Name is require", pattern:/^[a-zA-Z]+$/, minLength:{value: 3, message: "Minimum 3 characters required"}})} 
                        />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="Last Name"
                        className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 text-gray-900"
                        {...register("lasttName", { required: "Last Name is require",pattern: /^[a-zA-Z]+$/, maxLength: 100})} 
                        />
                        {errors.lasttName && <p>{errors.lasttName.message}</p>}
                    </div>
                </div>
                <input
                type="email"
                placeholder="Email"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("email", { required: true,pattern: /^\S+@\S+$/i})} 
                />
                <input
                type="phone"
                placeholder="Phone"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("phoneNum", { required: true,pattern:/^[0-9+-]+$/, minLength: 10, maxLength: 10})} 
                />
                <input
                type="city"
                placeholder="City"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("city", { required: true})} 
                />
                <input
                type="password"
                placeholder="Password"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("password", { required: true})} 
                />
                <button className="bg-green-600 text-white border px-4 py-2 mt-4 rounded w-full" type='submit'>Creat  Account</button>
            </form>
        </div>
    </div>
  )
}

export default Signup