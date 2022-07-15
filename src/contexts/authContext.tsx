import { createContext, ReactNode } from "react";

type CredentialsProps = {
    email: string
    password: string
}

type AuthContextProps = {
    signIn(credentials: CredentialsProps): Promise<void>
    isAutenticated: boolean
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const isAutenticated = false 
    async function signIn({ email, password }: CredentialsProps) {
        console.log({ email, password })
    }

    return (
        <AuthContext.Provider value={{isAutenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

