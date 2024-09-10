"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import Auth from './Auth'
import { useRouter } from 'next/navigation'
import  { AuthenticationContext } from '../context/UserAuthContext'
import { deleteCookie } from 'cookies-next'

const Navbar = () => {
    const router = useRouter()
    const {data, loading, setAuthState} = useContext(AuthenticationContext)
    console.log("context data =>", data)
    const logOut=()=>{
        deleteCookie("jwt")
        setAuthState({
            loading: false,
            error: null,
            data: null
        })
    }
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
            <div>
                <div className="flex">
                    {
                        loading ? null :
                        (
                            data ? (
                                <button className="bg-red-600 text-white border p-1 px-4 rounded mr-3" onClick={()=>logOut()}>
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3" onClick={()=>router.push('/signin')}>
                                    Sign in
                                    </button>
                                    <button className="border bg-blue-500 text-white p-1 px-4 rounded"  onClick={()=>router.push('/signup')}>Sign up</button>
                                </>
                            ) 
                        )
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar