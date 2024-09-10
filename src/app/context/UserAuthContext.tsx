"use client";
import axios from "axios";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import React, {
  ReactNode,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface IUser {
  id: string;
  firstName: string;
  lasttName: string;
  email: string;
  city: string;
  phoneNum: string;
}

interface IState {
  loading: boolean;
  data: IUser | null;
  error: string | null;
}
interface IAuthState extends IState {
  setAuthState: Dispatch<
    SetStateAction<{
      loading: boolean;
      data: null;
      error: null;
    }>
  >;
}
export const AuthenticationContext = createContext<IAuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const UserAuthContext = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    try {
        const jwt = getCookie("jwt")
        console.log("jwt=>", jwt)

        if(!jwt){
            setAuthState({
                loading: false,
                error: null,
                data: null
            })  
        }else{
            const response = await axios.get("http://localhost:3000/api/user/me", {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              })
            console.log("response=>", response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

            setAuthState({
                loading: false,
                error: null,
                data: response.data
              })
        }
        
        
    } catch (error:any) {
        setAuthState({
            loading: false,
            error: error.response.data.errorMsg,
            data: null
          })
    }
  };
  useEffect(() => {
    fetchUser()
  }, [])
  
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default UserAuthContext;
