"use client"
import axios from 'axios'
import React, { useContext } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthenticationContext } from '../context/UserAuthContext'

interface IFormInput {
    email: string
    password: string
  }

const Signin = () => {
    const {loading,error,data,setAuthState} = useContext(AuthenticationContext)
    const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      setAuthState({
        loading: true,
        error: null,
        data: null
      })
       try {
        const res = await axios.post("http://localhost:3000/api/user/signin", {
            email: data.email,
            password: data.password
        })
        setAuthState({
          loading: false,
          error: null,
          data: res.data
        })
       } catch (error: any) {
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
      <h1 className='my-4'>Signin</h1>
        {
          loading ? <p>loading</p>:
          error ? <p>{error}</p> :
          (
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                type="email"
                placeholder="Email"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("email", { required: true,pattern: /^\S+@\S+$/i})} 
                />

                <input
                type="password"
                placeholder="Password"
                className="block mb-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900"
                {...register("password", { required: true})} 
                />
                <button className="bg-blue-400 text-white border px-4 py-2 rounded" type='submit'>Signin</button>
            </form>
        )
        }
        </div>
    </div>
  )
}

export default Signin