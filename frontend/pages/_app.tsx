import React, {  useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css'
import HeaderNotConnected from '../src/Components/HeaderNotConnected';
import { MyAppProps } from "../src/Components/types";
import authContext from '../src/Hooks/authContext';
import SignInForm from '../src/Components/SignInForm';
import ResetPwdForm from '../src/Components/ResetPwdForm';
import ForgottenPasswordForm from '../src/Components/ForgottenPasswordForm';
import Header from '../src/Components/Header';
import { useRouter } from 'next/router';
const queryClient = new QueryClient();
import SignUpForm from '../src/Components/SignUpForm'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: MyAppProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter()

    if(!authenticated){
        if(router.pathname == "/forgotten-password"){
            return (
                <QueryClientProvider client={queryClient}>
                    <authContext.Provider value={{ authenticated, setAuthenticated }}>
                        <HeaderNotConnected/>
                        <ForgottenPasswordForm/>
                    </authContext.Provider>
                </QueryClientProvider>
            )
        }
        else if(router.pathname == "/signup"){
            return (
                <QueryClientProvider client={queryClient}>
                    <authContext.Provider value={{ authenticated, setAuthenticated }}>
                        <HeaderNotConnected/>
                        <SignUpForm/>
                    </authContext.Provider>
                </QueryClientProvider>
            )
        }
        else if(router.pathname == "/reset-password/[token]"){
            const { token } = router.query
            return (
                <QueryClientProvider client={queryClient}>
                    <authContext.Provider value={{ authenticated, setAuthenticated }}>
                        <HeaderNotConnected/>
                        <ResetPwdForm token={String(token)}/>
                    </authContext.Provider>
                </QueryClientProvider>
            )
        }
        return (
            <QueryClientProvider client={queryClient}>
                <authContext.Provider value={{ authenticated, setAuthenticated }}>
                    <HeaderNotConnected/>
                    <SignInForm/>
                </authContext.Provider>
            </QueryClientProvider>
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            <authContext.Provider value={{ authenticated, setAuthenticated }}>
            {router.pathname}
                    <Header/>
                    <Component {...pageProps} />
            </authContext.Provider>
        </QueryClientProvider>
    )
  }