import { AxiosResponse } from "axios";
import Router from "next/router";
import { createContext, ReactNode, useState } from "react";

import { api } from "../services/api";

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    isAutenticated: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

type SignInResponseProps = {
    email: string
    roles: string[]
    permissions: string[]
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [userData, setUserData] = useState<SignInResponseProps>()
    const isAutenticated = false 

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response: AxiosResponse<SignInResponseProps> = await api.post('/sessions', {
                email,
                password
            })
    
            const { permissions, roles } = response.data
    
            setUserData({
                email,
                permissions,
                roles
            })
    
            Router.push('/dashboard')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <AuthContext.Provider value={{isAutenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

